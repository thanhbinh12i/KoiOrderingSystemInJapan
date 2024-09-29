using Project_SWP391.Model;

namespace Project_SWP391.Dtos.KoiVariable
{
    public class KoiVarietyDto
    {
        public string VarietyName { get; set; }
        public string Color { get; set; }

        // Navigation properties
        public ICollection<Koi> Kois { get; set; }
    }
}
