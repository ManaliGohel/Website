using Helperland.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Helperland.Repository
{
    public interface ICustomerSettingsRepository
    {        
        public int updateCustomerDetails(int userid, UserDetailsViewModel userDetailsViewModel);
        public int updateCustomerAddress(UserAddressViewModel userAddressViewModel);
        public int deleteCustomerAddress(int addressid);
        public int updateUserPassword(int userid, string password);
    }
}
