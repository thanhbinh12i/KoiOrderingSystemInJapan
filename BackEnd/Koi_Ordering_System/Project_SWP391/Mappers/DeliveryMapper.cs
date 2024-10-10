using Project_SWP391.Dtos.Deliveries;
using Project_SWP391.Model;

namespace Project_SWP391.Mappers
{
    public static class DeliveryMapper
    {
        public static DeliveryDto ToDeliveryDtoFromDelivery(this Delivery delivery)
        {
            return new DeliveryDto
            {
                DeliveryId = delivery.DeliveryId,
                DeliveryType = delivery.DeliveryType,
                DeliveryFee = delivery.DeliveryFee,
                DeliveryDescription = delivery.DeliveryDescription,
            };
        }
        public static Delivery ToDeliveryFromCreateDeliveryDto(this CreateDeliveryDto createDelivery)
        {
            return new Delivery
            {
                DeliveryType = createDelivery.DeliveryType,
                DeliveryFee = createDelivery.DeliveryFee,
                DeliveryDescription = createDelivery.DeliveryDescription,
            };
        }
    }
}
