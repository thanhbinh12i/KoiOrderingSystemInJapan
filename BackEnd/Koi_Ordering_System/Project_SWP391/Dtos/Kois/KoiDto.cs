using Project_SWP391.Model;

namespace Project_SWP391.Dtos.Kois
{
    public class KoiDto
    {
        public int KoiId { get; set; }
        public string KoiName { get; set; } = string.Empty;
        public float Price { get; set; }
        public string Description { get; set; } = string.Empty;
        public float Length { get; set; }
        public int YOB { get; set; } // Year of Birth
        public string Gender { get; set; } = string.Empty;
        public DateOnly UpdateDate { get; set; }
        public ICollection<KoiImage> KoiImages { get; set; } = new List<KoiImage>();
    }
}
