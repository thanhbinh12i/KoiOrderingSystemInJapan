using Project_SWP391.Dtos.Ratings;
using Project_SWP391.Dtos.TourDestinations;
using Project_SWP391.Model;
using System.Threading.Tasks;

namespace Project_SWP391.Interfaces
{
    public interface IRatingRepository
    {
        Task<List<Rating>> GetAllAsync();

        Task<Rating?> GetByIdAsync(int farmId, string userId);

        Task<Rating> CreateAsync(Rating ratingModel);

        Task<Rating> UpdateAsync(int farmId, string userId, UpdateRatingDto updateRatingDto);

        Task<Rating> DeleteAsync(int farmId, string userId);
    }
}
