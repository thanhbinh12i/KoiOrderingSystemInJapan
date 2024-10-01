using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project_SWP391.Model
{
    public class Koi
    {
        [Key]
        public int KoiId { get; set; }
        public string KoiName { get; set; } =string.Empty;
        public float Price { get; set; }
        public string Description { get; set; } =string.Empty;
        public float Length { get; set; }
        public int YOB { get; set; } // Year of Birth
        public string Gender { get; set; } = string.Empty;
        public DateOnly UpdateDate { get; set; }

        // Foreign keys
        public int FarmId { get; set; }
        [ForeignKey(nameof(FarmId))]
        public KoiFarm KoiFarm { get; set; }

        public int VarietyId { get; set; }
        [ForeignKey(nameof(VarietyId))]
        public KoiVariety KoiVariety { get; set; }

        // Navigation properties
        public ICollection<KoiImage> KoiImages { get; set; } = new List<KoiImage>();    
    }
}
