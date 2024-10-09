using Microsoft.EntityFrameworkCore;
using Project_SWP391.Data;
using Project_SWP391.Interfaces;
using Project_SWP391.Model;

namespace Project_SWP391.Repository
{
    public class VarietyOfKoiRepository : IVarietyOfKoiRepository
    {
        private readonly ApplicationDBContext _context;

        public VarietyOfKoiRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<VarietyOfKoi> CreateAsync(VarietyOfKoi vokModel)
        {
            await _context.VarietyOfKois.AddAsync(vokModel);
            await _context.SaveChangesAsync();

            return vokModel;
        }

        public async Task<VarietyOfKoi> DeleteAsync(int koiId, int varietyId)
        {
            var varietyOfKoi = await _context.VarietyOfKois.FindAsync(koiId, varietyId);

            if (varietyOfKoi == null)
            {
                return null;
            }

            _context.VarietyOfKois.Remove(varietyOfKoi);
            _context.SaveChanges();

            return varietyOfKoi;
        }

        public async Task<List<VarietyOfKoi>> GetAllAsync()
        {
            return await _context.VarietyOfKois.ToListAsync();
        }

        public async Task<VarietyOfKoi?> GetByIdAsync(int koiId, int varietyId)
        {
            return await _context.VarietyOfKois.FirstOrDefaultAsync(x => x.KoiId == koiId && x.VarietyId == varietyId);
        }
    }
}
