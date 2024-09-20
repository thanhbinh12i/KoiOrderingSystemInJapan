using System.ComponentModel.DataAnnotations;

namespace Project_SWP391.Model
{
    public class Feedback
    {
        [Key]
        public int FeedbackId { get; set; }
        public int Rating { get; set; }
        public string Image { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty ;

        // Foreign key
        public int BillId { get; set; }
        public Bill Bill { get; set; }
    }
}
