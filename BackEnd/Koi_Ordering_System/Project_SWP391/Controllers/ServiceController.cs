using Microsoft.AspNetCore.Mvc;
using Project_SWP391.Interfaces;
using Project_SWP391.Mappers;
using Project_SWP391.Dtos.Services;

namespace Project_SWP391.Controllers
{
    [Route("api/service")]
    [ApiController]
    public class ServiceController : ControllerBase
    {
        private readonly IServiceRepository _serviceRepo;
        public ServiceController(IServiceRepository serviceRepo)
        {
            _serviceRepo = serviceRepo;
        }

        [HttpGet("view-all")]
        public async Task<IActionResult> GetAll()
        {
            var services = await _serviceRepo.GetAllAsync();
            var serviceDto = services.Select(s => s.ToServiceDtoFromService());

            return Ok(serviceDto);
        }

        [HttpGet("view-by-id/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var service = await _serviceRepo.GetByIdAsync(id);

            if (service == null)
            {
                return NotFound("No service found");
            }

            var serviceDto = service.ToServiceDtoFromService();

            return Ok(serviceDto);
        }

        [HttpGet("view-by-name/{name}")]
        public async Task<IActionResult> GetByName(string name)
        {
            var service = await _serviceRepo.GetByNameAsync(name);

            if (service == null)
            {
                return NotFound("No service found");
            }

            var serviceDto = service.ToServiceDtoFromService();

            return Ok(serviceDto);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CreateServiceDto createService)
        {
            if (createService == null)
            {
                return BadRequest("Service data is missing");
            }

            var serviceModel = createService.ToServiceFromCreateService();
            await _serviceRepo.CreateAsync(serviceModel);

            return CreatedAtAction(nameof(GetById), new { id = serviceModel.ServiceId }, serviceModel);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update([FromBody] UpdateServiceDto updateService, int id)
        {
            if (updateService == null)
            {
                return BadRequest("Service data is missing");
            }

            var serviceModel = await _serviceRepo.UpdateAsync(updateService, id);

            if (serviceModel == null)
            {
                return NotFound();
            }

            return Ok(serviceModel);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var serviceModel = _serviceRepo.DeleteAsync(id);

            if (serviceModel == null)
            {
                return NotFound("No service found");
            }

            return NoContent();
        }
    }
}
