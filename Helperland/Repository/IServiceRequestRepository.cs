using Helperland.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Helperland.Repository
{
    public interface IServiceRequestRepository
    {
        public int saveServiceRequest(ServiceRequest serviceRequest);
    }
}
