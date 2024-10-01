using Project_SWP391.Model;

namespace Project_SWP391.Dtos.KoiFarm
{
    public class CreateKoiFarmDto
    {
        public string FarmName { get; set; }
        public string Introduction { get; set; }
        public string Location { get; set; }
        public string OpenHour { get; set; }
        public string CloseHour { get; set; }
        public string Email { get; set; }
        public float Rating { get; set; }
        public string Hotline { get; set; }

    }
}
