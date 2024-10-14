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
                FullName = quotationModel.FullName,
                TourName = quotationModel.TourName,
                PhoneNumber = quotationModel.PhoneNumber,
                Email = quotationModel.Email,
                PriceOffer = quotationModel.PriceOffer,
                Status = quotationModel.Status,
                ApprovedDate = quotationModel.ApprovedDate,
                Description = quotationModel.Description,
                UserId = quotationModel.UserId,
                TourId = quotationModel.TourId
            };
        }
        public static Quotation ToQuotationFromToCreateDto(this CreateQuotationDto quotationDto, string userId, int tourId, string fullName, string tourName, string phoneNumber, string email)
        {
            return new Quotation
            {
                FullName = fullName,
                TourName = tourName,
                PhoneNumber = phoneNumber,
                Email = email,
                PriceOffer = quotationDto.PriceOffer,
                Status = quotationDto.Status,
                ApprovedDate = quotationDto.ApprovedDate,
                Description = quotationDto.Description,
                UserId = userId,
                TourId = tourId
            };
        }
    }
}
