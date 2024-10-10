using Project_SWP391.Dtos.KoiBills;
using Project_SWP391.Model;
using Project_SWP391.Dtos;
using Project_SWP391.Dtos.Deliveries;

namespace Project_SWP391.Interfaces
{
    public interface IDeliveryRepository
    {
        Task<List<Delivery>> GetAllAsync();

        Task<Delivery?> GetByIdAsync(int deliveryId);

        Task<Delivery> CreateAsync(Delivery deliveryModel);

        Task<Delivery> UpdateAsync(int deliveryId, UpdateDeliveryDto updateDelivery);

        Task<Delivery> DeleteAsync(int deliveryId);
        Task<bool> DeliveryExist(int deliveryId);
    }
}
