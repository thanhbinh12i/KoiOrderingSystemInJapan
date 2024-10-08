using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project_SWP391.Model
{
    public class PayStatus
    {
        [Key]
        public int PayId { get; set; }
        public string PaymentMethod { get; set; }
        public float Deposit { get; set; }
        public float Remain { get; set; }
        public string Status { get; set; }

        public int BillId { get; set; }
        [ForeignKey(nameof(BillId))]

        public Bill Bill { get; set; }
    }
}
