using Helperland.Data;
using Helperland.Enums;
using Helperland.Models;
using Helperland.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Helperland.Controllers
{
    public class ServiceProviderController : Controller
    {
        private readonly HelperLandContext helperLandContext;
        public ServiceProviderController(HelperLandContext helperLandContext)
        {
            this.helperLandContext = helperLandContext;
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
                        FirstName = model.firstname,
                        LastName = model.lastname,
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
            return View();
        }
    }
}
