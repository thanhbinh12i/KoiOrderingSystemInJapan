using System.ComponentModel.DataAnnotations.Schema;

namespace Project_SWP391.Model
{
    public class TourDestination
    {
        public int FarmId { get; set; }
        public KoiFarm KoiFarm { get; set; }
        public int TourId { get; set; }
        public Tour Tour { get; set; }
        public string Type { get; set; }

    }
}
