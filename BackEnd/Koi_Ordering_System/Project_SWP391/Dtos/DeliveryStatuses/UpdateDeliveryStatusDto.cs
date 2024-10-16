namespace Project_SWP391.Dtos.DeliveryStatuses
{
    public class UpdateDeliveryStatusDto
    {
        public string DeliveryAddress { get; set; } = string.Empty;
        public string DeliveryStatusText { get; set; } = string.Empty;
        public string EstimatedDate { get; set; }
    }
}
