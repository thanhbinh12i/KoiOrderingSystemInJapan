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

        public async Task<Koi> DeleteAsync(int id)
        {
            var koi = await _context.Kois.FindAsync(id);

            if (koi == null)
            {
                return null;
            }

            _context.Kois.Remove(koi);
            _context.SaveChanges();

            return koi;
        }

        public async Task<List<Koi>> GetAllAsync()
        {
            return await _context.Kois.ToListAsync();
        }

        public async Task<Koi?> GetByIdAsync(int id)
        {
            var koi = await _context.Kois.Include(k => k.KoiImages).FirstOrDefaultAsync(koi => koi.KoiId == id);

            return koi;
        }

        public async Task<Koi?> GetByNameAsync(string name)
        {
            var koi = await _context.Kois.Include(k => k.KoiImages).FirstOrDefaultAsync(koi => koi.KoiName == name);

            return koi;
        }

        public async Task<Koi> UpdateAsync(int id, UpdateKoiDto updateKoi)
        {
            var koi = await _context.Kois.FirstOrDefaultAsync(k => k.KoiId == id);

            if (koi == null)
            {
                return null;
            }

            koi.KoiName = updateKoi.KoiName;
            koi.Price = updateKoi.Price;
            koi.Description = updateKoi.Description;
            koi.Length = updateKoi.Length;
            koi.YOB = updateKoi.YOB;
            koi.Gender = updateKoi.Gender;
            koi.UpdateDate = DateOnly.FromDateTime(DateTime.Now);

            return koi;
        }
    }
}
