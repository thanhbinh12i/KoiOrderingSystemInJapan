using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project_SWP391.Model
{
    public class KoiImage
    {
        [Key]
        public int KoiImageId { get; set; }
        public string UrlImage { get; set; }

        // Foreign key
        public int KoiId { get; set; }
        [ForeignKey(nameof(KoiId))]
        public Koi Koi { get; set; }
    }
}
