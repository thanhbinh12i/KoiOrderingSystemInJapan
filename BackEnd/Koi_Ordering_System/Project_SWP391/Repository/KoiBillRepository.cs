using Microsoft.EntityFrameworkCore;
using Project_SWP391.Data;
using Project_SWP391.Dtos.KoiBills;
using Project_SWP391.Interfaces;
using Project_SWP391.Model;

namespace Project_SWP391.Repository
{
    public class KoiBillRepository : IKoiBillRepository
    {
        private readonly ApplicationDBContext _context;
        public KoiBillRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<KoiBill> CreateAsync(KoiBill koiBillModel)
        {
            await _context.KoiBills.AddAsync(koiBillModel);
            await _context.SaveChangesAsync();

            return koiBillModel;
        }

        public async Task<KoiBill> DeleteAsync(int koiId, int billId)
        {
            var koiBillModel = await _context.KoiBills.FirstOrDefaultAsync(b => b.KoiId == koiId && b.BillId == billId);

            if (koiBillModel == null)
            {
                return null;
            }

            _context.KoiBills.Remove(koiBillModel);
            _context.SaveChanges();

            return koiBillModel;
        }

        public async Task<List<KoiBill>> GetAllAsync()
        {
            return await _context.KoiBills.Include(b => b.Koi).ToListAsync();
        }

        public async Task<KoiBill?> GetByIdAsync(int koiId, int billId)
        {
            return await _context.KoiBills.FirstOrDefaultAsync(b => b.KoiId == koiId && b.BillId == billId);
        }
        public async Task<KoiBill> UpdateAsync(int koiId, int billId, UpdateKoiBillDto updateKoiBill)
        {
            var koiBillModel = await _context.KoiBills.FirstOrDefaultAsync(b => b.KoiId == koiId && b.BillId == billId);

            if(koiBillModel == null)
            {
                return null;
            }

            koiBillModel.OriginalPrice = updateKoiBill.OriginalPrice;
            koiBillModel.Quantity = updateKoiBill.Quantity;
            koiBillModel.FinalPrice = updateKoiBill.FinalPrice;

            await _context.SaveChangesAsync();

            return koiBillModel;
        }

        public async Task<List<KoiBill>> GetByBillIdAsync(int billId)
        {
            return await _context.KoiBills.Where(b => b.BillId == billId).Include(b => b.Koi).ToListAsync();
        }
    }
}
