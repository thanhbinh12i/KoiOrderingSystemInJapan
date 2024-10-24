namespace Project_SWP391.Dtos.Bills
{
    public class CreateBillDto
    {
        public string UserFullName { get; set; }
        public float TourPrice { get; set; }
        public float? KoiPrice { get; set; }
        public float? TotalPrice { get; set; }
        public string PaymentDate { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
    }
}
