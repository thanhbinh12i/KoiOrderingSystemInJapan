using System.ComponentModel.DataAnnotations;

namespace Project_SWP391.Model
{
    public class Tour
    {
        [Key]
        public int TourId { get; set; }
        public string TourName { get; set; } = string.Empty;
        public float Price { get; set; }
        public string StartTime { get; set; }
        public string FinishTime { get; set; }
        public string NumberOfParticipate { get; set; }

        // Navigation properties
        public ICollection<TourDestination> TourDestinations { get; set; } = new List<TourDestination>();
        public ICollection<Quotation> Quotations { get; set; } = new List<Quotation>();

    }
}
