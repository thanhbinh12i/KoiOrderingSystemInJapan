using System.ComponentModel.DataAnnotations.Schema;

namespace Project_SWP391.Dtos.Deliveries
{
    public class UpdateDeliveryDto
    {
        public string DeliveryType { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public float DeliveryFee { get; set; }
        public string DeliveryDescription { get; set; }
    }
}
