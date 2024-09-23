using System.ComponentModel.DataAnnotations;

namespace Project_SWP391.Model
{
    public class Bill
    {
        [Key]
        public int BillId { get; set; }
        public string UserFullName { get; set; }
        public float Price { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public bool Status { get; set; }

        // Foreign key to AppUser
        public string UserId { get; set; }  // This should match the type of the Identity primary key (usually string)
        public AppUser User { get; set; }

        // Foreign keys

        public int TourId { get; set; }  // Optional
        public Tour Tour { get; set; }

        public int DeliveryId { get; set; }
        public DeliveryStatus DeliveryStatus { get; set; }

        // Navigation properties
        public ICollection<BillDetail> BillDetails { get; set; } = new List<BillDetail>();
        public ICollection<KoiBill> KoiBills { get; set; } = new List<KoiBill>();

        public PayStatus PayStatus { get; set; }
        public Feedback Feedback { get; set; }
    }
}
