using Helperland.Core;
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
using System.Linq;
using System.Threading.Tasks;

namespace Helperland.Controllers
{
    public class AdminController : Controller
    {
        private readonly IAdminRepository adminRepository;
        private readonly HelperLandContext helperLandContext;

        public AdminController(IAdminRepository adminRepository, HelperLandContext helperLandContext)
        {
            this.adminRepository = adminRepository;
            this.helperLandContext = helperLandContext;
        }
        public IActionResult Index()
        {
            if (HttpContext.Session.GetInt32("UserType") == (int)UserTypeIdEnum.Admin)
            {
                ViewBag.UserName = HttpContext.Session.GetString("UserName");
                return View();
            }
            else
                return RedirectToAction("index", "customer");
        }

        [HttpGet]
        public JsonResult getAdminPanelServiceRequestsData()
        {
            var data = (from sr in helperLandContext.ServiceRequests
                        join uc in helperLandContext.Users on sr.UserId equals uc.UserId
                        join sra in helperLandContext.ServiceRequestAddresses on sr.ServiceRequestId equals sra.ServiceRequestId
                        join usp in helperLandContext.Users on (int?)sr.ServiceProviderId equals (int?)usp.UserId into usp1
                        from usp in usp1.DefaultIfEmpty()
                        join rt in helperLandContext.Ratings on (int?)sr.ServiceRequestId equals (int?)rt.ServiceRequestId into rt1
                        from rt in rt1.DefaultIfEmpty()
                        orderby sr.ServiceRequestId descending
                        select new
                        {
                            ServiceRequestId = sr.ServiceRequestId,
                            ServiceStartDateTime = sr.ServiceStartDate,
                            ServiceDuration = sr.ServiceHours,
                            CustomerName = uc.FirstName + " " + uc.LastName,
                            StreetName = sra.AddressLine1,
                            HouseNumber = sra.AddressLine2,
                            PostalCode = sra.PostalCode,
                            City = sra.City,
                            State = sra.State,
                            ServiceProviderId = (int?)sr.ServiceProviderId,
                            ServiceProviderProfile = usp.UserProfilePicture,
                            ServiceProviderName = usp.FirstName + ' ' + usp.LastName,
                            ServiceProviderRate = (decimal?)rt.Ratings,
                            ServiceStatus = sr.Status
                        }).ToList();
            return Json(data);
        }
        [HttpGet]
        public JsonResult getAdminPanelUserManagementData()
        {
            return Json((from u in helperLandContext.Users select u).ToList());
        }

        [HttpGet]
        public JsonResult getCustomers(string searchTerm)
        {
            var users = helperLandContext.Users.Where(u => u.UserTypeId == (int)UserTypeIdEnum.Customer).ToList();
            if (searchTerm != null)
            {
                users = helperLandContext.Users.Where(u => (u.FirstName.Contains(searchTerm) || u.LastName.Contains(searchTerm)) && u.UserTypeId == (int)UserTypeIdEnum.Customer).Distinct().ToList();
            }
            var data = users.Select(u => new
            {
                id = u.FirstName + " " + u.LastName,
                text = u.FirstName + " " + u.LastName
            }).Distinct();
            return Json(data);
        }
        [HttpGet]
        public JsonResult getServiceProviders(string searchTerm)
        {
            var users = helperLandContext.Users.Where(u => u.UserTypeId == (int)UserTypeIdEnum.ServiceProvider).ToList();
            if (searchTerm != null)
            {
                users = helperLandContext.Users.Where(u => (u.FirstName.Contains(searchTerm) || u.LastName.Contains(searchTerm)) && u.UserTypeId == (int)UserTypeIdEnum.ServiceProvider).Distinct().ToList();
            }
            var data = users.Select(u => new
            {
                id = u.FirstName + " " + u.LastName,
                text = u.FirstName + " " + u.LastName
            }).Distinct();
            return Json(data);
        }
        [HttpGet]
        public JsonResult getUsers(string searchTerm)
        {
            var users = helperLandContext.Users.ToList();
            if (searchTerm != null)
            {
                users = helperLandContext.Users.Where(u => u.FirstName.Contains(searchTerm) || u.LastName.Contains(searchTerm)).Distinct().ToList();
            }
            var data = users.Select(u => new
            {
                id = u.FirstName + " " + u.LastName,
                text = u.FirstName + " " + u.LastName
            }).Distinct();
            return Json(data);
        }

        public int getLoggedinUserId()
        {
            if (HttpContext.Request.Cookies["UserId"] != null)
                return Int32.Parse(HttpContext.Request.Cookies["UserId"]);
            else
                return (int)HttpContext.Session.GetInt32("UserId");
        }

        [HttpPost]
        public JsonResult updateServiceRequestDateTime([FromBody] EditServiceRequestbyAdminViewModel editServiceRequestbyAdminViewModel)
        {
            return Json(adminRepository.editServiceRequest(editServiceRequestbyAdminViewModel, getLoggedinUserId()));
        }

        [HttpPost]
        public JsonResult cancelServiceRequest(int srid)
        {
            return Json(adminRepository.cancelServiceRequest(srid, getLoggedinUserId()));
        }

        [HttpPost]
        public JsonResult userManagementUpdateActions(int userid, int actionid)
        {
            return Json(adminRepository.userManagementUpdateActions(userid, actionid));
        }
    }
}
