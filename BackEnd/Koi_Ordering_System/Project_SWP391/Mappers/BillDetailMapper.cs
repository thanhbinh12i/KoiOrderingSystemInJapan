using Project_SWP391.Dtos.BillDetails;
using Project_SWP391.Model;

namespace Project_SWP391.Mappers
{
    public static class BillDetailMapper
    {
        public static BillDetailDto ToBillDetailDtoFromBillDetail(this  BillDetail billDetail)
        {
            return new BillDetailDto
            {
                BillDetailId = billDetail.BillDetailId,
                BookBy = billDetail.BookBy,
                TourName = billDetail.TourName,
                ArriveDate = billDetail.ArriveDate,
                DepartDate = billDetail.DepartDate,
                DeliveryEstimateDate = billDetail.DeliveryEstimateDate,
                TotalPrice = billDetail.TotalPrice,
                BillId = billDetail.BillId,
            };
        }
        public static BillDetail ToBillDetailFromCreateBillDetailDto(this CreateBillDetailDto createBillDetail, int billId)
        {
            return new BillDetail
            {
                BookBy = createBillDetail.BookBy,
                TourName = createBillDetail.TourName,
                ArriveDate = createBillDetail.ArriveDate,
                DepartDate = createBillDetail.DepartDate,
                DeliveryEstimateDate = createBillDetail.DeliveryEstimateDate,
                TotalPrice = createBillDetail.TotalPrice,
                BillId = billId,
            };
        }
    }
}
