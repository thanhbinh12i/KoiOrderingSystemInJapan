using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Project_SWP391.Data;
using Project_SWP391.Dtos.KoiVarieties;
using Project_SWP391.Interfaces;
using Project_SWP391.Mappers;
using Project_SWP391.Model;
using System.Net.Sockets;

namespace Project_SWP391.Repository
{
    public class KoiVarietyRepository : IKoiVarietyRepository
    {
        private readonly ApplicationDBContext _context;
        public KoiVarietyRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<KoiVariety> CreateAsync(KoiVariety variety)
        {
            await _context.KoiVarieties.AddAsync(variety);
            await _context.SaveChangesAsync();

            return variety;
        }

        public async Task<KoiVariety?> DeleteAsync(int id)
        {
            var variety = await _context.KoiVarieties.FindAsync(id);

            if (variety == null)
            {
                return null;
            }

            _context.KoiVarieties.Remove(variety);
            await _context.SaveChangesAsync();

            return variety;
        }

        public async Task<List<KoiVariety>> GetAllAsync()
        {
            return await _context.KoiVarieties.ToListAsync();
        }

        public async Task<KoiVariety?> GetByIdAsync(int id)
        {
            return await _context.KoiVarieties.FirstOrDefaultAsync(variety => variety.VarietyId == id);
        }

        public async Task<List<KoiVariety>> GetByKoiIdAsync(int koiId)
        {
            return await _context.KoiVarieties.Where(v => v.VarietyOfKois.Any(v => v.KoiId == koiId)).ToListAsync();
        }

        public async Task<List<KoiVariety>> GetByNameAsync(string name)
        {
            return await _context.KoiVarieties.Where(v => v.VarietyName.Contains(name)).ToListAsync();
        }

        public Task<bool> KoiVarietyExists(int id)
        {
            return _context.KoiVarieties.AnyAsync(k => k.VarietyId == id);
        }

        public async Task<KoiVariety?> UpdateAsync(int id, UpdateKoiVarietyDto updateVariety)
        {
            var varietyModel = await _context.KoiVarieties.FirstOrDefaultAsync(v => v.VarietyId == id);

            if (varietyModel == null)
            {
                return null;
            }

            varietyModel.VarietyName = updateVariety.VarietyName;
            varietyModel.Description = updateVariety.Description;
            varietyModel.UrlImage = updateVariety.UrlImage;

            await _context.SaveChangesAsync();

            return varietyModel;
        }
    }
}
