using Project_SWP391.Dtos.Kois;
using Project_SWP391.Model;

namespace Project_SWP391.Interfaces
{
    public interface IKoiRepository
    {
        Task<List<Koi>> GetAllAsync();
        Task<Koi?> GetByIdAsync(int id);
        Task<List<Koi>> GetByNameAsync(string name);
        Task<List<Koi>?> GetByVarietyAsync(string varietyName);
        Task<List<Koi>?> GetByFarmAsync(string farmName);
        Task<List<Koi>?> GetByFarmIdAsync(int farmId);
        Task<Koi> CreateAsync(Koi koi);
        Task<Koi?> UpdateAsync(int id, UpdateKoiDto variety);
        Task<Koi?> DeleteAsync(int id);
        Task<bool> KoiExists(int id);
    }
}
