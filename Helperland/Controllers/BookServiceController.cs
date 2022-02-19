using Helperland.Data;
using Helperland.Enums;
using Helperland.Models;
using Helperland.Repository;
using Helperland.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        public BookServiceController(HelperLandContext helperLandContext, IUserAddressRepository userAddressRepository)
        {
            this.helperLandContext = helperLandContext;
            this.userAddressRepository = userAddressRepository;
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
    }
}
