using Project_SWP391.Model;
using System.ComponentModel.DataAnnotations;

namespace Project_SWP391.Dtos.Tour
{
    public class TourDto
    {
        public int TourId { get; set; }
        public string TourName { get; set; } = string.Empty;
        public float Price { get; set; }
        public string StartTime { get; set; }
        public string FinishTime { get; set; }

        public ICollection<Bill> Bills { get; set; }
    }
}
