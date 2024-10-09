using Project_SWP391.Dtos.Feedbacks;
using Project_SWP391.Dtos.PayStatus;
using Project_SWP391.Model;

namespace Project_SWP391.Interfaces
{
    public interface IPayStatusRepository
    {
        Task<List<PayStatus>> GetAllAsync();
        Task<PayStatus?> GetByIdAsync(int payStatusId);
        Task<PayStatus?> GetByBillIdAsync(int billId);
        Task<PayStatus?> DeleteAsync(int payStatusId);
        Task<PayStatus> CreateAsync(PayStatus payStatusModel);
        Task<PayStatus> UpdateAsync(int payStatusId, UpdatePayStatusDto payStatusDto);
    }
}
