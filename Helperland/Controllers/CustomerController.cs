using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace Helperland.Controllers
{
    public class CustomerController : Controller
    {
        private readonly ILogger<CustomerController> _logger;

        public CustomerController(ILogger<CustomerController> logger)
        {
            _logger = logger;
        }

        public IActionResult index()
        {
            return View();
        }
        public IActionResult faq()
        {
            return View();
        }
        public IActionResult prices()
        {
            return View();
        }

        public IActionResult contactus()
        {
            return View();
        }
        /*[HttpPost]
        public async Task<IActionResult> contactus(ContactUs obj)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var myobj = new ContactUs();
                    myobj.Name = obj.FName + " " + obj.LName;
                    myobj.Email = obj.Email;
                    myobj.SubjectType = obj.SubjectType;
                    myobj.PhoneNumber = obj.PhoneNumber;
                    myobj.Message = obj.Message;
                    myobj.IsDeleted = false;
                    db.ContactUs.Add(myobj);
                    await db.SaveChangesAsync();
                }
                return View();
            }
            catch(Exception ex)
            {
                return View();
            }            
        }*/

        public IActionResult aboutus()
        {
            return View();
        }
        public IActionResult servicehistory()
        {
            return View();
        }
        public IActionResult bookservice()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }
        public IActionResult customersignup()
        {
            return View();
        }

        /*[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }*/
    }
}
