using Helperland.Models;
using Helperland.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Helperland.Repository
{
    public interface IAdminRepository
    {
        public int editServiceRequest([FromBody] EditServiceRequestbyAdminViewModel editServiceRequestbyAdminViewModel, int adminid);
        public int cancelServiceRequest(int srid, int adminid);
        public int userManagementUpdateActions(int userid, int actionid);
    }
}
