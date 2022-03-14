using Helperland.Data;
using Helperland.Enums;
using Helperland.Models;
using Helperland.ViewModels;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace Helperland.Repository
{
    public class ServiceProviderRepository: IServiceProviderRepository
    {
        private readonly HelperLandContext helperLandContext;

        public ServiceProviderRepository(HelperLandContext helperLandContext)
        {
            this.helperLandContext = helperLandContext;
        }
        public int updateServiceProviderDetails(int spId, SPMyDetailsViewModel spMyDetailsViewModel)
        {
            User user = helperLandContext.Users.Where(u => u.UserId == spId).FirstOrDefault();
            if (user != null)
            {
                user.FirstName = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(spMyDetailsViewModel.FirstName);
                user.LastName = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(spMyDetailsViewModel.LastName);
                user.Mobile = spMyDetailsViewModel.Mobile;
                if(spMyDetailsViewModel.Year!=0 && spMyDetailsViewModel.Month!=0 && spMyDetailsViewModel.Date != 0)
                {
                    user.DateOfBirth = new DateTime(spMyDetailsViewModel.Year, spMyDetailsViewModel.Month, spMyDetailsViewModel.Date, 00, 00, 00, 0);
                }                
                user.NationalityId = spMyDetailsViewModel.Nationality;
                user.Gender = spMyDetailsViewModel.Gender;
                user.UserProfilePicture = spMyDetailsViewModel.SPProfilePicture;
                user.ZipCode = spMyDetailsViewModel.PostalCode;
                user.ModifiedBy = (int)UserTypeIdEnum.ServiceProvider;
                user.ModifiedDate = DateTime.Now;
            }
            helperLandContext.Users.Update(user);
            if (spMyDetailsViewModel.AddressLine1 != "" || spMyDetailsViewModel.AddressLine2 != "" || spMyDetailsViewModel.PostalCode != "")
            {
                UserAddress spAdd = helperLandContext.UserAddresses.Where(a => a.UserId == spId).FirstOrDefault();
                if (spAdd != null)
                {
                    spAdd.AddressLine1 = spMyDetailsViewModel.AddressLine1;
                    spAdd.AddressLine2 = spMyDetailsViewModel.AddressLine2;
                    spAdd.PostalCode = spMyDetailsViewModel.PostalCode;
                    spAdd.City = spMyDetailsViewModel.City;
                    spAdd.State = spMyDetailsViewModel.State;
                    spAdd.IsDefault = true;
                    spAdd.IsDeleted = true;
                    spAdd.Mobile = spMyDetailsViewModel.Mobile;
                    spAdd.Email = spMyDetailsViewModel.Email;
                    helperLandContext.UserAddresses.Update(spAdd);
                }
                else
                {
                    UserAddress spAddress = new UserAddress
                    {
                        UserId = spId,
                        AddressLine1 = spMyDetailsViewModel.AddressLine1,
                        AddressLine2 = spMyDetailsViewModel.AddressLine2,
                        PostalCode = spMyDetailsViewModel.PostalCode,
                        City = spMyDetailsViewModel.City,
                        State = spMyDetailsViewModel.State,
                        IsDefault = true,
                        IsDeleted = true,
                        Mobile = spMyDetailsViewModel.Mobile,
                        Email = spMyDetailsViewModel.Email
                    };
                    helperLandContext.UserAddresses.Add(spAddress);
                }
            }            
            return helperLandContext.SaveChanges();
        }
        public List<ServiceRequest> alreadyAcceptedSRbySP(int serviceproviderid)
        {
            List<ServiceRequest> alreadyAcceptedSRsBySP = helperLandContext.ServiceRequests.Where(x => x.ServiceProviderId == serviceproviderid).ToList();
            return alreadyAcceptedSRsBySP;
        }
        public ServiceRequest getDetailsOfSR(int servicerequestid)
        {
            return helperLandContext.ServiceRequests.Where(sr=>sr.ServiceRequestId == servicerequestid).FirstOrDefault();
        }
        public int completeOrCancelSRbySP(int servicerequestid, int spid, int statuscode)
        {
            var sr = helperLandContext.ServiceRequests.Where(sr => sr.ServiceRequestId == servicerequestid).FirstOrDefault();
            if (sr != null)
            {
                sr.Status = statuscode;
                sr.ModifiedBy = spid;
                sr.ModifiedDate = DateTime.Now;
            }
            helperLandContext.ServiceRequests.Update(sr);
            return helperLandContext.SaveChanges();
        }
        public int BlockCutomer(FavoriteAndBlocked favoriteAndBlocked)
        {
            helperLandContext.FavoriteAndBlockeds.Add(favoriteAndBlocked);
            return helperLandContext.SaveChanges();
        }
        public int UnBlockCutomer(int targetuserid)
        {
            var unblockuser = helperLandContext.FavoriteAndBlockeds.Where(x => x.TargetUserId == targetuserid).FirstOrDefault();
            helperLandContext.FavoriteAndBlockeds.Remove(unblockuser);
            return helperLandContext.SaveChanges();
        }
    }
}
