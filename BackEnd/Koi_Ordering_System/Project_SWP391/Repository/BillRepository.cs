using Microsoft.EntityFrameworkCore;
using Project_SWP391.Data;
using Project_SWP391.Dtos.Bills;
using Project_SWP391.Interfaces;
using Project_SWP391.Model;

namespace Project_SWP391.Repository
{
    public class BillRepository : IBillRepository
    {
        private readonly ApplicationDBContext _context;
        public BillRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<bool> BillExists(int id)
        {
            return await _context.Bills.AnyAsync(b => b.BillId == id);
        }

        public async Task<Bill> CreateAsync(Bill billModel)
        {
            await _context.Bills.AddAsync(billModel);
            await _context.SaveChangesAsync();

            return billModel;
        }

        public async Task<Bill?> DeleteAsync(int billId)
        {
            var billModel = await _context.Bills.FirstOrDefaultAsync(b => b.BillId == billId);

            if (billModel == null)
            {
                return null;
            }

            _context.Bills.Remove(billModel);
            await _context.SaveChangesAsync();

            return billModel;
        }

        public async Task<List<Bill>> GetAllAsync()
        {
            return await _context.Bills.ToListAsync();
        }

        public async Task<Bill?> GetByIdAsync(int billId)
        {
           return await _context.Bills.FindAsync(billId);
        }

        public Task<List<Bill>> GetByUserIdAsync(string userId)
        {
            return _context.Bills.Where(bill => bill.UserId == userId).ToListAsync();
        }

        public async Task<Bill> UpdateAsync(int billId, UpdateBillDto billDto)
        {
            var billModel = await _context.Bills.FirstOrDefaultAsync(b => b.BillId == billId);

            if(billModel == null)
            {
                return null;
            }

            billModel.Price = billDto.Price;

            await _context.SaveChangesAsync();

            return billModel;
        }
    }
}
