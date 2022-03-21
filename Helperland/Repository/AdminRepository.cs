using Helperland.Core;
using Helperland.Data;
using Helperland.Models;
using Helperland.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Helperland.Repository
{
    public class AdminRepository: IAdminRepository
    {
        private readonly HelperLandContext helperlandContext;
        private readonly IConfiguration configuration;

        public AdminRepository(HelperLandContext helperlandContext, IConfiguration configuration)
        {
            this.helperlandContext = helperlandContext;
            this.configuration = configuration;
        }
        public int editServiceRequest([FromBody] EditServiceRequestbyAdminViewModel editServiceRequestbyAdminViewModel, int adminid)
        {
            ServiceRequest serviceRequest = helperlandContext.ServiceRequests.Where(s => s.ServiceRequestId == editServiceRequestbyAdminViewModel.serviceRequestId).FirstOrDefault();
            if (serviceRequest != null)
            {
                serviceRequest.ServiceStartDate = Convert.ToDateTime(editServiceRequestbyAdminViewModel.serviceStartDate.ToString().Trim() + " " + editServiceRequestbyAdminViewModel.serviceStartTime.ToString().Trim());
                serviceRequest.ZipCode = editServiceRequestbyAdminViewModel.postalCode;
                serviceRequest.ModifiedBy = adminid;
                serviceRequest.ModifiedDate = DateTime.Now;
            }
            helperlandContext.ServiceRequests.Update(serviceRequest);
            ServiceRequestAddress serviceRequestAddress = helperlandContext.ServiceRequestAddresses.Where(a => a.ServiceRequestId == editServiceRequestbyAdminViewModel.serviceRequestId).FirstOrDefault();
            if (serviceRequestAddress != null)
            {
                serviceRequestAddress.AddressLine1 = editServiceRequestbyAdminViewModel.addressLine1;
                serviceRequestAddress.AddressLine2 = editServiceRequestbyAdminViewModel.addressLine2;
                serviceRequestAddress.City = editServiceRequestbyAdminViewModel.city;
                serviceRequestAddress.State = editServiceRequestbyAdminViewModel.state;
                serviceRequestAddress.PostalCode = editServiceRequestbyAdminViewModel.postalCode;
            }
            helperlandContext.ServiceRequestAddresses.Update(serviceRequestAddress);
            var emails = (from sr in helperlandContext.ServiceRequests
                             join u in helperlandContext.Users on sr.UserId equals u.UserId
                             join sp in helperlandContext.Users on sr.ServiceProviderId equals sp.UserId into sp1
                             from sp in sp1.DefaultIfEmpty()
                             where sr.ServiceRequestId == editServiceRequestbyAdminViewModel.serviceRequestId
                             select new
                             {
                                 customerEmail = u.Email,
                                 serviceProviderEmail = sp.Email
                             }).AsNoTracking().ToList();
            EmailModel emailModel = new EmailModel();
            string stremails = "";
            foreach (var e in emails)
            {
                stremails += e.customerEmail;
                if (e.serviceProviderEmail != null)
                {
                    stremails += "," + e.serviceProviderEmail;
                }
            }
            emailModel.To = stremails;
            emailModel.Subject = "Service Request Reschedule by Admin!";
            emailModel.Body = "Service ID: <strong>" + editServiceRequestbyAdminViewModel.serviceRequestId + "</strong><br/><br/><strong>Updated Data:</strong><br/>Service Date & Time: <strong>" + editServiceRequestbyAdminViewModel.serviceStartDate + " " + editServiceRequestbyAdminViewModel.serviceStartTime + "</strong><br/>Service Address:<br/><strong>" + editServiceRequestbyAdminViewModel.addressLine1 + " " + editServiceRequestbyAdminViewModel.addressLine2 + ",<br/>" + editServiceRequestbyAdminViewModel.city + "-" + editServiceRequestbyAdminViewModel.state + " " + editServiceRequestbyAdminViewModel.postalCode + "</strong>";
            MailHelper mailhelper = new MailHelper(configuration);
            mailhelper.Send(emailModel);
            return helperlandContext.SaveChanges();
        }
    }
}
