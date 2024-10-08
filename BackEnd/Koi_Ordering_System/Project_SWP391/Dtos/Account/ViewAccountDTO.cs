using System.ComponentModel.DataAnnotations;

namespace Project_SWP391.Dtos.Account
{
    public class ViewAccountDto
    {
        [Required]
        public string? UserName { get; set; }
        [Required]
        [EmailAddress]
        public string? Email { get; set; }
        [Required]
        [MaxLength(6)]
        [MinLength(4)]
        public string? Gender { get; set; }
        public string? Address { get; set; }
        public string? FullName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? DateOfBirth { get; set; }
    }
}
