using Project_SWP391.Model;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project_SWP391.Dtos.PayStatus
{
    public class PayStatusDto
    {
        public int PayId { get; set; }
        public string PaymentMethod { get; set; }
        public float Deposit { get; set; }
        public float Remain { get; set; }
        public string Status { get; set; }

        public int BillId { get; set; }
    }
}
