using Project_SWP391.Dtos.KoiFarm;
using Project_SWP391.Dtos.Tour;
using Project_SWP391.Model;

namespace Project_SWP391.Interfaces
{
    public interface ITourRepository
    {
        Task<List<Tour>> GetAllAsync();
        Task<Tour?> GetIdByAsync(int tourId);
        Task<Tour> CreateAsync(Tour tourModel);
        Task<Tour?> UpdateAsync(int tourId, UpdateTourDto tourDto);
        Task<Tour?> DeleteAsync(int tourId);
    }
}
