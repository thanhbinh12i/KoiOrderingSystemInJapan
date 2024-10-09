using Microsoft.EntityFrameworkCore;
using Project_SWP391.Data;
using Project_SWP391.Dtos.Feedbacks;
using Project_SWP391.Dtos.PayStatus;
using Project_SWP391.Interfaces;
using Project_SWP391.Model;

namespace Project_SWP391.Repository
{
    public class PayStatusRepository : IPayStatusRepository
    {
        private readonly ApplicationDBContext _context;

        public PayStatusRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<PayStatus> CreateAsync(PayStatus payStatusModel)
        {
            await _context.PayStatuses.AddAsync(payStatusModel);
            await _context.SaveChangesAsync();
            return payStatusModel;
        }

        public async Task<PayStatus?> DeleteAsync(int payStatusId)
        {
            var payStatusModel = await _context.PayStatuses.FirstOrDefaultAsync(x => x.PayId == payStatusId);
            if (payStatusModel == null) return null;
            _context.PayStatuses.Remove(payStatusModel);
            await _context.SaveChangesAsync();
            return payStatusModel;
        }

        public async Task<List<PayStatus>> GetAllAsync()
        {
            return await _context.PayStatuses.ToListAsync();
        }

        public async Task<PayStatus?> GetByBillIdAsync(int billId)
        {
            return await _context.PayStatuses.FirstOrDefaultAsync(x => x.BillId == billId);
        }

        public async Task<PayStatus?> GetByIdAsync(int payStatusId)
        {
            return await _context.PayStatuses.FindAsync(payStatusId);
        }

        public async Task<PayStatus> UpdateAsync(int payStatusId, UpdatePayStatusDto payStatusDto)
        {
            var payStatusExist = await _context.PayStatuses.FirstOrDefaultAsync(x => x.PayId == payStatusId);
            if (payStatusExist == null) return null;
            payStatusExist.PaymentMethod = payStatusDto.PaymentMethod;
            payStatusExist.Deposit = payStatusDto.Deposit;
            payStatusExist.Remain = payStatusDto.Remain;
            payStatusExist.Status = payStatusDto.Status;
            await _context.SaveChangesAsync();
            return payStatusExist;
        }
    }
}
