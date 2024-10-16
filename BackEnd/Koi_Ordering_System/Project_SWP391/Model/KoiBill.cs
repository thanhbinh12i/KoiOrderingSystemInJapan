using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project_SWP391.Model
{
    public class KoiBill
    {
        public int BillId { get; set; }
        public Bill Bill { get; set; }
        public int KoiId { get; set; }
        public Koi Koi { get; set; }
        public float? OriginalPrice { get; set; }
        public int? Quantity { get; set; }
        public float? FinalPrice { get; set; }
    }
}
