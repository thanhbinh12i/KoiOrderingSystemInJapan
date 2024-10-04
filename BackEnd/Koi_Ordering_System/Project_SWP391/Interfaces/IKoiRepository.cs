using Project_SWP391.Dtos.Kois;
using Project_SWP391.Model;

namespace Project_SWP391.Interfaces
{
    public interface IKoiRepository
    {
        Task<List<Koi>> GetAllAsync();
        Task<Koi?> GetByIdAsync(int id);
        Task<Koi?> GetByNameAsync(string name);
        Task<Koi> CreateAsync(Koi koi);
        Task<Koi?> UpdateAsync(int id, UpdateKoiDto variety);
        Task<Koi?> DeleteAsync(int id);
        Task<bool> KoiExists(int id);
    }
}
