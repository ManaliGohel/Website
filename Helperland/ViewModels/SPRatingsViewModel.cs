using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Helperland.ViewModels
{
    public class SPRatingsViewModel
    {
        [JsonPropertyName("ServiceRequestId")]
        public int ServiceRequestId { get; set; }

        [JsonPropertyName("RatingTo")]
        public int RatingTo { get; set; }

        [JsonPropertyName("Ratings")]
        public decimal Ratings { get; set; }

        [JsonPropertyName("Comments")]
        public string Comments { get; set; }

        [JsonPropertyName("OnTimeArrival")]
        public decimal OnTimeArrival { get; set; }

        [JsonPropertyName("Friendly")]
        public decimal Friendly { get; set; }

        [JsonPropertyName("QualityOfService")]
        public decimal QualityOfService { get; set; }
    }
}
