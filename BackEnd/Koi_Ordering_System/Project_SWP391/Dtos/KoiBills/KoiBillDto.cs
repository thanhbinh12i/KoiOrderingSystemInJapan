using Project_SWP391.Dtos.Kois;
using Project_SWP391.Model;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project_SWP391.Dtos.KoiBills
{
    public class KoiBillDto
    {
        public float? OriginalPrice { get; set; }
        public int? Quantity { get; set; }
        public float? FinalPrice { get; set; }
        public int BillId { get; set; }
        public int KoiId { get; set; }
        public string KoiName { get; set; }
    }
}
