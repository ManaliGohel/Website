using Helperland.Data;
using Helperland.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Helperland.Repository
{
    public class ServiceRequestRepository: IServiceRequestRepository
    {
        private readonly HelperLandContext helperLandContext;

        public ServiceRequestRepository(HelperLandContext helperLandContext)
        {
            this.helperLandContext = helperLandContext;
        }
        public int saveServiceRequest(ServiceRequest serviceRequest)
        {
            helperLandContext.ServiceRequests.Add(serviceRequest);            
            return helperLandContext.SaveChanges();
        }
    }
}
