namespace Project_SWP391.Dtos.Tour
{
    public class UpdateTourDto
    {
        public string TourName { get; set; } = string.Empty;
        public float Price { get; set; }
        public string StartTime { get; set; }
        public string FinishTime { get; set; }
    }
}
