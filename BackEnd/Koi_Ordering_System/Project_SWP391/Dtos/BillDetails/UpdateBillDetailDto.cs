namespace Project_SWP391.Dtos.BillDetails
{
    public class UpdateBillDetailDto
    {
        public string? BookBy { get; set; }
        public string? TourName { get; set; }
        public string? ArriveDate { get; set; }
        public string? DepartDate { get; set; }
        public string? DeliveryEstimateDate { get; set; }
        public float TotalPrice { get; set; }
    }
}
