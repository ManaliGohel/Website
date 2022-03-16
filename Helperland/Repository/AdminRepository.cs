using Helperland.Data;
using Helperland.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Helperland.Repository
{
    public class AdminRepository: IAdminRepository
    {
        private readonly HelperLandContext helperlandContext;

        public AdminRepository(HelperLandContext helperlandContext)
        {
            this.helperlandContext = helperlandContext;
        }
    }
}
