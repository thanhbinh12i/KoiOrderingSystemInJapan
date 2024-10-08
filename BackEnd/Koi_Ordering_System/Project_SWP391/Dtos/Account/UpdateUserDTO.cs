using System.ComponentModel.DataAnnotations;

namespace Project_SWP391.Dtos.Account
{
    public class UpdateUserDto
    {
        public string? UserName { get; set; }
        [EmailAddress]
        public string? Email { get; set; }
        public string? Gender { get; set; }
        public string? Address { get; set; }
        public string? FullName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? DateOfBirth { get; set; }
        public string? Password { get; set; }
    }
}
