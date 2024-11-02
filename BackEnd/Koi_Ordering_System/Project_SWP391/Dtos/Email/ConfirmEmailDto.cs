using System.ComponentModel.DataAnnotations;

namespace Project_SWP391.Dtos.Email
{
    public class ConfirmEmailDto
    {
        [Required]
        [EmailAddress]
        public string? Email { get; set; }
    }
}
