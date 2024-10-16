using Project_SWP391.Model;
using System.ComponentModel.DataAnnotations;

namespace Project_SWP391.Dtos.Account
{
    public class ViewAllAccountDto
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string? Gender { get; set; }
        public string? Address { get; set; }
        public string FullName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? DateOfBirth { get; set; }
        public string Role { get; set; }
        public ICollection<Bill> Bills { get; set; }
    }
}
