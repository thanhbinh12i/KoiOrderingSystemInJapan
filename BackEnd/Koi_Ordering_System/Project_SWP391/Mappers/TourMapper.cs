
using Project_SWP391.Dtos.Tour;

using Project_SWP391.Model;

namespace Project_SWP391.Mappers
{
    public static class TourMapper
    {
        public static TourDto ToTourDto(this Tour tourModel)
        {
            return new TourDto
            {
                TourId = tourModel.TourId,
                TourName = tourModel.TourName,
                Price = tourModel.Price,
                StartTime = tourModel.StartTime,
                FinishTime = tourModel.FinishTime,
                Bills = tourModel.Bills,
            };
        }
        public static Tour ToTourFromToCreateDto(this CreateTourDto tourDto)
        {
            return new Tour
            {
                TourName = tourDto.TourName,
                Price = tourDto.Price,
                StartTime = tourDto.StartTime,
                FinishTime = tourDto.FinishTime,
            };
        }
    }
}
