using Helperland.Models;
using Helperland.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Helperland.Repository
{
    public interface IServiceRequestRepository
    {
        public int saveServiceRequest(ServiceRequest serviceRequest);
        public int saveRatingsForSP(Rating rating);
    }
}
