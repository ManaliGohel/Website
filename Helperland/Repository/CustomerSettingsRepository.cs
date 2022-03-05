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
    public class CustomerSettingsRepository: ICustomerSettingsRepository
    {
        private readonly HelperLandContext helperlandContext;

        public CustomerSettingsRepository(HelperLandContext helperlandContext)
        {
            this.helperlandContext = helperlandContext;
        }
        public int updateCustomerDetails(int userid, UserDetailsViewModel userDetailsViewModel)
        {
            User user = helperlandContext.Users.Where(u => u.UserId == userid).FirstOrDefault();
            if (user != null)
            {
                user.FirstName = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(userDetailsViewModel.FirstName);
                user.LastName = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(userDetailsViewModel.LastName);
                user.Mobile = userDetailsViewModel.Mobile;
                user.DateOfBirth = new DateTime(userDetailsViewModel.Year, userDetailsViewModel.Month, userDetailsViewModel.Date, 00, 00, 00, 0);
                user.LanguageId = userDetailsViewModel.LanguageId;
                user.ModifiedBy = (int)UserTypeIdEnum.Customer;
                user.ModifiedDate = DateTime.Now;
            }
            helperlandContext.Users.Update(user);            
            return helperlandContext.SaveChanges();
        }
        public int updateCustomerAddress(UserAddressViewModel userAddressViewModel)
        {
            UserAddress userAddress = helperlandContext.UserAddresses.Where(u => u.AddressId == userAddressViewModel.addressId).FirstOrDefault();
            if (userAddress != null)
            {
                userAddress.AddressLine1 = userAddressViewModel.addressLine1;
                userAddress.AddressLine2 = userAddressViewModel.addressLine2;
                userAddress.PostalCode = userAddressViewModel.postalCode;
                userAddress.Mobile = userAddressViewModel.mobile;
                userAddress.City = userAddressViewModel.city;
                userAddress.State = userAddressViewModel.state;
            }
            helperlandContext.UserAddresses.Update(userAddress);
            return helperlandContext.SaveChanges();
        }
        public int deleteCustomerAddress(int addressid)
        {
           helperlandContext.UserAddresses.Remove(helperlandContext.UserAddresses.Where(a => a.AddressId == addressid).FirstOrDefault());
           return helperlandContext.SaveChanges();
        }
        public int updateUserPassword(int userid, string password)
        {
            User user = helperlandContext.Users.Where(u => u.UserId == userid).FirstOrDefault();
            if (user != null)
            {
                user.Password = password;
            }
            helperlandContext.Users.Update(user);
            return helperlandContext.SaveChanges();
        }
    }
}
