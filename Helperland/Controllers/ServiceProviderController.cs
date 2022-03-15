using Helperland.Data;
using Helperland.Enums;
using Helperland.Models;
using Helperland.Repository;
using Helperland.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace Helperland.Controllers
{
    public class ServiceProviderController : Controller
    {
        private readonly HelperLandContext helperLandContext;
        private readonly IServiceProviderRepository serviceProviderRepository;

        public ServiceProviderController(HelperLandContext helperLandContext, IServiceProviderRepository serviceProviderRepository)
        {
            this.helperLandContext = helperLandContext;
            this.serviceProviderRepository = serviceProviderRepository;
        }
        public IActionResult becomeaprovider()
        {
            return View();
        }
        [HttpPost]
        public IActionResult becomeaprovider(SignupViewModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    User user = new User
                    {
                        FirstName = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(model.firstname),
                        LastName = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(model.lastname),
                        Email = model.email,
                        Mobile = model.mobile,
                        Password = model.password,
                        CreatedDate = DateTime.Now,
                        UserTypeId = (int)UserTypeIdEnum.ServiceProvider,
                        IsApproved = false,
                        ModifiedBy = (int)UserTypeIdEnum.ServiceProvider,
                        ModifiedDate = DateTime.Now
                    };
                    helperLandContext.Add(user);
                    helperLandContext.SaveChanges();
                    TempData["msg"] = "Registration completed Successfully! Now you can Login after Admin approve your Registration...";
                    return RedirectToAction("becomeaprovider", "ServiceProvider");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return View();
        }
        public IActionResult upcomingservice()
        {
            if (HttpContext.Session.GetInt32("UserType") == (int)UserTypeIdEnum.ServiceProvider)
            {
                ViewBag.UserName = HttpContext.Session.GetString("UserName");
                return View();
            }               
            else
                return RedirectToAction("index", "customer");
        }

        [HttpGet]
        public JsonResult getLoggedinSPData()
        {
            var serviceProvider = (from sp in helperLandContext.Users
                                   join ua in helperLandContext.UserAddresses on (int?)sp.UserId equals (int?)ua.UserId into ua1
                                   from ua in ua1.DefaultIfEmpty()
                                   where sp.UserId == getLoggedinUserId()
                                   select new
                                   {
                                       FirstName = sp.FirstName,
                                       LastName = sp.LastName,
                                       Email = sp.Email,
                                       Mobile = sp.Mobile,
                                       DOB = (DateTime?)sp.DateOfBirth,
                                       Nationality = (int?)sp.NationalityId,
                                       Gender = (int?)sp.Gender,
                                       SpProfilePicture = sp.UserProfilePicture,
                                       AddressId = (int?)ua.AddressId,
                                       AddressLine1 = ua.AddressLine1,
                                       AddressLine2 = ua.AddressLine2,
                                       City = ua.City,
                                       State = ua.State,
                                       Postalcode = ua.PostalCode,
                                       CitiesStatesByPostalcode = (from z in helperLandContext.Zipcodes
                                                                   join c in helperLandContext.Cities on z.CityId equals c.Id
                                                                   join s in helperLandContext.States on c.StateId equals s.Id
                                                                   where z.ZipcodeValue == ua.PostalCode
                                                                   select new
                                                                   {
                                                                       dCity = c.CityName,
                                                                       dState = s.StateName
                                                                   }).ToList()
                                   }).ToList();
            return Json(serviceProvider);
        }

        public int getLoggedinUserId()
        {
            if (HttpContext.Request.Cookies["UserId"] != null)
                return Int32.Parse(HttpContext.Request.Cookies["UserId"]);
            else
                return (int)HttpContext.Session.GetInt32("UserId");
        }
        public string getLoggedinSPPostalcode()
        {
            return helperLandContext.Users.Where(z => z.UserId == getLoggedinUserId()).Select(z => z.ZipCode).FirstOrDefault();
        }

        public JsonResult updateSPDetails([FromBody]SPMyDetailsViewModel spMyDetailsViewModel)
        {
            return Json(serviceProviderRepository.updateServiceProviderDetails(getLoggedinUserId(), spMyDetailsViewModel));
        }

        [HttpGet]
        public JsonResult getLoggedinSPNewServiceRequestsData(bool hasPets)
        {
            var result = (from sr in helperLandContext.ServiceRequests
                          join u in helperLandContext.Users
                          on sr.UserId equals u.UserId
                          join sra in helperLandContext.ServiceRequestAddresses
                          on sr.ServiceRequestId equals sra.ServiceRequestId
                          join fb in helperLandContext.FavoriteAndBlockeds on (int?)sr.UserId equals (int?)fb.TargetUserId into fb1
                          from fb in fb1.DefaultIfEmpty()
                          where sr.ZipCode == getLoggedinSPPostalcode() && sr.Status == (int)ServiceStatusEnum.New && sr.HasPets == hasPets && (int?)fb.TargetUserId!=(int?)sr.UserId
                          select new
                          {
                              ServiceRequestId = sr.ServiceRequestId,
                              ServiceStartDate = sr.ServiceStartDate,
                              ServiceDuration = sr.ServiceHours,
                              Payment = sr.TotalCost,
                              CustomerId = u.UserId,
                              CustomerName = u.FirstName + " " + u.LastName,
                              AddressId = sra.Id,
                              StreetName = sra.AddressLine1,
                              HouseNumber = sra.AddressLine2,
                              PostalCode = sra.PostalCode,
                              City = sra.City,
                              State = sra.State
                          }).ToList();
            return Json(result);
        }

        public JsonResult acceptNewServicerequestSP(int serviceid)
        {
            ServiceRequest requestToAccept = helperLandContext.ServiceRequests.Where(x => x.ServiceRequestId == serviceid).FirstOrDefault();
            List<ServiceRequest> alreadyAcceptedSRs = serviceProviderRepository.alreadyAcceptedSRbySP(getLoggedinUserId());
            bool isSRConflict = false;
            bool noLongerAvailable = true;
            foreach (var checkConflict in alreadyAcceptedSRs)
            {
                DateTime newSRStartDateTime = Convert.ToDateTime(requestToAccept.ServiceStartDate);
                DateTime newSREndDateTime = newSRStartDateTime.AddMinutes((requestToAccept.ServiceHours * 60) + 30);
                if (checkConflict.ServiceRequestId != serviceid)
                {
                    if (checkConflict.ServiceStartDate <= newSREndDateTime && newSRStartDateTime <= checkConflict.ServiceStartDate.AddMinutes((checkConflict.ServiceHours * 60)+30))
                    {
                        isSRConflict = true;
                        return Json(new { checkConflict.ServiceRequestId, isSRConflict });
                    }
                    else
                    {
                        isSRConflict = false;
                    }
                }
                newSRStartDateTime = DateTime.Now.Date;
                newSREndDateTime = DateTime.Now.Date;
            }
            if (isSRConflict == false)
            {
                if (helperLandContext.ServiceRequests.Where(sr => sr.ServiceRequestId == serviceid && sr.Status == (int)ServiceStatusEnum.New).Count() == 1)
                {
                    ServiceRequest srData = serviceProviderRepository.getDetailsOfSR(serviceid);
                    srData.ServiceProviderId = getLoggedinUserId();
                    srData.SpacceptedDate = DateTime.Now;
                    srData.Status = (int)ServiceStatusEnum.Pending;
                    helperLandContext.ServiceRequests.Update(srData);
                    helperLandContext.SaveChanges();
                }
                else
                {
                    return Json(new { noLongerAvailable });
                }
            }
            return Json(isSRConflict);
        }

        [HttpGet]
        public JsonResult getLoggedinSPUpcomingServicesData()
        {
            var result = (from sr in helperLandContext.ServiceRequests
                          join u in helperLandContext.Users
                          on sr.UserId equals u.UserId
                          join sra in helperLandContext.ServiceRequestAddresses
                          on sr.ServiceRequestId equals sra.ServiceRequestId
                          where sr.ServiceProviderId == getLoggedinUserId() && sr.Status == (int)ServiceStatusEnum.Pending
                          select new
                          {
                              ServiceRequestId = sr.ServiceRequestId,
                              ServiceStartDate = sr.ServiceStartDate,
                              ServiceDuration = sr.ServiceHours,
                              Payment = sr.TotalCost,
                              Distance = sr.Distance,
                              CustomerId = u.UserId,
                              CustomerName = u.FirstName + " " + u.LastName,
                              AddressId = sra.Id,
                              StreetName = sra.AddressLine1,
                              HouseNumber = sra.AddressLine2,
                              PostalCode = sra.PostalCode,
                              City = sra.City,
                              State = sra.State
                          }).ToList();
            return Json(result);
        }

        [HttpPost]
        public JsonResult completeSRbySP(int servicerequestid)
        {
            return Json(serviceProviderRepository.completeOrCancelSRbySP(servicerequestid, getLoggedinUserId(), (int)ServiceStatusEnum.Completed));
        }
        [HttpPost]
        public JsonResult cancelSRbySP(int servicerequestid)
        {
            return Json(serviceProviderRepository.completeOrCancelSRbySP(servicerequestid, getLoggedinUserId(), (int)ServiceStatusEnum.Cancelled));
        }

        [HttpGet]
        public JsonResult getLoggedinSPServiceHistoryData()
        {
            var result = (from sr in helperLandContext.ServiceRequests
                          join u in helperLandContext.Users
                          on sr.UserId equals u.UserId
                          join sra in helperLandContext.ServiceRequestAddresses
                          on sr.ServiceRequestId equals sra.ServiceRequestId
                          where sr.ServiceProviderId == getLoggedinUserId() && sr.Status == (int)ServiceStatusEnum.Completed
                          select new
                          {
                              ServiceRequestId = sr.ServiceRequestId,
                              ServiceStartDate = sr.ServiceStartDate,
                              ServiceDuration = sr.ServiceHours,
                              CustomerName = u.FirstName + " " + u.LastName,
                              StreetName = sra.AddressLine1,
                              HouseNumber = sra.AddressLine2,
                              PostalCode = sra.PostalCode,
                              City = sra.City,
                              State = sra.State
                          }).ToList();
            return Json(result);
        }

        [HttpGet]
        public JsonResult getCustomersForSPBlockedData()
        {
            var serviceRequests = (from sr in helperLandContext.ServiceRequests
                                   join u in helperLandContext.Users on sr.UserId equals u.UserId
                                   where sr.ServiceProviderId == getLoggedinUserId() && sr.Status == (int)ServiceStatusEnum.Completed
                                   select new
                                   {
                                       serviceproviderid = sr.ServiceProviderId,
                                       customername = u.FirstName + " " + u.LastName,
                                       customerprofile = u.UserProfilePicture,
                                       customeruserid = u.UserId,
                                       blockeduser = helperLandContext.FavoriteAndBlockeds.Where(x => x.TargetUserId == u.UserId).FirstOrDefault()
                                   }).Distinct();
            return Json(serviceRequests);
        }

        public JsonResult BlockCustomerByLoggedinSP(int targetuserid)
        {
            FavoriteAndBlocked favoriteAndBlocked = new FavoriteAndBlocked()
            {
                UserId = getLoggedinUserId(),
                TargetUserId = targetuserid,
                IsFavorite = false,
                IsBlocked = true,
            };
            return Json(serviceProviderRepository.BlockCutomer(favoriteAndBlocked));
        }
        public JsonResult UnBlockCustomerByLoggedinSP(int targetuserid)
        {
            return Json(serviceProviderRepository.UnBlockCutomer(targetuserid));
        }

        public JsonResult getSPMyRatingsData(int ratings)
        {
            var ratingsData = (from rt in helperLandContext.Ratings
                               join u in helperLandContext.Users on rt.RatingFrom equals u.UserId
                               join sr in helperLandContext.ServiceRequests on rt.ServiceRequestId equals sr.ServiceRequestId
                               where rt.RatingTo == getLoggedinUserId() && (ratings == 0 ? rt.Ratings > 0 : (rt.Ratings <= ratings && rt.Ratings > (ratings - 1)))
                               select new
                               {
                                   servicereqestid = rt.ServiceRequestId,
                                   ratingid = rt.RatingId,
                                   customername = u.FirstName + " " + u.LastName,
                                   servistartdateandtime = sr.ServiceStartDate,
                                   rating = rt.Ratings,
                                   comment = rt.Comments,
                                   servicehoures = sr.ServiceHours
                               }).ToList();
            //var ratingsData= helperLandContext.Ratings.Where(x => x.RatingTo == 44 && x.Ratings > (ratings == 5 ? 0 : ratings) && x.Ratings <= (ratings == 5 ? 5 : (ratings + 1))).Include(x => x.RatingFromNavigation).Include(x => x.ServiceRequest);
            return Json(ratingsData);
        }
    }
}
