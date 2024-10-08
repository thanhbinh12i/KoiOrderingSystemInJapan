using Project_SWP391.Dtos.FarmImages;
using Project_SWP391.Dtos.Kois;
using Project_SWP391.Model;

namespace Project_SWP391.Dtos.KoiFarms
{
    public class KoiFarmDto
    {
        public int FarmId { get; set; }
        public string FarmName { get; set; }
        public string Introduction { get; set; }
        public string Location { get; set; }
        public string OpenHour { get; set; }
        public string CloseHour { get; set; }
        public string Email { get; set; }
        public string Hotline { get; set; }
        public ICollection<Koi> Kois { get; set; }
        public ICollection<Rating> Ratings { get; set; }

        public ICollection<FarmImage> FarmImages { get; set; }
        public ICollection<TourDestination> TourDestinations { get; set; } 
    }
}
