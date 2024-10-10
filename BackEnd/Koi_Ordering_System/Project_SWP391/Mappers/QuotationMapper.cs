using Project_SWP391.Dtos.Quotations;
using Project_SWP391.Dtos.Ratings;
using Project_SWP391.Model;

namespace Project_SWP391.Mappers
{
    public static class QuotationMapper
    {
        public static QuotationDto ToQuotationDto(this Quotation quotationModel)
        {
            return new QuotationDto
            {
                QuotationId = quotationModel.QuotationId,
                PriceOffer = quotationModel.PriceOffer,
                Status = quotationModel.Status,
                ApprovedDate = quotationModel.ApprovedDate,
                UserId = quotationModel.UserId,
                TourId = quotationModel.TourId
            };
        }
        public static Quotation ToQuotationFromToCreateDto(this CreateQuotationDto quotationDto, string userId, int tourId)
        {
            return new Quotation
            {
                PriceOffer = quotationDto.PriceOffer,
                Status = quotationDto.Status,
                ApprovedDate = quotationDto.ApprovedDate,
                UserId = userId,
                TourId = tourId
            };
        }
    }
}
