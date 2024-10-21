using Microsoft.EntityFrameworkCore;
using Project_SWP391.Data;
using Project_SWP391.Dtos.KoiFarms;
using Project_SWP391.Dtos.Tours;
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
            return await _context.Tours.Include(x => x.TourDestinations).ToListAsync();
        }

        public async Task<Tour> GetIdByAsync(int tourId)
        {
            return await _context.Tours.FirstOrDefaultAsync(x => x.TourId == tourId);
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
            tourModel.NumberOfParticipate = tourDto.NumberOfParticipate;

            await _context.SaveChangesAsync();

            return tourModel;
        }

        public Task<bool> ExistTour(int tourId)
        {
            return _context.Tours.AnyAsync(s => s.TourId == tourId);
        }

        public async Task<List<Tour?>> GetPriceByAsync(float min, float max)
        {
            return await _context.Tours.Where(x => x.Price <= max && x.Price >= min).Include(x => x.TourDestinations).ToListAsync();
        }

        public async Task<List<Tour?>> GetByFarmIdAsync(int farmId)
        {
            return await _context.TourDestinations
                                  .Where(td => td.FarmId == farmId)
                                  .Include(td => td.Tour) 
                                  .ThenInclude(t => t.TourDestinations) 
                                  .Select(td => td.Tour)
                                  .Distinct()
                                  .ToListAsync();
        }

        public async Task<List<Tour?>> GetByVarietyIdAsync(int varietyId)
        {
            return await (from t in _context.Tours
                          join td in _context.TourDestinations on t.TourId equals td.TourId
                          join kf in _context.KoiFarms on td.FarmId equals kf.FarmId
                          join k in _context.Kois on kf.FarmId equals k.FarmId
                          join vok in _context.VarietyOfKois on k.KoiId equals vok.KoiId
                          join kv in _context.KoiVarieties on vok.VarietyId equals kv.VarietyId
                          where kv.VarietyId == varietyId
                          select t)
          .Distinct()
          .Include(t => t.TourDestinations)
          .ToListAsync();
        }
    }
}
