using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project_SWP391.Model
{
    public class DeliveryStatus
    {
        [Key]
        public int DeliveryStatusId { get; set; }
        public string DeliveryAddress { get; set; } = string.Empty;
        public string DeliveryStatusText { get; set; } = string.Empty;
        public string EstimatedDate { get; set; }

        public int BillId { get; set; }
        [ForeignKey(nameof(BillId))]
        public Bill Bill { get; set; }
        public int DeliveryId { get; set; }
        [ForeignKey(nameof(DeliveryId))]
        public Delivery Delivery { get; set; }
    }
}
