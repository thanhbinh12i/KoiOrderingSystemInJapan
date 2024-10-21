using Microsoft.AspNetCore.Identity;
using Project_SWP391.Model;
using System.ComponentModel.DataAnnotations.Schema;

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

        public ICollection<Bill> Bills { get; set; } = new HashSet<Bill>();
        public ICollection<Rating> Ratings { get; set; } = new HashSet<Rating>();
        public ICollection<Quotation> Quotations { get; set; } = new HashSet<Quotation>();

        public Feedback Feedback { get; set; }

    }
}







