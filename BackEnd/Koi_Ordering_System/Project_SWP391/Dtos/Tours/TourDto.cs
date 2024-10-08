using Project_SWP391.Model;
using System.ComponentModel.DataAnnotations;

namespace Project_SWP391.Dtos.Tours
{
    public class TourDto
    {
        public int TourId { get; set; }
        public string TourName { get; set; }
        public float Price { get; set; }
        public string StartTime { get; set; }
        public string FinishTime { get; set; }
        public string NumberOfParticipate { get; set; }

        public ICollection<TourDestination> TourDestinations { get; set; }
        public ICollection<Quotation> Quotations { get; set; }
    }
}
