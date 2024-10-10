using Project_SWP391.Dtos.DeliveryStatuses;
using Project_SWP391.Model;

namespace Project_SWP391.Mappers
{
    public static class DeliveryStatusMapper
    {
        public static DeliveryStatusDto ToDeliveryStatusDtoFromDeliveryStatus(this DeliveryStatus deliveryStatus)
        {
            return new DeliveryStatusDto
            {
                DeliveryStatusId = deliveryStatus.DeliveryStatusId,
                DeliveryStatusText = deliveryStatus.DeliveryStatusText,
                DeliveryAddress = deliveryStatus.DeliveryAddress,
                EstimatedDate = deliveryStatus.EstimatedDate,
                BillId = deliveryStatus.BillId,
                DeliveryId = deliveryStatus.DeliveryId,
            };
        }
        public static DeliveryStatus ToDeliveryStatusFromCreateDeliveryStatusDto(this CreateDeliveryStatusDto createDeliveryStatus, int billId, int deliveryId)
        {
            return new DeliveryStatus
            {
                DeliveryStatusText = createDeliveryStatus.DeliveryStatusText,
                DeliveryAddress = createDeliveryStatus.DeliveryAddress,
                EstimatedDate = createDeliveryStatus.EstimatedDate,
                BillId = billId,
                DeliveryId = deliveryId,
            };
        }
    }
}
