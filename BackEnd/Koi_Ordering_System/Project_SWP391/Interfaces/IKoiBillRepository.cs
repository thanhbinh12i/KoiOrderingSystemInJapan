using Project_SWP391.Dtos.KoiBills;
using Project_SWP391.Model;

namespace Project_SWP391.Interfaces
{
    public interface IKoiBillRepository
    {
        Task<List<KoiBill>> GetAllAsync();
        Task<List<KoiBill>> GetByBillIdAsync(int billId);

        Task<KoiBill?> GetByIdAsync(int koiId, int billId);

        Task<KoiBill> CreateAsync(KoiBill koiBillModel);

        Task<KoiBill> UpdateAsync(int koiId, int billId, UpdateKoiBillDto updateKoiBill);

        Task<KoiBill> DeleteAsync(int koiId, int billId);
    }
}
