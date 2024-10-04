using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project_SWP391.Model
{
    public class KoiImage
    {
        [Key]
        public int ImageId { get; set; }
        public string Url { get; set; }

        // Foreign key
        public int KoiId { get; set; }
        public Koi Koi { get; set; }
    }
}
