namespace Project_SWP391.Dtos.Bills
{
    public class BillDto
    {
        public int BillId { get; set; }
        public string UserFullName { get; set; }
        public float Price { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string UserId { get; set; }
        public int QuotationId { get; set; }
    }
}
