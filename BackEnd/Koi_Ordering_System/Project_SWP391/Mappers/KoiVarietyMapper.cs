using Project_SWP391.Dtos.KoiVariety;
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
                Color = variety.Color,
                Kois = variety.Kois,
            };
        }
        public static KoiVariety ToKoiVarietyFromToCreateDto(this CreateKoiVarietyDto variety)
        {
            return new KoiVariety
            {
                VarietyName = variety.VarietyName,
                Color = variety.Color,
            };
        }
    }
}
