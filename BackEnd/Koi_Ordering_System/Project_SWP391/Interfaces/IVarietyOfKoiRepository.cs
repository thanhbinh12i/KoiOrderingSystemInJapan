using Project_SWP391.Dtos.Ratings;
using Project_SWP391.Model;

namespace Project_SWP391.Interfaces
{
    public interface IVarietyOfKoiRepository
    {
        Task<List<VarietyOfKoi>> GetAllAsync();

        Task<VarietyOfKoi?> GetByIdAsync(int koiId, int varietyId);

        Task<VarietyOfKoi> CreateAsync(VarietyOfKoi vokModel);
        Task<VarietyOfKoi> DeleteAsync(int koiId, int varietyId);
    }
}
