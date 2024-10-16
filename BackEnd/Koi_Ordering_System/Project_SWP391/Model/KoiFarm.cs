using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project_SWP391.Model
{
    public class KoiFarm
    {
        [Key]
        public int FarmId { get; set; }
        public string FarmName { get; set; } = string.Empty;
        public string Introduction { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string OpenHour { get; set; }
        public string CloseHour { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Hotline { get; set; } = string.Empty;
        // Navigation properties
        public ICollection<Koi> Kois { get; set; }
        public ICollection<Rating> Ratings { get; set; }

        public ICollection<FarmImage> FarmImages { get; set; }
        public ICollection<TourDestination> TourDestinations { get; set; } = new List<TourDestination>();

    }
}
