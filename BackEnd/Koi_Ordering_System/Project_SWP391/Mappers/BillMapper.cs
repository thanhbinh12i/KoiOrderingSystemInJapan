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
                TotalPrice = bill.TotalPrice,
                TourPrice = bill.TourPrice,
                KoiPrice = bill.KoiPrice,
                PaymentDate = bill.PaymentDate,
                Email = bill.Email,
                PhoneNumber = bill.PhoneNumber,
                UserId = bill.UserId,
                QuotationId = bill.QuotationId,
            };
        }

        public static Bill ToBillFromCreateBillDto(this CreateBillDto createBill, string userId, int quotationId)
        {
            return new Bill
            {
                UserFullName = createBill.UserFullName,
                TotalPrice = createBill.TotalPrice,
                TourPrice = createBill.TourPrice,
                KoiPrice = createBill.KoiPrice,
                PaymentDate = createBill.PaymentDate,
                Email = createBill.Email,
                PhoneNumber = createBill.PhoneNumber,
                UserId = userId,
                QuotationId = quotationId
            };
        }
    }
}
