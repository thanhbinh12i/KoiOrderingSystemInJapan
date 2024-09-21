using System.ComponentModel.DataAnnotations;

namespace Project_SWP391.Dtos.Account
{
    public class LoginDto
    {
        [Required]
        public string UserNameOrEmailOrPhoneNumber { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
