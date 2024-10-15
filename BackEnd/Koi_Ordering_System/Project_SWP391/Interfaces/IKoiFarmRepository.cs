using Project_SWP391.Dtos.KoiFarms;
using Project_SWP391.Model;

namespace Project_SWP391.Interfaces
{
    public interface IKoiFarmRepository
    {
        Task<List<KoiFarm>> GetAllAsync();
        Task<KoiFarm?> GetByIdAsync(int farmId);
        Task<KoiFarm?> GetByNameAsync(string name);
        Task<KoiFarm?> GetByKoiIdAsync(int koiId);
        Task<KoiFarm> CreateAsync(KoiFarm koiFarmModel);
        Task<KoiFarm?> UpdateAsync(int farmId, UpdateKoiFarmDto koiFarmDto);
        Task<KoiFarm?> DeleteAsync(int farmId);
        Task<bool> ExistKoiFarm(int farmId);
    }
}
