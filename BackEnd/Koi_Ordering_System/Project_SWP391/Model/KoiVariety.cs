using System.ComponentModel.DataAnnotations;

namespace Project_SWP391.Model
{
    public class KoiVariety
    {
        [Key]
        public int VarietyId { get; set; }
        public string VarietyName { get; set; }
        public string Color { get; set; }

        // Navigation properties
        public ICollection<Koi> Kois { get; set; }
    }
}
