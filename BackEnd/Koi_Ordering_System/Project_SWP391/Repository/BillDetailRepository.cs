using Microsoft.EntityFrameworkCore;
using Project_SWP391.Data;
using Project_SWP391.Dtos.BillDetails;
using Project_SWP391.Interfaces;
using Project_SWP391.Model;

namespace Project_SWP391.Repository
{
    public class BillDetailRepository : IBillDetailRepository
    {
        private readonly ApplicationDBContext _context;

        public BillDetailRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<BillDetail> CreateAsync(BillDetail billDetailModel)
        {
            await _context.BillDetails.AddAsync(billDetailModel);
            await _context.SaveChangesAsync();

            return billDetailModel;
        }

        public async Task<BillDetail> DeleteAsync(int billDetailId)
        {
            var billDetailModel = await _context.BillDetails.FirstOrDefaultAsync(b => b.BillDetailId == billDetailId);

            if (billDetailModel == null)
            {
                return null;
            }

            _context.BillDetails.Remove(billDetailModel);
            _context.SaveChanges();

            return billDetailModel;
        }

        public async Task<List<BillDetail>> GetAllAsync()
        {
            return await _context.BillDetails.ToListAsync();
        }

        public async Task<BillDetail?> GetByIdAsync(int billDetailId)
        {
            return await _context.BillDetails.FirstOrDefaultAsync(b => b.BillId == billDetailId);
        }

        public async Task<BillDetail> UpdateAsync(int billDetailId, UpdateBillDetailDto updateBillDetailModel)
        {
            var billDetailModel = await _context.BillDetails.FirstOrDefaultAsync(b => b.BillDetailId == billDetailId);

            if (billDetailModel == null)
            {
                return null;
            }

            billDetailModel.BookBy = updateBillDetailModel.BookBy;
            billDetailModel.TourName = updateBillDetailModel.TourName;
            billDetailModel.ArriveDate = updateBillDetailModel.ArriveDate;
            billDetailModel.DepartDate = updateBillDetailModel.DepartDate;
            billDetailModel.DeliveryEstimateDate = updateBillDetailModel.DeliveryEstimateDate;
            billDetailModel.TotalPrice = updateBillDetailModel.TotalPrice;

            await _context.SaveChangesAsync();

            return billDetailModel;
        }
    }
}
