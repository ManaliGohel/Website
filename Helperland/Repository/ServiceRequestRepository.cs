using Helperland.Data;
using Helperland.Enums;
using Helperland.Models;
using Helperland.ViewModels;
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
        public int saveRatingsForSP(Rating rating)
        {
            helperLandContext.Ratings.Add(rating);
            return helperLandContext.SaveChanges();
        }        
    }
}
