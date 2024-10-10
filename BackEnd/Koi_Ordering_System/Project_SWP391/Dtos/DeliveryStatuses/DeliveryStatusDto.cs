using Project_SWP391.Model;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project_SWP391.Dtos.DeliveryStatuses
{
    public class DeliveryStatusDto
    {
        public int DeliveryStatusId { get; set; }
        public string DeliveryAddress { get; set; } = string.Empty;
        public string DeliveryStatusText { get; set; } = string.Empty;
        public string EstimatedDate { get; set; }
        public int BillId { get; set; }
        public int DeliveryId { get; set; }
    }
}
