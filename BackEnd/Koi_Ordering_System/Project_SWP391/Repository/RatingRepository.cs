using Microsoft.EntityFrameworkCore;
using Project_SWP391.Data;
using Project_SWP391.Dtos.Ratings;
using Project_SWP391.Dtos.TourDestinations;
using Project_SWP391.Interfaces;
using Project_SWP391.Model;

namespace Project_SWP391.Repository
{
    public class RatingRepository : IRatingRepository
    {
        private readonly ApplicationDBContext _context;

        public RatingRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<Rating> CreateAsync(Rating ratingModel)
        {
            await _context.Ratings.AddAsync(ratingModel);
            await _context.SaveChangesAsync();

            return ratingModel;
        }

        public async Task<Rating> DeleteAsync(int farmId, string userId)
        {
            var rating = await _context.Ratings.FindAsync(farmId, userId);

            if (rating == null)
            {
                return null;
            }

            _context.Ratings.Remove(rating);
            _context.SaveChanges();

            return rating;
        }

        public async Task<List<Rating>> GetAllAsync()
        {
            return await _context.Ratings.ToListAsync();
        }

        public async Task<Rating?> GetByIdAsync(int farmId, string userId)
        {
            return await _context.Ratings.FirstOrDefaultAsync(x => x.FarmId == farmId && x.UserId == userId);
        }

        public async Task<Rating> UpdateAsync(int farmId, string userId, UpdateRatingDto updateRatingDto)
        {
            var ratingModel = await _context.Ratings.FirstOrDefaultAsync(x => x.FarmId == farmId && x.UserId == userId);

            if (ratingModel == null)
            {
                return null;
            }

            ratingModel.Content = updateRatingDto.Content;
            ratingModel.Rate = updateRatingDto.Rate;

            await _context.SaveChangesAsync();

            return ratingModel;
        }
    }
}
