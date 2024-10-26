namespace Project_SWP391.Dtos.Bills
{
    public class BillDto
    {
        public int BillId { get; set; }
        public string UserFullName { get; set; }
        public float TourPrice { get; set; }
        public float? KoiPrice { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public float TotalPrice { get; set; }
        public string PaymentDate { get; set; }
        public string UserId { get; set; }
        public int QuotationId { get; set; }
    }
}
