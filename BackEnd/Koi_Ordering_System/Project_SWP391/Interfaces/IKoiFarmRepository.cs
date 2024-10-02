using Project_SWP391.Dtos.KoiFarm;
using Project_SWP391.Model;

namespace Project_SWP391.Interfaces
{
    public interface IKoiFarmRepository
    {
        Task<List<KoiFarm>> GetAllAsync();
        Task<KoiFarm?> GetIdByAsync(int farmId);
        Task<KoiFarm> CreateAsync(KoiFarm koiFarmModel);
        Task<KoiFarm?> UpdateAsync(int farmId, UpdateKoiFarmDto koiFarmDto);
        Task<KoiFarm?> DeleteAsync(int farmId);
    }
}
