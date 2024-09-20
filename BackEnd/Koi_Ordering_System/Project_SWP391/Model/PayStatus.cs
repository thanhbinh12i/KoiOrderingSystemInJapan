using System.ComponentModel.DataAnnotations;

namespace Project_SWP391.Model
{
    public class PayStatus
    {
        [Key]
        public int PayId { get; set; }
        public float Deposit { get; set; }
        public float Remain { get; set; }
        public bool Status { get; set; }

        // Foreign key
        public int BillId { get; set; }
        public Bill Bill { get; set; }
    }
}
