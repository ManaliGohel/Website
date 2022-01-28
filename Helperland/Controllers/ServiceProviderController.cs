using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Helperland.Controllers
{
    public class ServiceProviderController : Controller
    {
        public IActionResult becomeaprovider()
        {
            return View();
        }
        public IActionResult upcomingservice()
        {
            return View();
        }
    }
}
