using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project_SWP391.Model
{
    public class FarmImage
    {
        [Key]
        public int FarmImageId { get; set; }
        public string UrlImage{ get; set; } =string.Empty;

        // Foreign key
        public int FarmId { get; set; }
        [ForeignKey(nameof(FarmId))]
        public KoiFarm KoiFarm { get; set; }
    }
}
