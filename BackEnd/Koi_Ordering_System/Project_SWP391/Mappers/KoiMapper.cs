using Project_SWP391.Dtos.Kois;
using Project_SWP391.Model;

namespace Project_SWP391.Mappers
{
    public static class KoiMapper
    {
        public static KoiDto ToKoiDto(this Koi koi)
        {
            return new KoiDto
            {
                KoiId = koi.KoiId,
                KoiName = koi.KoiName,
                Description = koi.Description,
                Price = koi.Price,
                Quantity = koi.Quantity,
                Length = koi.Length,
                YOB = koi.YOB,
                Gender = koi.Gender,
                UpdateDate = koi.UpdateDate,
                KoiImages = koi.KoiImages.Select(k => k.ToKoiImageDtoFromKoiImage()).ToList()
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
                UpdateDate = DateOnly.FromDateTime(DateTime.Now).ToString(),
                FarmId = farmId,
            };
        }
    }
}
