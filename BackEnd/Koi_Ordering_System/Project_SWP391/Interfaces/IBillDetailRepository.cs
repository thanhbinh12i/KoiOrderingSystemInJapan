using Project_SWP391.Dtos.Bill;
using Project_SWP391.Dtos.KoiBills;
using Project_SWP391.Model;
using Project_SWP391.Dtos;
using Project_SWP391.Dtos.BillDetails;

namespace Project_SWP391.Interfaces
{
    public interface IBillDetailRepository
    {
        Task<List<BillDetail>> GetAllAsync();

        Task<BillDetail?> GetByIdAsync(int billDetailId);

        Task<BillDetail> CreateAsync(BillDetail billDetailModel);

        Task<BillDetail> UpdateAsync(int billDetailId, UpdateBillDetailDto updateBillDetailModel);

        Task<BillDetail> DeleteAsync(int billDetailId);
    }
}
