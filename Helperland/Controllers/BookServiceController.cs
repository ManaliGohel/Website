using Helperland.Core;
using Helperland.Data;
using Helperland.Enums;
using Helperland.Models;
using Helperland.Repository;
using Helperland.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Helperland.Controllers
{
    public class BookServiceController : Controller
    {
        private readonly HelperLandContext helperLandContext;
        private readonly IUserAddressRepository userAddressRepository;
        private readonly IServiceRequestRepository serviceRequestRepository;
        private readonly IServiceRequestAddressRepository serviceRequestAddressRepository;
        private readonly IServiceRequestExtraRepository serviceRequestExtraRepository;
        private readonly IConfiguration configuration;

        public BookServiceController(HelperLandContext helperLandContext, IUserAddressRepository userAddressRepository,
                                     IServiceRequestRepository serviceRequestRepository,
                                     IServiceRequestAddressRepository serviceRequestAddressRepository,
                                     IServiceRequestExtraRepository serviceRequestExtraRepository,
                                     IConfiguration configuration)
        {
            this.helperLandContext = helperLandContext;
            this.userAddressRepository = userAddressRepository;
            this.serviceRequestRepository = serviceRequestRepository;
            this.serviceRequestAddressRepository = serviceRequestAddressRepository;
            this.serviceRequestExtraRepository = serviceRequestExtraRepository;
            this.configuration = configuration;
        }

        [HttpPost]
        public JsonResult checkAvailabilitySP(string zipcode)
        {
            var isExist = helperLandContext.Users.Where(z => z.ZipCode == zipcode && z.UserTypeId == (int)UserTypeIdEnum.ServiceProvider && z.IsApproved == true).Count();
            bool result = false;
            if (isExist > 0)
                result = true;
            return Json(result);
        }

        [HttpPost]
        public JsonResult getSessionVarValue(string varName)
        {
            return Json(HttpContext.Session.GetString(varName));
        }

        [HttpPost]
        public void setSessionVarValue(string varName, string varValue)
        {
            HttpContext.Session.SetString(varName, varValue);
        }

        [HttpGet]
        public JsonResult getAllUserAddressesbyPostalcode(string postalcode)
        {
            if (HttpContext.Request.Cookies["UserId"] != null)
                return Json(helperLandContext.UserAddresses.Where(a => a.UserId.Equals(Int32.Parse(HttpContext.Request.Cookies["UserId"])) && a.PostalCode.Equals(postalcode)).ToList());
            else
                return Json(helperLandContext.UserAddresses.Where(a => a.UserId.Equals(HttpContext.Session.GetInt32("UserId")) && a.PostalCode.Equals(postalcode)).ToList());
        }

        [HttpGet]
        public JsonResult getAllCitiesByPostalCode(string postalcode)
        {
            var result = from z in helperLandContext.Zipcodes
                         join c in helperLandContext.Cities on z.CityId equals c.Id
                         join s in helperLandContext.States on c.StateId equals s.Id
                         where z.ZipcodeValue == postalcode
                         select new
                         {
                             city = c.CityName,
                             state = s.StateName
                         };
            return Json(result);
        }

        [HttpPost]
        public JsonResult addNewAddress([FromBody] UserAddressViewModel userAddressViewModel)
        {
            int userid = 0;
            if (HttpContext.Request.Cookies["UserId"] != null)
                userid = Int32.Parse(HttpContext.Request.Cookies["UserId"]);
            else
                userid = (int)HttpContext.Session.GetInt32("UserId");
            UserAddress userAddress = new UserAddress
            {
                UserId = userid,
                AddressLine1 = userAddressViewModel.addressLine1,
                AddressLine2 = userAddressViewModel.addressLine2,
                City = userAddressViewModel.city,
                State = userAddressViewModel.state,
                PostalCode = userAddressViewModel.postalCode,
                Mobile = userAddressViewModel.mobile,
                IsDefault = true,
                IsDeleted = true
            };
            var result = userAddressRepository.AddUserAddress(userAddress);
            return Json(result);
        }

        [HttpPost]
        public JsonResult saveBookServiceRequest([FromBody] ServiceRequestViewModel model)
        {
            int userid = 0;
            if (HttpContext.Request.Cookies["UserId"] != null)
                userid = Int32.Parse(HttpContext.Request.Cookies["UserId"]);
            else
                userid = (int)HttpContext.Session.GetInt32("UserId");
            ServiceRequest serviceRequest = new ServiceRequest
            {
                UserId = userid,
                ServiceId = 0,
                ServiceStartDate = Convert.ToDateTime(model.ServiceStartDate.ToString().Trim() + " " + model.ServiceStartTime.ToString().Trim()),
                ZipCode = model.ZipCode,
                ServiceHourlyRate = model.ServiceHourlyRate,
                ServiceHours = model.ServiceHours,
                ExtraHours = model.ExtraHours,
                SubTotal = model.SubTotal,
                TotalCost = model.TotalCost,
                Comments = model.Comments,
                PaymentDue = false,
                HasPets = model.HasPets,
                CreatedDate = DateTime.Now,
                ModifiedDate = DateTime.Now,
                ModifiedBy = userid,
                Distance = 25,
                PaymentDone = true,
                RecordVersion = Guid.NewGuid()
            };
            if (serviceRequestRepository.saveServiceRequest(serviceRequest) > 0)
            {
                UserAddress userAddress = userAddressRepository.GetAddressByAddressId(Convert.ToInt32(model.UserAddressID));
                ServiceRequestAddress serviceRequestAddress = new ServiceRequestAddress
                {
                    ServiceRequestId = serviceRequest.ServiceRequestId,
                    AddressLine1 = userAddress.AddressLine1,
                    AddressLine2 = userAddress.AddressLine2,
                    City = userAddress.City,
                    State = userAddress.State,
                    PostalCode = userAddress.PostalCode,
                    Mobile = userAddress.Mobile,
                    Email = userAddress.Email
                };
                if (serviceRequestAddressRepository.saveServiceRequestAddress(serviceRequestAddress)>0)
                {
                    ServiceRequestExtra serviceRequestExtra;
                    foreach(string extraServiceId in model.ExtraServicesName)
                    {
                        serviceRequestExtra = new ServiceRequestExtra
                        {
                            ServiceRequestId = serviceRequest.ServiceRequestId,
                            ServiceExtraId = Convert.ToInt32((ExtraServiceEnum)System.Enum.Parse(typeof(ExtraServiceEnum), extraServiceId))
                        };
                        serviceRequestExtraRepository.saveServiceRequestExtra(serviceRequestExtra);
                    }
                    var availableSPsInGivenZipcode = helperLandContext.Users.Where(s => s.IsApproved == true && s.ZipCode == model.ZipCode && s.UserTypeId == (int)UserTypeIdEnum.ServiceProvider);
                    EmailModel emailModel;
                    foreach (var sps in availableSPsInGivenZipcode)
                    {
                        emailModel = new EmailModel
                        {
                            To = sps.Email,
                            Subject = "Service Request Available!!",
                            Body = "Service Request ID: " + serviceRequest.ServiceRequestId
                        };
                        MailHelper mailhelper = new MailHelper(configuration);
                        mailhelper.Send(emailModel);
                    }
                }
            }
            return Json(serviceRequest.ServiceRequestId);
        }
    }
}
