using Microsoft.EntityFrameworkCore;
using Project_SWP391.Data;
using Project_SWP391.Dtos.KoiFarm;
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

        public Task<KoiFarm?> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<KoiFarm>> GetAllAsync()
        {
            return await _context.KoiFarms.ToListAsync();
        }

        public Task<KoiFarm?> GetIdByAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<KoiFarm?> UpdateAsync(int id, UpdateKoiFarmDto koiFarmDto)
        {
            throw new NotImplementedException();
        }
    }
}
