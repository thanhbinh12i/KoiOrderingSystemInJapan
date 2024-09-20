namespace Project_SWP391.Model
{
    public class KoiBill
    {
        public int KoiBillId { get; set; }
        public float OriginalPrice { get; set; }
        public float DiscountPercent { get; set; }
        public float FinalPrice { get; set; }

        // Foreign keys
        public int BillId { get; set; }
        public Bill Bill { get; set; }

        public int KoiId { get; set; }
        public Koi Koi { get; set; }
    }
}
