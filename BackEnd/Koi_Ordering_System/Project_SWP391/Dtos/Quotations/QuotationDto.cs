using Project_SWP391.Model;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project_SWP391.Dtos.Quotations
{
    public class QuotationDto
    {
        public int QuotationId { get; set; }
        public string Username { get; set; }
        public string TourName { get; set; }
        public float PriceOffer { get; set; }
        public string Status { get; set; }
        public string ApprovedDate { get; set; }
        public string UserId { get; set; }
        public int TourId { get; set; }
    }
}
