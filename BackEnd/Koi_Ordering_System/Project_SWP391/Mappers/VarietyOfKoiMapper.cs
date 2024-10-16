using Project_SWP391.Dtos.Ratings;
using Project_SWP391.Dtos.VarietyOfKois;
using Project_SWP391.Model;

namespace Project_SWP391.Mappers
{
    public static class VarietyOfKoiMapper
    {
        public static VarietyOfKoiDto ToVOKDto(this VarietyOfKoi vokModel)
        {
            return new VarietyOfKoiDto
            {
                KoiId = vokModel.KoiId,
                VarietyId = vokModel.VarietyId,
            };
        }
        public static VarietyOfKoi ToVOKFromToCreateDto(int koiId, int varietyId)
        {
            return new VarietyOfKoi
            {
                KoiId = koiId,
                VarietyId = varietyId,
            };
        }
    }
}
