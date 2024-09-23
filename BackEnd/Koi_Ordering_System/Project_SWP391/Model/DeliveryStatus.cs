using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project_SWP391.Model
{
    public class DeliveryStatus
    {
        [Key]
        public int DeliveryId { get; set; }
        public string DeliveryAddress { get; set; } = string.Empty;
        public string DeliveryStatusText { get; set; } = string.Empty;
        public DateTime EstimatedDate { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public float DeliveryFee { get; set; }

        // Foreign key
        public ICollection<Bill> Bills { get; set; }
    }
}
