using Project_SWP391.Dtos.KoiImages;
using Project_SWP391.Dtos.TourDestinations;
using Project_SWP391.Dtos.Tours;
using Project_SWP391.Model;

namespace Project_SWP391.Mappers
{
    public static class TourDestinationMapper
    {
        public static TourDestinationDto ToTourDestinationDto(this TourDestination tourDestinatonModel)
        {
            return new TourDestinationDto
            {
                FarmId = tourDestinatonModel.FarmId,
                TourId = tourDestinatonModel.TourId,
                Type = tourDestinatonModel.Type,
            };
        }
        public static TourDestination ToTourDestinationFromToCreateDto(this CreateTourDestinationDto tourDestinationDto, int farmId, int tourId)
        {
            return new TourDestination
            {
                FarmId = farmId,
                TourId = tourId,
                Type = tourDestinationDto.Type,
            };
        }
    }
}
