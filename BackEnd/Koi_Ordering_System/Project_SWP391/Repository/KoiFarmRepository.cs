using Microsoft.EntityFrameworkCore;
using Project_SWP391.Data;
using Project_SWP391.Dtos.KoiFarms;
using Project_SWP391.Interfaces;
using Project_SWP391.Model;

namespace Project_SWP391.Repository
{
    public class KoiFarmRepository : IKoiFarmRepository
    {
        private readonly ApplicationDBContext _context;

        public KoiFarmRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<KoiFarm> CreateAsync(KoiFarm koiFarmModel)
        {
            await _context.KoiFarms.AddAsync(koiFarmModel);
            await _context.SaveChangesAsync();

            return koiFarmModel;
        }

        public async Task<KoiFarm?> DeleteAsync(int farmId)
        {
            var koiFarm = await _context.KoiFarms.FindAsync(farmId);

            if (koiFarm == null)
            {
                return null;
            }

            _context.KoiFarms.Remove(koiFarm);
            _context.SaveChanges();

            return koiFarm;
        }

        public async Task<List<KoiFarm>> GetAllAsync()
        {
            return await _context.KoiFarms.Include(c => c.Kois).Include(c => c.FarmImages).ToListAsync();
        }

        public async Task<KoiFarm?> GetByIdAsync(int farmId)
        {
            return await _context.KoiFarms.Include(c => c.Kois).Include(c => c.FarmImages).FirstOrDefaultAsync(x => x.FarmId == farmId);
        }
        public async Task<KoiFarm?> GetByNameAsync(string farmName)
        {
            return await _context.KoiFarms.Include(c => c.Kois).Include(c => c.FarmImages).FirstOrDefaultAsync(x => x.FarmName == farmName);
        }

        public async Task<KoiFarm?> UpdateAsync(int farmId, UpdateKoiFarmDto koiFarmDto)
        {
            var koiFarmModel = await _context.KoiFarms.FirstOrDefaultAsync(x => x.FarmId == farmId);

            if (koiFarmModel == null)
            {
                return null;
            }

            koiFarmModel.FarmName = koiFarmDto.FarmName;
            koiFarmModel.Introduction = koiFarmDto.Introduction;
            koiFarmModel.Location = koiFarmDto.Location;
            koiFarmModel.OpenHour = koiFarmDto.OpenHour;
            koiFarmModel.CloseHour = koiFarmDto.CloseHour;
            koiFarmModel.Email = koiFarmDto.Email;
            koiFarmModel.Hotline = koiFarmDto.Hotline;


            await _context.SaveChangesAsync();

            return koiFarmModel;
        }
        public Task<bool> ExistKoiFarm(int farmId)
        {
            return _context.KoiFarms.AnyAsync(s => s.FarmId == farmId);
        }

        public async Task<KoiFarm?> GetByKoiIdAsync(int koiId)
        {
            var koi = await _context.Kois.FirstOrDefaultAsync(k => k.KoiId == koiId);

            return await _context.KoiFarms.Include(c => c.Kois).Include(c => c.FarmImages).FirstOrDefaultAsync(f => f.FarmId == koi.FarmId);
        }
    }
}
