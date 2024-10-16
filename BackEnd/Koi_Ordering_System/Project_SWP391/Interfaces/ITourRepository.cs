using Project_SWP391.Dtos.KoiFarms;
using Project_SWP391.Dtos.Tours;
using Project_SWP391.Model;

namespace Project_SWP391.Interfaces
{
    public interface ITourRepository
    {
        Task<List<Tour>> GetAllAsync();
        Task<Tour?> GetIdByAsync(int tourId);
        Task<List<Tour?>> GetByFarmIdAsync(int farmId);
        Task<List<Tour?>> GetByVarietyIdAsync(int varietyId);
        Task<List<Tour?>> GetPriceByAsync(float min, float max);
        Task<Tour> CreateAsync(Tour tourModel);
        Task<Tour?> UpdateAsync(int tourId, UpdateTourDto tourDto);
        Task<Tour?> DeleteAsync(int tourId);
        Task<bool> ExistTour(int tourId);

    }
}
