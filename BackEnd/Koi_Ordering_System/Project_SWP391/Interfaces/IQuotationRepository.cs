using Project_SWP391.Dtos.Quotations;
using Project_SWP391.Dtos.Ratings;
using Project_SWP391.Model;
using System.Threading.Tasks;

namespace Project_SWP391.Interfaces
{
    public interface IQuotationRepository
    {
        Task<List<Quotation>> GetAllAsync();
        Task<Quotation?> GetByQuotationIdAsync(int quotationId);
        Task<List<Quotation>> GetByIdAsync(string userId, int tourId);
        Task<List<Quotation>> GetByUserIdAsync(string userId);
        Task<Quotation> CreateAsync(Quotation quotationModel);
        Task<Quotation> UpdateAsync(int quotationId, UpdateQuotationDto updateQuotatinDto);
        Task<Quotation> DeleteAsync(int quotationId);
    }
}
