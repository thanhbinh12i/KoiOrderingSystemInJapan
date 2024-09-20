using System.ComponentModel.DataAnnotations;

namespace Project_SWP391.Model
{
    public class FarmImage
    {
        [Key]
        public int ImageId { get; set; }
        public string Url { get; set; } =string.Empty;

        // Foreign key
        public int FarmId { get; set; }
        public KoiFarm KoiFarm { get; set; }
    }
}
