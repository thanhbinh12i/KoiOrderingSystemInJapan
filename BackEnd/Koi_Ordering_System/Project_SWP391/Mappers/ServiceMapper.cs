using Project_SWP391.Dtos.Services;
using Project_SWP391.Model;

namespace Project_SWP391.Mappers
{
    public static class ServiceMapper
    {
        public static ServiceDto ToServiceDtoFromService(this Service service)
        {
            return new ServiceDto
            {
                ServiceId = service.ServiceId,
                ServiceName = service.ServiceName,
                Price = service.Price,
                Detail = service.Detail,
            };
        }
        public static Service ToServiceFromCreateService(this CreateServiceDto createService)
        {
            return new Service
            {
                ServiceName = createService.ServiceName,
                Price = createService.Price,
                Detail = createService.Detail,
            };
        }
    }
}
