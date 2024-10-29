using System.ComponentModel.DataAnnotations;

namespace Project_SWP391.Dtos.Email
{
    public class ForgotPasswordEmailDto
    {
        [Required]
        [EmailAddress]
        public string? ToEmail { get; set; }
    }
}
