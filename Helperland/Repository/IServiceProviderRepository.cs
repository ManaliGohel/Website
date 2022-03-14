using Helperland.Models;
using Helperland.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Helperland.Repository
{
    public interface IServiceProviderRepository
    {
        public int updateServiceProviderDetails(int spId, SPMyDetailsViewModel spMyDetailsViewModel);
        List<ServiceRequest> alreadyAcceptedSRbySP(int serviceproviderid);
        public ServiceRequest getDetailsOfSR(int servicerequestid);
        public int completeOrCancelSRbySP(int servicerequestid, int spid, int statuscode);
        public int BlockCutomer(FavoriteAndBlocked favoriteAndBlocked);
        public int UnBlockCutomer(int targetuserid);
    }
}
