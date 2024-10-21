using Project_SWP391.Dtos.BillDetails;
using Project_SWP391.Dtos.DeliveryStatuses;
using Project_SWP391.Model;

namespace Project_SWP391.Interfaces
{
    public interface IDeliveryStatusRepository
    {
        Task<List<DeliveryStatus>> GetAllAsync();
        Task<List<DeliveryStatus>> GetByUserId(string userId);

        Task<DeliveryStatus?> GetByIdAsync(int deliveryStatusId);

        Task<DeliveryStatus> CreateAsync(DeliveryStatus deliveryStatusModel);

        Task<DeliveryStatus> UpdateAsync(int deliveryStatusId, UpdateDeliveryStatusDto updateDeliveryStatusModel);

        Task<DeliveryStatus> DeleteAsync(int deliveryStatusId);
    }
}
