using Project_SWP391.Dtos.Kois;
using Project_SWP391.Model;

namespace Project_SWP391.Mappers
{
    public static class KoiMapper
    {
        public static KoiDto ToKoiDto(this Koi koiModel)
        {
            return new KoiDto
            {
                KoiId = koiModel.KoiId,
                KoiName = koiModel.KoiName,
                Description = koiModel.Description,
                Price = koiModel.Price,
                Quantity = koiModel.Quantity,
                Length = koiModel.Length,
                YOB = koiModel.YOB,
                Gender = koiModel.Gender,
                UpdateDate = koiModel.UpdateDate,
                FarmId = koiModel.FarmId,
                KoiImages = koiModel.KoiImages
            };
        }
        public static Koi ToKoiFromCreateDto(this CreateKoiDto createKoi, int farmId)
        {
            return new Koi
            {
                KoiName = createKoi.KoiName,
                Quantity = createKoi.Quantity,
                Description = createKoi.Description,
                Price = createKoi.Price,
                Length = createKoi.Length,
                YOB = createKoi.YOB,
                Gender = createKoi.Gender,
                UpdateDate = createKoi.UpdateDate,
                FarmId = farmId,
            };
        }
    }
}
