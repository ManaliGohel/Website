using Helperland.Data;
using Helperland.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Helperland.Repository
{
    public class ServiceRequestExtraRepository: IServiceRequestExtraRepository
    {
        private readonly HelperLandContext helperLandContext;

        public ServiceRequestExtraRepository(HelperLandContext helperLandContext)
        {
            this.helperLandContext = helperLandContext;
        }
        public int saveServiceRequestExtra(ServiceRequestExtra serviceRequestExtra)
        {
            helperLandContext.ServiceRequestExtras.Add(serviceRequestExtra);
            return helperLandContext.SaveChanges();
        }
    }
}
