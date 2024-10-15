namespace Project_SWP391.Dtos.Quotations
{
    public class CreateQuotationDto
    {
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public float PriceOffer { get; set; }
        public string Status { get; set; }
        public string ApprovedDate { get; set; }
        public string Description { get; set; }
    }
}
