using Project_SWP391.Dtos.KoiFarms;
using Project_SWP391.Model;

namespace Project_SWP391.Mappers
{
    public static class KoiFarmMapper
    {
        public static KoiFarmDto ToKoiFarmDTO(this KoiFarm koiFarmModel)
        {
            return new KoiFarmDto
            {
                FarmId = koiFarmModel.FarmId,
                FarmName = koiFarmModel.FarmName,
                Introduction = koiFarmModel.Introduction,
                Location = koiFarmModel.Location,
                OpenHour = koiFarmModel.OpenHour,
                CloseHour = koiFarmModel.CloseHour,
                Email = koiFarmModel.Email,
                Hotline = koiFarmModel.Hotline,
                Kois = koiFarmModel.Kois,
                FarmImages = koiFarmModel.FarmImages
            };
        }
        public static KoiFarm ToKoiFarmFromCreateDTO(this CreateKoiFarmDto koiFarmDto)
        {
            return new KoiFarm
            {
                FarmName = koiFarmDto.FarmName,
                Introduction = koiFarmDto.Introduction,
                Location = koiFarmDto.Location,
                OpenHour = koiFarmDto.OpenHour,
                CloseHour = koiFarmDto.CloseHour,
                Email = koiFarmDto.Email,
                Hotline = koiFarmDto.Hotline,
            };
        }
    }
}
