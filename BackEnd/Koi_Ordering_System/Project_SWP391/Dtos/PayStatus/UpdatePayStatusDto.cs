namespace Project_SWP391.Dtos.PayStatus
{
    public class UpdatePayStatusDto
    {
        public string PaymentMethod { get; set; }
        public float Deposit { get; set; }
        public float Remain { get; set; }
        public string Status { get; set; }
    }
}
