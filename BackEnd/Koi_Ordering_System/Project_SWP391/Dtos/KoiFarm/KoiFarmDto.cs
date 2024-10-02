using Project_SWP391.Dtos.FarmImages;
using Project_SWP391.Dtos.Kois;
using Project_SWP391.Model;

namespace Project_SWP391.Dtos.KoiFarm
{
    public class KoiFarmDto
    {
        public int FarmId { get; set; }
        public string FarmName { get; set; } = string.Empty;
        public string Introduction { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string OpenHour { get; set; }
        public string CloseHour { get; set; }
        public string Email { get; set; } = string.Empty;
        public float Rating { get; set; }
        public string Hotline { get; set; } = string.Empty;

        // Navigation properties
        public ICollection<KoiDto> Kois { get; set; }
        public ICollection<FarmImageDto> FarmImages { get; set; }
    }
}
