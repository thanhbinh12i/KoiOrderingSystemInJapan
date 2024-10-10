using Project_SWP391.Dtos.TourDestinations;
using Project_SWP391.Model;

namespace Project_SWP391.Interfaces
{
    public interface ITourDestinationRepository
    {
        Task<List<TourDestination>> GetAllAsync();

        Task<TourDestination?> GetByIdAsync(int farmId, int tourId);
        Task<List<TourDestination>> GetByTourIdAsync(int tourId);

        Task<TourDestination> CreateAsync(TourDestination tourDestinationModel);

        Task<TourDestination> UpdateAsync(int farmId, int tourId, UpdateTourDestinationDto updateTourDestinationDto);

        Task<TourDestination> DeleteAsync(int farmId, int tourId);

    }
}
