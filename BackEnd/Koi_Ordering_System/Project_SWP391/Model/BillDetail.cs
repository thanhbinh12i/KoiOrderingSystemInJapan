using System.ComponentModel.DataAnnotations.Schema;

namespace Project_SWP391.Model
{
    public class BillDetail
    {
        public int BillId { get; set; }
        public Bill Bill { get; set; }

        public int ServiceId { get; set; }
        public Service Service { get; set; }

        public DateTime TimeServiceUsed { get; set; } = DateTime.Now;
        public float ServicePrice { get; set; }
    }
}
