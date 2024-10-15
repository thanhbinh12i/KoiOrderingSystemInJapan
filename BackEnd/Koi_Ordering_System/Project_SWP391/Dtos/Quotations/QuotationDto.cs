using Project_SWP391.Model;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project_SWP391.Dtos.Quotations
{
    public class QuotationDto
    {
        public int QuotationId { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public float PriceOffer { get; set; }
        public string Status { get; set; }
        public string ApprovedDate { get; set; }
        public string Description { get; set; }
        public string UserId { get; set; }
        public int TourId { get; set; }
    }
}
