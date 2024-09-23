using Microsoft.AspNetCore.Identity;

namespace Project_SWP391.Model
{
    public class AppUser : IdentityUser
    {
        [PersonalData]
        public string FullName { get; set; }
        [PersonalData]
        public string DateOfBirth { get; set; }
        [PersonalData]
        public string PhoneNumber { get; set; }
        [PersonalData]
        public string Address { get; set; }
        [PersonalData]
        public string Gender { get; set; }
        public ICollection<Bill> Bills { get; set; }
    }
}
