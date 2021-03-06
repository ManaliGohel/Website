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
using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace Helperland.Controllers
{
    public class CustomerMySettingsController : Controller
    {
        private readonly HelperLandContext helperLandContext;
        private readonly ICustomerSettingsRepository customerSettingsRepository;
        private readonly IServiceRequestRepository serviceRequestRepository;
        private readonly IConfiguration configuration;

        public CustomerMySettingsController(HelperLandContext helperLandContext, ICustomerSettingsRepository customerSettingsRepository,
                                            IServiceRequestRepository serviceRequestRepository, IConfiguration configuration)
        {
            this.helperLandContext = helperLandContext;
            this.customerSettingsRepository = customerSettingsRepository;
            this.serviceRequestRepository = serviceRequestRepository;
            this.configuration = configuration;
        }

        [HttpGet]
        public JsonResult getLoggedinUserData()
        {
            var user = helperLandContext.Users.Where(u => u.UserId == getLoggedinUserId()).FirstOrDefault();
            return Json(user);
        }

        public int getLoggedinUserId()
        {
            if (HttpContext.Request.Cookies["UserId"] != null)
                return Int32.Parse(HttpContext.Request.Cookies["UserId"]);
            else
                return (int)HttpContext.Session.GetInt32("UserId");
        }

        [HttpPost]
        public JsonResult updateCustomerDetails([FromBody] UserDetailsViewModel userDetailsViewModel)
        {
            return Json(customerSettingsRepository.updateCustomerDetails(getLoggedinUserId(), userDetailsViewModel));
        }

        [HttpGet]
        public JsonResult getLoggedinUserAddresses()
        {
            return Json(helperLandContext.UserAddresses.Where(a => a.UserId.Equals(getLoggedinUserId())).OrderByDescending(a => a.AddressId).ToList());
        }

        [HttpGet]
        public JsonResult getAddressByAddressId(int addressid)
        {
            return Json(helperLandContext.UserAddresses.Where(a => a.AddressId == addressid).FirstOrDefault());
        }

        [HttpPost]
        public JsonResult updateCustomerAddress([FromBody] UserAddressViewModel userAddressViewModel)
        {
            return Json(customerSettingsRepository.updateCustomerAddress(userAddressViewModel));
        }

        [HttpPost]
        public JsonResult deleteCustomerAddress(int addressid)
        {
            return Json(customerSettingsRepository.deleteCustomerAddress(addressid));
        }

        [HttpPost]
        public JsonResult checkUserPassword()
        {
            var x = helperLandContext.Users.Where(p => p.UserId == getLoggedinUserId()).FirstOrDefault();
            return Json(x);
        }

        [HttpPost]
        public JsonResult updateUserPassword(string password)
        {
            return Json(customerSettingsRepository.updateUserPassword(getLoggedinUserId(), password));
        }

        [HttpGet]
        public JsonResult getCustomerDashboardData()
        {
            //var x = helperLandContext.Ratings.Where(r => r.RatingTo == 44).GroupBy(g => g.RatingTo, r => r.Ratings).Select(g => new { Ratings = g.Average() });
            var result = (from cs in helperLandContext.Users
                          join sr in helperLandContext.ServiceRequests on (int?)cs.UserId equals (int?)sr.UserId into sr1
                          from sr in sr1.DefaultIfEmpty()
                          join sp in helperLandContext.Users on (int?)sr.ServiceProviderId equals (int?)sp.UserId into sp1
                          from sp in sp1.DefaultIfEmpty()
                          where (int?)cs.UserId == getLoggedinUserId() && (int?)sr.Status != (int)ServiceStatusEnum.Cancelled && (int?)sr.Status != (int)ServiceStatusEnum.Completed
                          orderby sr.ServiceRequestId descending
                          select new
                          {
                              CustomerId = (int?)cs.UserId,
                              ServiceRequestId = (int?)sr.ServiceRequestId,
                              ServiceDateTime = (DateTime?)sr.ServiceStartDate,
                              ServiceProviderId = (int?)sr.ServiceProviderId,
                              ServiceProviderName = sp.FirstName + " " + sp.LastName,
                              ServiceProviderProfile = sp.UserProfilePicture,
                              Payment = (int?)sr.TotalCost,
                              ServiceHours = (decimal?)sr.ServiceHours,
                              SPRate = helperLandContext.Ratings.Where(x => x.RatingTo == (int?)sp.UserId).Select(z => z.Ratings).AsEnumerable()
                          }).ToList();
            return Json(result);
        }

        [HttpGet]
        public JsonResult getServiceRequestDetails(int servicerequestid)
        {
            var result = (from sr in helperLandContext.ServiceRequests
                          join sra in helperLandContext.ServiceRequestAddresses on sr.ServiceRequestId equals sra.ServiceRequestId
                          where sr.ServiceRequestId == servicerequestid
                          select new
                          {
                              ServiceProviderId = sr.ServiceProviderId,
                              ServiceStartDateTime = sr.ServiceStartDate,
                              ServiceDuration = sr.ServiceHours,
                              ServiceNetAmount = sr.TotalCost,
                              Comments = sr.Comments,
                              HasPets = sr.HasPets,
                              AddressId = sra.Id,
                              AddressLine1 = sra.AddressLine1,
                              AddressLine2 = sra.AddressLine2,
                              City = sra.City,
                              State = sra.State,
                              Postalcode = sra.PostalCode,
                              Mobile = sra.Mobile,
                              Email = sra.Email,
                              ExtraServicesId = helperLandContext.ServiceRequestExtras.Where(x => x.ServiceRequestId == servicerequestid).Select(y => y.ServiceExtraId).AsEnumerable()
                          }).ToList();
            return Json(result);
        }

        [HttpGet]
        public JsonResult getServiceRequestsDetailsForCheckRescheduleSR(int servicerequestid, int serviceproviderid)
        {
            var result = (from sr in helperLandContext.ServiceRequests
                          where sr.ServiceRequestId != servicerequestid && sr.ServiceProviderId == serviceproviderid && sr.Status != (int)ServiceStatusEnum.Cancelled && sr.Status != (int)ServiceStatusEnum.Completed
                          select new
                          {
                              ServiceRequestId = sr.ServiceRequestId,
                              ServiceStartDateTime = sr.ServiceStartDate,
                              ServiceDuration = sr.ServiceHours
                          }).ToList();
            return Json(result);
        }

        [HttpPost]
        public JsonResult updateServiceRequestDateTime([FromBody] RescheduleServiceRequestViewModel rescheduleServiceRequestViewModel)
        {
            ServiceRequest serviceRequest = helperLandContext.ServiceRequests.Where(s => s.ServiceRequestId == rescheduleServiceRequestViewModel.ServiceRequestId).FirstOrDefault();
            if (serviceRequest != null)
            {
                serviceRequest.ServiceStartDate = Convert.ToDateTime(rescheduleServiceRequestViewModel.ServiceStartDate.ToString().Trim() + " " + rescheduleServiceRequestViewModel.ServiceStartTime.ToString().Trim());
                serviceRequest.ModifiedBy = getLoggedinUserId();
                serviceRequest.ModifiedDate = DateTime.Now;
            }
            helperLandContext.ServiceRequests.Update(serviceRequest);
            var emails = (from sr in helperLandContext.ServiceRequests
                          join u in helperLandContext.Users on sr.UserId equals u.UserId
                          join sp in helperLandContext.Users on sr.ServiceProviderId equals sp.UserId into sp1
                          from sp in sp1.DefaultIfEmpty()
                          where sr.ServiceRequestId == rescheduleServiceRequestViewModel.ServiceRequestId
                          select new
                          {
                              serviceProviderEmail = sp.Email,
                              availableSps = (from u in helperLandContext.Users
                                              join fb in helperLandContext.FavoriteAndBlockeds on u.UserId equals fb.UserId into fb1
                                              from fb in fb1.DefaultIfEmpty()
                                              where u.ZipCode == sr.ZipCode && u.IsApproved == true && u.UserTypeId == (int)UserTypeIdEnum.ServiceProvider && Convert.ToInt16(getLoggedinUserId()) != fb.TargetUserId
                                              select u.Email).AsNoTracking().ToList()
                          }).AsNoTracking().ToList();
            EmailModel emailModel = new EmailModel();
            string stremails = "";
            var vCount = 0;
            foreach (var e in emails)
            {
                if (e.serviceProviderEmail != null)
                {
                    stremails += e.serviceProviderEmail;
                }
                else
                {
                    foreach (var sps in e.availableSps)
                    {
                        if (vCount == 0)
                        {
                            stremails += sps;
                            vCount++;
                        }
                        else
                        {
                            stremails += "," + sps;
                        }                        
                    }
                }
            }
            emailModel.To = stremails;
            emailModel.Subject = "Service Request Reschedule by Customer!";
            emailModel.Body = "Service ID: <strong>" + rescheduleServiceRequestViewModel.ServiceRequestId + "</strong><br/><br/>Reschedule Service Date & Time: <strong>" + rescheduleServiceRequestViewModel.ServiceStartDate + " " + rescheduleServiceRequestViewModel.ServiceStartTime + "</strong>";
            MailHelper mailhelper = new MailHelper(configuration);
            mailhelper.Send(emailModel);
            return Json(helperLandContext.SaveChanges());
        }

        [HttpPost]
        public JsonResult cancelServiceRequest(int servicerequestid)
        {
            ServiceRequest serviceRequest = helperLandContext.ServiceRequests.Where(s => s.ServiceRequestId == servicerequestid).FirstOrDefault();
            if (serviceRequest != null)
            {
                serviceRequest.Status = (int)ServiceStatusEnum.Cancelled;
                serviceRequest.ModifiedBy = getLoggedinUserId();
                serviceRequest.ModifiedDate = DateTime.Now;
            }
            helperLandContext.ServiceRequests.Update(serviceRequest);
            var emails = (from sr in helperLandContext.ServiceRequests
                          join u in helperLandContext.Users on sr.UserId equals u.UserId
                          join sp in helperLandContext.Users on sr.ServiceProviderId equals sp.UserId into sp1
                          from sp in sp1.DefaultIfEmpty()
                          where sr.ServiceRequestId == servicerequestid
                          select new
                          {
                              serviceProviderEmail = sp.Email,
                              availableSps = (from u in helperLandContext.Users
                                              join fb in helperLandContext.FavoriteAndBlockeds on u.UserId equals fb.UserId into fb1
                                              from fb in fb1.DefaultIfEmpty()
                                              where u.ZipCode == sr.ZipCode && u.IsApproved == true && u.UserTypeId == (int)UserTypeIdEnum.ServiceProvider && Convert.ToInt16(getLoggedinUserId()) != fb.TargetUserId
                                              select u.Email).AsNoTracking().ToList()
                          }).AsNoTracking().ToList();
            EmailModel emailModel = new EmailModel();
            string stremails = "";
            var vCount = 0;
            foreach (var e in emails)
            {
                if (e.serviceProviderEmail != null)
                {
                    stremails += e.serviceProviderEmail;
                }
                else
                {
                    foreach (var sps in e.availableSps)
                    {
                        if (vCount == 0)
                        {
                            stremails += sps;
                            vCount++;
                        }
                        else
                        {
                            stremails += "," + sps;
                        }
                    }
                }
            }
            emailModel.To = stremails;
            emailModel.Subject = "Service Request Cancelled by Customer!";
            emailModel.Body = "Cancelled Service ID: <strong>" + servicerequestid + "</strong>";
            MailHelper mailhelper = new MailHelper(configuration);
            mailhelper.Send(emailModel);
            return Json(helperLandContext.SaveChanges());
        }

        [HttpGet]
        public JsonResult getCustomerServiceHistoryData()
        {
            //var x = helperLandContext.Ratings.Where(r => r.RatingTo == 44).GroupBy(g => g.RatingTo, r => r.Ratings).Select(g => new { Ratings = g.Average() });
            var result = (from cs in helperLandContext.Users
                          join sr in helperLandContext.ServiceRequests on (int?)cs.UserId equals (int?)sr.UserId into sr1
                          from sr in sr1.DefaultIfEmpty()
                          join sp in helperLandContext.Users on (int?)sr.ServiceProviderId equals (int?)sp.UserId into sp1
                          from sp in sp1.DefaultIfEmpty()
                          where (int?)cs.UserId == getLoggedinUserId() && (int?)sr.Status != (int)ServiceStatusEnum.New && (int?)sr.Status != (int)ServiceStatusEnum.Pending
                          select new
                          {
                              CustomerId = (int?)cs.UserId,
                              ServiceRequestId = (int?)sr.ServiceRequestId,
                              ServiceDateTime = (DateTime?)sr.ServiceStartDate,
                              ServiceProviderId = (int?)sr.ServiceProviderId,
                              ServiceProviderName = sp.FirstName + " " + sp.LastName,
                              ServiceProviderProfile = sp.UserProfilePicture,
                              Payment = (int?)sr.TotalCost,
                              ServiceHours = (decimal?)sr.ServiceHours,
                              SPRate = helperLandContext.Ratings.Where(x => x.RatingTo == (int?)sp.UserId).Select(z => z.Ratings).AsEnumerable(),
                              ServiceStatus = (int?)sr.Status
                          }).ToList();
            return Json(result);
        }

        [HttpGet]
        public JsonResult checkIfCustomerAlreadyRatedSPForServiceRequest(int servicerequestid)
        {
            return Json(helperLandContext.Ratings.Where(s => s.ServiceRequestId == servicerequestid).Count());
        }

        [HttpPost]
        public JsonResult saveRatingsOfSP([FromBody]SPRatingsViewModel spRatingsViewModel)
        {
            Rating rating = new Rating
            {
                ServiceRequestId = spRatingsViewModel.ServiceRequestId,
                RatingFrom = getLoggedinUserId(),
                RatingTo = spRatingsViewModel.RatingTo,
                Ratings = spRatingsViewModel.Ratings,
                Comments = spRatingsViewModel.Comments,
                RatingDate = DateTime.Now,
                OnTimeArrival = spRatingsViewModel.OnTimeArrival,
                Friendly = spRatingsViewModel.Friendly,
                QualityOfService = spRatingsViewModel.QualityOfService
            };
            return Json(serviceRequestRepository.saveRatingsForSP(rating));
        }

        [HttpGet]
        public JsonResult getFavouriteProsData()
        {
            var sps = (from sr in helperLandContext.ServiceRequests
                       join u in helperLandContext.Users on sr.ServiceProviderId equals u.UserId
                       join fb in helperLandContext.FavoriteAndBlockeds on (int?)sr.ServiceProviderId equals (int?)fb.TargetUserId into fb1
                       from fb in fb1.DefaultIfEmpty()
                       where sr.UserId == getLoggedinUserId()
                       select new
                       {
                           spId = sr.ServiceProviderId,
                           spProfile = u.UserProfilePicture,
                           spCleaningCount = helperLandContext.ServiceRequests.Where(c => c.UserId == getLoggedinUserId() && c.ServiceProviderId == sr.ServiceProviderId && c.Status == (int)ServiceStatusEnum.Completed).Count(),
                           spRating = (decimal?)helperLandContext.Ratings.Where(r => r.RatingTo == sr.ServiceProviderId && r.RatingFrom == getLoggedinUserId()).Average(r => r.Ratings),
                           spName = u.FirstName + " " + u.LastName,
                           spBlock = (bool?)fb.IsBlocked,
                           spFav = (bool?)fb.IsFavorite
                       }).Distinct().ToList();
            return Json(sps);
        }

        [HttpPost]
        public JsonResult favProsActions(int spId, int favProsActionId, bool favProsAction)
        {
            FavoriteAndBlocked fb = helperLandContext.FavoriteAndBlockeds.Where(x => x.UserId == getLoggedinUserId() && x.TargetUserId == spId).FirstOrDefault();
            var isFavourite = false;
            var isBlock = false;
            if (favProsActionId == 1 || favProsActionId == 3)
                isFavourite = favProsAction;
            else if(favProsActionId == 2 || favProsActionId == 4)
                isBlock = favProsAction;
            if (fb != null)
            {
                fb.IsFavorite = isFavourite;
                fb.IsBlocked = isBlock;
                helperLandContext.FavoriteAndBlockeds.Update(fb);
            }
            else
            {
                FavoriteAndBlocked fb1 = new FavoriteAndBlocked();
                fb1.UserId = getLoggedinUserId();
                fb1.TargetUserId = spId;
                fb1.IsFavorite = isFavourite;
                fb1.IsBlocked = isBlock;                
                helperLandContext.FavoriteAndBlockeds.Add(fb1);
            }
            return Json(helperLandContext.SaveChanges());
        }
    }
}