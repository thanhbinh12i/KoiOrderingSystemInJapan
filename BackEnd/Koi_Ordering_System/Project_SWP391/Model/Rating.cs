namespace Project_SWP391.Model
{
    public class Rating
    {
        public string UserId { get; set; }
        public AppUser User { get; set; }

        public int FarmId { get; set; }
        public KoiFarm KoiFarm { get; set; }

        public int Rate { get; set; }
        public string Content { get; set; }
    }
}
