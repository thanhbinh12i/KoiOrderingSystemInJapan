using Project_SWP391.Dtos.KoiVarieties;
using Project_SWP391.Model;

namespace Project_SWP391.Mappers
{
    public static class KoiVarietyMapper
    {
        public static KoiVarietyDto ToKoiVarietyDto(this KoiVariety variety)
        {
            return new KoiVarietyDto
            {
                VarietyId = variety.VarietyId,
                VarietyName = variety.VarietyName,
                Description = variety.Description,
                UrlImage = variety.UrlImage,
            };
        }
        public static KoiVariety ToKoiVarietyFromToCreateDto(this CreateKoiVarietyDto variety)
        {
            return new KoiVariety
            {
                VarietyName = variety.VarietyName,
                Description = variety.Description,
            };
        }
    }
}
