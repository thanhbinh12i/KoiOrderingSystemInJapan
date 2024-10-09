namespace Project_SWP391.Dtos.PayStatus
{
    public class CreatePayStatusDto
    {
        public string PaymentMethod { get; set; }
        public float Deposit { get; set; }
        public float Remain { get; set; }
        public string Status { get; set; }
    }
}
