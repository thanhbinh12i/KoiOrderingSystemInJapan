using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project_SWP391.Model
{
    public class KoiBill
    {
        [Key]
        public int KoiBillId { get; set; }
        public float? OriginalPrice { get; set; }
        public int? Quantity { get; set; }
        public float? FinalPrice { get; set; }

        public int BillId { get; set; }
        [ForeignKey(nameof(BillId))]
        public Bill Bill { get; set; }
        public int KoiId { get; set; }
        [ForeignKey(nameof(KoiId))]
        public Koi Koi { get; set; }
    }
}
