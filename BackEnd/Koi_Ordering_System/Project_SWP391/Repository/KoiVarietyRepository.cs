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
            _context.SaveChanges();

            return variety;
        }

        public async Task<List<KoiVariety>> GetAllAsync()
        {
            return await _context.KoiVarieties.Include(i => i.Kois).ToListAsync();
        }

        public async Task<KoiVariety?> GetByIdAsync(int id)
        {
            var variety = await _context.KoiVarieties.Include(k => k.Kois).FirstOrDefaultAsync(variety => variety.VarietyId == id);

            return variety;
        }

        public async Task<KoiVariety?> GetByNameAsync(string name)
        {
            var variety = await _context.KoiVarieties.Include(k => k.Kois).FirstOrDefaultAsync(variety => variety.VarietyName == name);

            return variety;
        }

        public async Task<KoiVariety?> UpdateAsync(int id, UpdateKoiVarietyDto updateVariety)
        {
            var varietyModel = await _context.KoiVarieties.FirstOrDefaultAsync(v => v.VarietyId == id);

            if (varietyModel == null)
            {
                return null;
            }

            varietyModel.VarietyName = updateVariety.VarietyName;
            varietyModel.Color = updateVariety.Color;

            await _context.SaveChangesAsync();

            return varietyModel;
        }
    }
}
