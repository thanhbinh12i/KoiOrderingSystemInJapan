using Microsoft.AspNetCore.Mvc;
using Project_SWP391.Dtos.Deliveries;
using Project_SWP391.Dtos.KoiBills;
using Project_SWP391.Interfaces;
using Project_SWP391.Mappers;

namespace Project_SWP391.Controllers
{
    [Route("api/delivery")]
    [ApiController]
    public class DeliveryController : ControllerBase
    {
        private readonly IDeliveryRepository _deliveryRepo;

        public DeliveryController(IDeliveryRepository deliveryRepo)
        {
            _deliveryRepo = deliveryRepo;
        }

        [HttpGet("view-all")]
        public async Task<IActionResult> GetAll()
        {
            var deliveries = await _deliveryRepo.GetAllAsync();
            var deliveryDto = deliveries.Select(b => b.ToDeliveryDtoFromDelivery());

            return Ok(deliveryDto);
        }

        [HttpGet("view-by-id/{deliveryId}")]
        public async Task<IActionResult> GetById([FromRoute] int deliveryId)
        {
            var delivery = await _deliveryRepo.GetByIdAsync(deliveryId);

            if (delivery == null)
            {
                return NotFound("No delivery bill found");
            }

            return Ok(delivery.ToDeliveryDtoFromDelivery());
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CreateDeliveryDto createDelivery)
        {

            if (createDelivery == null)
            {
                return BadRequest("Delivery data is missing");
            }

            var deliveryModel = createDelivery.ToDeliveryFromCreateDeliveryDto();

            if (deliveryModel == null)
            {
                return NotFound();
            }

            await _deliveryRepo.CreateAsync(deliveryModel);

            return Ok(deliveryModel.ToDeliveryDtoFromDelivery());
        }

        [HttpPut("update/{deliveryId}")]
        public async Task<IActionResult> Update([FromRoute] int deliveryId, [FromBody] UpdateDeliveryDto updateDelivery)
        {
            var deliveryModel = await _deliveryRepo.UpdateAsync(deliveryId, updateDelivery);

            if (deliveryModel == null)
            {
                return NotFound();
            }

            return Ok(deliveryModel.ToDeliveryDtoFromDelivery());
        }
        [HttpDelete("delete/{deliveryId}")]
        public async Task<IActionResult> Delete([FromRoute] int deliveryId)
        {
            var koiBillModel = await _deliveryRepo.DeleteAsync(deliveryId);

            if (koiBillModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
