namespace Project_SWP391.Model
{
    public class VarietyOfKoi
    {
        public int VarietyId { get; set; }
        public KoiVariety KoiVariety { get; set; }

        public int KoiId { get; set; }
        public Koi Koi { get; set; }
    }
}
