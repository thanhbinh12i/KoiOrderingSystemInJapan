using Project_SWP391.Dtos.Bills;
using Project_SWP391.Model;

namespace Project_SWP391.Mappers
{
    public static class BillMapper
    {
        public static BillDto ToBillDtoFromBill(this Bill bill)
        {
            return new BillDto
            {
                BillId = bill.BillId,
                UserFullName = bill.UserFullName,
                KoiPrice = bill.KoiPrice,
                TourPrice = bill.TourPrice,
                Email = bill.Email,
                PhoneNumber = bill.PhoneNumber,
                TotalPrice = bill.TotalPrice,
                PaymentDate = bill.PaymentDate,
                UserId = bill.UserId,
                QuotationId = bill.QuotationId,
            };
        }

        public static Bill ToBillFromCreateBillDto(this CreateBillDto createBill, string userId, int quotationId)
        {
            return new Bill
            {
                UserFullName = createBill.UserFullName,
                KoiPrice = createBill.KoiPrice,
                TourPrice = createBill.TourPrice,
                Email = createBill.Email,
                PhoneNumber = createBill.PhoneNumber,
                TotalPrice = createBill.TotalPrice,
                PaymentDate = createBill.PaymentDate,
                UserId = userId,
                QuotationId = quotationId
            };
        }
    }
}
