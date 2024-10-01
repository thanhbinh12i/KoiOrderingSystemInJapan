using Project_SWP391.Model;

namespace Project_SWP391.Dtos.Kois
{
    public class CreateKoiDto
    {
        public string KoiName { get; set; } = string.Empty;
        public float Price { get; set; }
        public string Description { get; set; } = string.Empty;
        public float Length { get; set; }
        public int YOB { get; set; } // Year of Birth
        public string Gender { get; set; } = string.Empty;
        public DateOnly UpdateDate { get; set; }
        public int FarmId { get; set; }
        public int VarietyId { get; set; }
    }
}
