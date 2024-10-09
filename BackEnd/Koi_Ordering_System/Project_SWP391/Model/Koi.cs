using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project_SWP391.Model
{
    public class Koi
    {
        [Key]
        public int KoiId { get; set; }
        public string KoiName { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public float Price { get; set; }
        public string Description { get; set; } = string.Empty;
        public float Length { get; set; }
        public int YOB { get; set; } // Year of Birth
        public string Gender { get; set; } = string.Empty;
        public string? UpdateDate { get; set; }

        // Foreign keys
        public int FarmId { get; set; }
        [ForeignKey(nameof(FarmId))]
        public KoiFarm KoiFarm { get; set; }

        // Navigation properties
        public ICollection<KoiImage> KoiImages { get; set; } = new List<KoiImage>();
        public ICollection<KoiBill> KoiBills { get; set; } = new List<KoiBill>();
        public ICollection<VarietyOfKoi> VarietyOfKois { get; set; } = new List<VarietyOfKoi>();

    }
}
