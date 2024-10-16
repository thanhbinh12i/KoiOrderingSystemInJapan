using Microsoft.EntityFrameworkCore;
using Project_SWP391.Data;
using Project_SWP391.Dtos.Kois;
using Project_SWP391.Interfaces;
using Project_SWP391.Model;

namespace Project_SWP391.Repository
{
    public class KoiRepository : IKoiRepository
    {
        private readonly ApplicationDBContext _context;
        public KoiRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<Koi> CreateAsync(Koi koi)
        {
            await _context.Kois.AddAsync(koi);
            await _context.SaveChangesAsync();

            return koi;
        }

        public async Task<Koi?> DeleteAsync(int id)
        {
            var koi = await _context.Kois.FindAsync(id);

            if (koi == null)
            {
                return null;
            }

            _context.Kois.Remove(koi);
            await _context.SaveChangesAsync();

            return koi;
        }

        public async Task<List<Koi>> GetAllAsync()
        {
            return await _context.Kois.Include(k => k.KoiImages).ToListAsync();
        }

        public async Task<List<Koi>?> GetByFarmAsync(string farmName)
        {
            var farm = await _context.KoiFarms.FirstOrDefaultAsync(f => f.FarmName.Contains(farmName));

            if (farm == null)
            {
                return null;
            }

            var kois = await _context.Kois.Include(k => k.KoiImages).Where(k => k.FarmId == farm.FarmId).ToListAsync();

            return kois;
        }

        public async Task<List<Koi>?> GetByFarmIdAsync(int farmId)
        {
            var farm = await _context.KoiFarms.FirstOrDefaultAsync(f => f.FarmId == farmId);

            if (farm == null)
            {
                return null;
            }

            var kois = await _context.Kois.Include(k => k.KoiImages).Where(k => k.FarmId == farm.FarmId).ToListAsync();

            return kois;
        }

        public async Task<Koi?> GetByIdAsync(int id)
        {
            return await _context.Kois.Include(k => k.KoiImages).FirstOrDefaultAsync(koi => koi.KoiId == id);
        }

        public async Task<List<Koi>> GetByNameAsync(string name)
        {
            return await _context.Kois.Include(k => k.KoiImages).Where(k => k.KoiName.Contains(name)).ToListAsync();
        }

        public async Task<List<Koi>?> GetByVarietyAsync(string varietyName)
        {
            var variety = await _context.KoiVarieties.FirstOrDefaultAsync(v => v.VarietyName.Contains(varietyName));

            if (variety == null)
            {
                return null;
            }

            var kois = await _context.Kois.Include(k => k.KoiImages).Where(k => k.VarietyOfKois.Any(v => v.VarietyId == variety.VarietyId)).ToListAsync();

            return kois;
        }

        public Task<bool> KoiExists(int id)
        {
            return _context.Kois.AnyAsync(k => k.KoiId == id);
        }

        public async Task<Koi?> UpdateAsync(int id, UpdateKoiDto updateKoi)
        {
            var koiModel = await _context.Kois.FirstOrDefaultAsync(k => k.KoiId == id);

            if (koiModel == null)
            {
                return null;
            }

            koiModel.KoiName = updateKoi.KoiName;
            koiModel.Price = updateKoi.Price;
            koiModel.Quantity = updateKoi.Quantity;
            koiModel.Description = updateKoi.Description;
            koiModel.Length = updateKoi.Length;
            koiModel.YOB = updateKoi.YOB;
            koiModel.Gender = updateKoi.Gender;
            koiModel.UpdateDate = DateOnly.FromDateTime(DateTime.Now).ToString();
            await _context.SaveChangesAsync();

            return koiModel;
        }
    }
}
