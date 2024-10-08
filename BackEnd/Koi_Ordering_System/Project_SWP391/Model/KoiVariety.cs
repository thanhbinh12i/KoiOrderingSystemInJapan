using System.ComponentModel.DataAnnotations;

namespace Project_SWP391.Model
{
    public class KoiVariety
    {
        [Key]
        public int VarietyId { get; set; }
        public string VarietyName { get; set; }
        public string Description { get; set; }
        public string UrlImage { get; set; }
        public ICollection<VarietyOfKoi> VarietyOfKois { get; set; }
    }
}
