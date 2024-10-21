using Project_SWP391.Dtos.Bills;
using Project_SWP391.Model;

namespace Project_SWP391.Interfaces
{
    public interface IBillRepository
    {
        Task<List<Bill>> GetAllAsync();
        Task<Bill?> GetByIdAsync(int billId);
        Task<List<Bill>> GetByUserIdAsync(string userId);
        Task<Bill?> DeleteAsync(int billId);
        Task<Bill> CreateAsync(Bill billModel);
        Task<Bill> UpdateAsync(int billId, UpdateBillDto billDto);
        Task<bool> BillExists(int id);
    }
}
