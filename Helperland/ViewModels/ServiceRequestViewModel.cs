using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Helperland.ViewModels
{
    public class ServiceRequestViewModel
    {
        [JsonPropertyName("ServiceRequestId")]
        public int ServiceRequestId { get; set; }
        [JsonPropertyName("UserId")]
        public int UserId { get; set; }
        [JsonPropertyName("ServiceStartDate")]
        public string ServiceStartDate { get; set; }
        [JsonPropertyName("ServiceStartTime")]
        public string ServiceStartTime { get; set; }
        [JsonPropertyName("ZipCode")]
        public string ZipCode { get; set; }
        [JsonPropertyName("ServiceHourlyRate")]
        public decimal ServiceHourlyRate { get; set; }
        [JsonPropertyName("ServiceHours")]
        public double ServiceHours { get; set; }
        [JsonPropertyName("ExtraHours")]
        public double ExtraHours { get; set; }
        [JsonPropertyName("ExtraServicesName")]
        public string[] ExtraServicesName { get; set; }
        [JsonPropertyName("SubTotal")]
        public decimal SubTotal { get; set; }
        [JsonPropertyName("TotalCost")]
        public decimal TotalCost { get; set; }
        [JsonPropertyName("Comments")]
        public string Comments { get; set; }
        [JsonPropertyName("HasPets")]
        public bool HasPets { get; set; }
        [JsonPropertyName("PaymentDone")]
        public bool PaymentDone { get; set; }
        [JsonPropertyName("UserAddressID")]
        public string UserAddressID { get; set; }
    }
}
