using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Helperland.ViewModels
{
    public class EditServiceRequestbyAdminViewModel
    {
        [JsonPropertyName("serviceRequestId")]
        public int serviceRequestId { get; set; }
        [JsonPropertyName("serviceStartDate")]
        public string serviceStartDate { get; set; }
        [JsonPropertyName("serviceStartTime")]
        public string serviceStartTime { get; set; }
        [JsonPropertyName("addressLine1")]
        public string addressLine1 { get; set; }
        [JsonPropertyName("addressLine2")]
        public string addressLine2 { get; set; }
        [JsonPropertyName("city")]
        public string city { get; set; }
        [JsonPropertyName("state")]
        public string state { get; set; }
        [JsonPropertyName("postalCode")]
        public string postalCode { get; set; }
    }
}
