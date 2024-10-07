using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project_SWP391.Model
{
    public class Feedback
    {
        [Key]
        public int FeedbackId { get; set; }
        public float Rating { get; set; }
        public string UrlImage { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty ;

        // Foreign key
        public string UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public AppUser User { get; set; }
    }
}
