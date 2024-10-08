using Microsoft.EntityFrameworkCore;
using Project_SWP391.Data;
using Project_SWP391.Dtos.KoiFarm;
using Project_SWP391.Dtos.Tour;
using Project_SWP391.Interfaces;
using Project_SWP391.Model;

namespace Project_SWP391.Repository
{
    public class TourRepository : ITourRepository
    {
        private readonly ApplicationDBContext _context;
        public TourRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<Tour> CreateAsync(Tour tourModel)
        {
            await _context.AddAsync(tourModel);
            await _context.SaveChangesAsync();
            return tourModel;
        }

        public async Task<Tour?> DeleteAsync(int tourId)
        {
            var tour = await _context.Tours.FindAsync(tourId);

            if (tour == null)
            {
                return null;
            }

            _context.Tours.Remove(tour);
            _context.SaveChanges();

            return tour;
        }

        public async Task<List<Tour>> GetAllAsync()
        {
            return await _context.Tours.ToListAsync();
        }

        public async Task<Tour?> GetIdByAsync(int tourId)
        {
            return await _context.Tours.Include(c => c.Bills).FirstOrDefaultAsync(x => x.TourId == tourId);
        }

        public async Task<Tour?> UpdateAsync(int tourId, UpdateTourDto tourDto)
        {
            var tourModel = await _context.Tours.FirstOrDefaultAsync(x => x.TourId == tourId);

            if (tourModel == null)
            {
                return null;
            }

            tourModel.TourName = tourDto.TourName;
            tourModel.Price = tourDto.Price;
            tourModel.StartTime = tourDto.StartTime;
            tourModel.FinishTime = tourDto.FinishTime;

            await _context.SaveChangesAsync();

            return tourModel;
        }
    }
}
