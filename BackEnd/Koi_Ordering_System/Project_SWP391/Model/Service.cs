using System.ComponentModel.DataAnnotations;

namespace Project_SWP391.Model
{
    public class Service
    {
        [Key]
        public int ServiceId { get; set; }
        public string ServiceName { get; set; } = string.Empty;
        public float Price { get; set; }
        public string Detail { get; set; } =string.Empty;

        // Navigation properties
        public ICollection<BillDetail> BillDetails { get; set; }
    }
}
