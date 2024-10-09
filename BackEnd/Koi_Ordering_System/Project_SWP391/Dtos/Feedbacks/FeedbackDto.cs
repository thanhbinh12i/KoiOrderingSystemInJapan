using Project_SWP391.Model;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project_SWP391.Dtos.Feedbacks
{
    public class FeedbackDto
    {
        public int FeedbackId { get; set; }
        public float Rating { get; set; }
        public string? UrlImage { get; set; }
        public string Content { get; set; }
        public string UserId { get; set; }
    }
}
