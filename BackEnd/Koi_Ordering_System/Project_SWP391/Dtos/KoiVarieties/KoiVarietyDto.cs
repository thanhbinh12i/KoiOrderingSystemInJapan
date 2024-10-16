using Project_SWP391.Model;

namespace Project_SWP391.Dtos.KoiVarieties
{
    public class KoiVarietyDto
    {
        public int VarietyId { get; set; }
        public string VarietyName { get; set; }
        public string Description { get; set; }
        public string UrlImage { get; set; }

        // Navigation properties
        //public ICollection<Koi> Kois { get; set; }
    }
}
