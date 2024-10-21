using Project_SWP391.Dtos.KoiBills;
using Project_SWP391.Model;

namespace Project_SWP391.Mappers
{
    public static class KoiBillMapper
    {
        public static KoiBillDto ToKoiBillDtoFromKoiBill(this KoiBill koiBIll)
        {
            return new KoiBillDto
            {
                OriginalPrice = koiBIll.OriginalPrice,
                Quantity = koiBIll.Quantity,
                FinalPrice = koiBIll.FinalPrice,
                KoiId = koiBIll.KoiId,
                BillId = koiBIll.BillId,
                KoiName = koiBIll.Koi?.KoiName,
            };
        }

        public static KoiBill ToKoiFromCreateKoiBillDto(this CreateKoiBillDto createKoiBIll, int koiId, int billId)
        {
            return new KoiBill
            {
                OriginalPrice = createKoiBIll.OriginalPrice,
                Quantity = createKoiBIll.Quantity,
                FinalPrice = createKoiBIll.FinalPrice,
                KoiId = koiId,
                BillId = billId,
            };
        }
    }
}