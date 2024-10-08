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

        public async Task<Koi?> GetByIdAsync(int id)
        {
            return await _context.Kois.Include(k => k.KoiImages).FirstOrDefaultAsync(koi => koi.KoiId == id);
        }

        public async Task<Koi?> GetByNameAsync(string name)
        {
            return await _context.Kois.Include(k => k.KoiImages).FirstOrDefaultAsync(koi => koi.KoiName == name);
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
            koiModel.FarmId = updateKoi.FarmId;

            await _context.SaveChangesAsync();

            return koiModel;
        }
    }
}
