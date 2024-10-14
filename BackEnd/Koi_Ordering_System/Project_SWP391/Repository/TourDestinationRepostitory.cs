using Microsoft.EntityFrameworkCore;
using Project_SWP391.Data;
using Project_SWP391.Dtos.KoiFarms;
using Project_SWP391.Dtos.TourDestinations;
using Project_SWP391.Interfaces;
using Project_SWP391.Model;

namespace Project_SWP391.Repository
{
    public class TourDestinationRepostitory : ITourDestinationRepository
    {
        private readonly ApplicationDBContext _context;

        public TourDestinationRepostitory(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<TourDestination> CreateAsync(TourDestination tourDestinationModel)
        {
            await _context.TourDestinations.AddAsync(tourDestinationModel);
            await _context.SaveChangesAsync();

            return tourDestinationModel;
        }

        public async Task<TourDestination> DeleteAsync(int farmId, int tourId)
        {
            var tourDestination = await _context.TourDestinations.FindAsync(farmId, tourId);

            if (tourDestination == null)
            {
                return null;
            }

            _context.TourDestinations.Remove(tourDestination);
            _context.SaveChanges();

            return tourDestination;
        }

        public async Task<List<TourDestination>> GetAllAsync()
        {
            return await _context.TourDestinations.ToListAsync();
        }

        public async Task<TourDestination?> GetByIdAsync(int farmId, int tourId)
        {
            return await _context.TourDestinations.FirstOrDefaultAsync(x => x.FarmId == farmId && x.TourId == tourId);
        }

        public async Task<List<TourDestination>> GetByTourIdAsync(int tourId)
        {
            return await _context.TourDestinations.Where(x => x.TourId == tourId).ToListAsync();
        }

        public async Task<TourDestination> UpdateAsync(int farmId, int tourId, UpdateTourDestinationDto updateTourDestinationDto)
        {
            var tourDestinationModel = await _context.TourDestinations.FirstOrDefaultAsync(x => x.FarmId == farmId && x.TourId == tourId);

            if (tourDestinationModel == null)
            {
                return null;
            }

            tourDestinationModel.Type = updateTourDestinationDto.Type;


            await _context.SaveChangesAsync();

            return tourDestinationModel;
        }
    }
}
