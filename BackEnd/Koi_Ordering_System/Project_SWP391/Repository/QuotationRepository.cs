using Microsoft.EntityFrameworkCore;
using Project_SWP391.Data;
using Project_SWP391.Dtos.Quotations;
using Project_SWP391.Dtos.Ratings;
using Project_SWP391.Interfaces;
using Project_SWP391.Model;

namespace Project_SWP391.Repository
{
    public class QuotationRepository : IQuotationRepository
    {
        private readonly ApplicationDBContext _context;

        public QuotationRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<Quotation> CreateAsync(Quotation quotationModel)
        {
            await _context.Quotations.AddAsync(quotationModel);
            await _context.SaveChangesAsync();
            return quotationModel;
        }

        public async Task<Quotation> DeleteAsync(int quotationId)
        {
            var quotation = await _context.Quotations.FindAsync(quotationId);

            if (quotation == null)
            {
                return null;
            }
            var bills = _context.Bills.Where(b => b.QuotationId == quotationId);
            _context.Bills.RemoveRange(bills);
            _context.Quotations.Remove(quotation);
            _context.SaveChanges();

            return quotation;
        }

        public async Task<List<Quotation>> GetAllAsync()
        {
            return await _context.Quotations.ToListAsync();
        }

        public async Task<List<Quotation>> GetByIdAsync(string userId, int tourId)
        {
            return await _context.Quotations.Where(x => x.UserId == userId && x.TourId == tourId).ToListAsync();
        }

        public async Task<Quotation?> GetByQuotationIdAsync(int quotationId)
        {
            return await _context.Quotations.FindAsync(quotationId);
        }

        public async Task<List<Quotation>> GetByUserIdAsync(string userId)
        {
            return await _context.Quotations.Where(x => x.UserId == userId).ToListAsync();
        }

        public async Task<Quotation> UpdateAsync(int quotationId, UpdateQuotationDto updateQuotatinDto)
        {
            var quotationModel = await _context.Quotations.FirstOrDefaultAsync(x => x.QuotationId == quotationId);

            if (quotationModel == null)
            {
                return null;
            }
            quotationModel.PriceOffer = updateQuotatinDto.PriceOffer;
            quotationModel.Status = updateQuotatinDto.Status;
            quotationModel.ApprovedDate = updateQuotatinDto.ApprovedDate;
            quotationModel.Description = updateQuotatinDto.Description;
            await _context.SaveChangesAsync();
            return quotationModel;
        }
    }
}
