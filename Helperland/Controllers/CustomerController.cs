using Helperland.Core;
using Helperland.Data;
using Helperland.Enums;
using Helperland.Models;
using Helperland.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Helperland.Controllers
{
    public class CustomerController : Controller
    {
        private readonly ILogger<CustomerController> _logger;
        private readonly HelperLandContext helperLandContext;
        private readonly IConfiguration configuration;
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IDataProtectionProvider _dataProtectionProvider;
        private readonly string _key = "HELPERLAND";
        private User _user;

        public CustomerController(ILogger<CustomerController> logger, HelperLandContext helperLandContext,
                                   IHostingEnvironment hostingEnvironment, IConfiguration configuration,
                                   IDataProtectionProvider dataProtectionProvider)
        {
            _logger = logger;
            this.helperLandContext = helperLandContext;
            this.configuration = configuration;
            this._hostingEnvironment = hostingEnvironment;
            this._dataProtectionProvider = dataProtectionProvider;
        }

        public async Task<IActionResult> index()
        {
            if (HttpContext.Request.Cookies["EmailId"] != null && HttpContext.Request.Cookies["Password"] != null)
            {
                User user = await helperLandContext.Users.FirstOrDefaultAsync(e => e.Email == HttpContext.Request.Cookies["EmailId"] && e.Password == HttpContext.Request.Cookies["Password"]);
                if (user != null && user.IsApproved == true)
                {
                    HttpContext.Session.SetInt32("UserType", user.UserTypeId);
                    HttpContext.Session.SetString("UserName", user.FirstName);
                    if (user.UserTypeId == (int)UserTypeIdEnum.Customer)
                        return RedirectToAction("servicehistory", "customer");
                    else if (user.UserTypeId == (int)UserTypeIdEnum.ServiceProvider)
                        return RedirectToAction("upcomingservice", "serviceprovider");
                    else
                        return RedirectToAction("index", "admin");
                }
                return View();
            }
            else
                return View();
        }

        public IActionResult home()
        {
            return View("~/Views/Customer/index.cshtml");
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

        [HttpPost]
        public IActionResult contactus(ContactUsViewModel model)
        {
            if (ModelState.IsValid)
            {
                string filepath = "";
                string filename = "";
                if (model.attachment != null)
                {
                    string UploadsFolder = Path.Combine(_hostingEnvironment.WebRootPath, "upload\\contactus_attachment");
                    filename = Guid.NewGuid().ToString() + "_" + model.attachment.FileName;
                    filepath = Path.Combine(UploadsFolder, filename);
                    using (var fileStream = new FileStream(filepath, FileMode.Create))
                    {
                        model.attachment.CopyTo(fileStream);
                    }
                }
                ContactU Newcontact = new ContactU()
                {
                    Name = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(model.firstname) + " " + CultureInfo.CurrentCulture.TextInfo.ToTitleCase(model.lastname),
                    Email = model.email,
                    Subject = model.subject,
                    PhoneNumber = model.mobile,
                    Message = model.message,
                    UploadFileName = filename
                };
                helperLandContext.Add(Newcontact);
                helperLandContext.SaveChanges();
                EmailModel emailmodel = new EmailModel
                {
                    From = "",
                    To = "",
                    Subject = Newcontact.Subject,
                    Body = Newcontact.Message,
                    Attachment = filepath  
                };
                MailHelper mailhelp = new MailHelper(configuration);
                mailhelp.SendContactUs(emailmodel);
                return RedirectToAction();
            }
            return View();
        }
        public IActionResult aboutus()
        {
            return View();
        }
        public IActionResult servicehistory()
        {
            if (HttpContext.Session.GetInt32("UserType") == (int)UserTypeIdEnum.Customer)
            {
                ViewBag.UserName = HttpContext.Session.GetString("UserName");
                return View();
            }
            else
                return RedirectToAction("index", "customer");
        }
        public IActionResult bookservice()
        {
            if (HttpContext.Session.GetInt32("UserType") != null)
                ViewBag.UserName = HttpContext.Session.GetString("UserName");
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

        [HttpPost]
        public IActionResult customersignup(SignupViewModel model)
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
                        UserTypeId = (int)UserTypeIdEnum.Customer,
                        IsApproved = true,
                        ModifiedBy = (int)UserTypeIdEnum.Customer,
                        ModifiedDate = DateTime.Now
                    };
                    helperLandContext.Add(user);
                    helperLandContext.SaveChanges();
                    TempData["msg"] = "Account Created Successfully!!";
                    return RedirectToAction("customersignup", "customer");
                }
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return View();
        }

        [HttpPost]
        [HttpGet]
        public async Task<IActionResult> isEmailAlreadyRegistered(string email)
        {
            var user = await helperLandContext.Users.FirstOrDefaultAsync(e => e.Email == email);
            if (user == null)
                return Json(true);
            else
                return Json($"This Email {email} is Already Registered!!");
        }

        [HttpPost]
        public JsonResult checkForLoginIfUserExistorNot(string email, string password, bool isremember)
        {
            var isExist = helperLandContext.Users.Where(u => u.Email.Equals(email) && u.Password.Equals(password)).FirstOrDefault();
            string result;
            if (isExist != null)
            {
                if (isExist.IsApproved == true)
                {
                    if (isremember == true)
                    {
                        CookieOptions cookieOptions = new CookieOptions();
                        cookieOptions.Expires = new DateTimeOffset(DateTime.Now.AddMonths(1));
                        HttpContext.Response.Cookies.Append("EmailId", isExist.Email, cookieOptions);
                        HttpContext.Response.Cookies.Append("Password", isExist.Password, cookieOptions);
                        HttpContext.Response.Cookies.Append("UserId", isExist.UserId.ToString(), cookieOptions);
                    }
                    HttpContext.Session.SetInt32("UserType", isExist.UserTypeId);
                    HttpContext.Session.SetString("UserName", isExist.FirstName);
                    HttpContext.Session.SetInt32("UserId", isExist.UserId);
                    if (HttpContext.Session.GetString("redirectToBookService") == "1")
                    {
                        result = "Book Service";
                        HttpContext.Session.Remove("redirectToBookService");
                    }
                    else
                        result = isExist.UserTypeId.ToString();                    
                }
                else
                    result = "Still you are not Approved by Admin!!";
            }
            else
                result = "Invalid Username/Password!!";
            return Json(result);
        }

        [HttpPost]
        public JsonResult checkForForgotPasswordIfUserExistorNot(string email)
        {
            var user = helperLandContext.Users.Where(u => u.Email.Equals(email)).FirstOrDefault();
            bool result = false;
            if (user != null)
            {
                var plaintextbytes = System.Text.Encoding.UTF8.GetBytes(user.Password);
                var OldPassword = System.Convert.ToBase64String(plaintextbytes);
                string input = email + "_!_" + DateTime.Now.ToString() + "_!_" + OldPassword;
                var protector = _dataProtectionProvider.CreateProtector(_key);
                string encrypt = protector.Protect(input);
                EmailModel emailModel = new EmailModel
                {
                    To = email,
                    Subject = "Helperland Reset Password",
                    Body = "<h2>Reset Password Link:</h2><br/> " + "http://" + this.Request.Host.ToString() + "/Customer/resetpassword?token=" + encrypt
                };
                MailHelper mailhelper = new MailHelper(configuration);
                mailhelper.Send(emailModel);
                result = true;
            }
            return Json(result);
        }

        public IActionResult resetPassword(string token)
        {
            if (ModelState.IsValid)
            {
                if (token != null)
                {
                    checkPassword(token);
                    return View();
                }
            }
            return View();
        }

        public bool checkPassword(string token)
        {
            string decrypt = "";
            try
            {
                var protector = _dataProtectionProvider.CreateProtector(_key);
                decrypt = protector.Unprotect(token);
            }
            catch
            {
                ViewBag.errMsg = "Link is InValid";
                return true;
            }
            string[] resetpasswordToken = decrypt.Split("_!_");
            _user = helperLandContext.Users.Where(x => x.Email == resetpasswordToken[0]).FirstOrDefault();
            DateTime tokendate = Convert.ToDateTime(resetpasswordToken[1]).AddMinutes(30);
            DateTime dateTime = DateTime.Now;
            var Base64EncodeBytes = System.Convert.FromBase64String(resetpasswordToken[2]);
            var oldPassword = System.Text.Encoding.UTF8.GetString(Base64EncodeBytes);
            if (tokendate < dateTime || oldPassword != _user.Password)
            {
                ViewBag.errMsg = "Link is Expaired";
                return false;
            }
            return true;
        }

        [HttpPost]
        public IActionResult resetPassword(ResetPasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                if (!checkPassword(model.token))
                {
                    return View();
                }
                else
                {
                    ViewBag.errMsg = "Success";
                    ViewBag.msg = "true";
                }
                _user.Password = model.newPassword;
                _user.ModifiedDate = DateTime.Now;
                helperLandContext.Users.Update(_user);
                helperLandContext.SaveChanges();
            }
            return View();
        }

        public IActionResult logout()
        {
            foreach (var cookie in Request.Cookies.Keys)
                Response.Cookies.Delete(cookie);
            HttpContext.Session.Clear();
            return RedirectToAction("index", "customer");
        }
    }
}
