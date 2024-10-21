using Microsoft.AspNetCore.Mvc;
using Project_SWP391.Dtos.BillDetails;
using Project_SWP391.Dtos.DeliveryStatuses;
using Project_SWP391.Interfaces;
using Project_SWP391.Mappers;
using Project_SWP391.Model;

namespace Project_SWP391.Controllers
{
    [Route("api/delivery-status")]
    [ApiController]
    public class DeliveryStatusController : ControllerBase
    {
        private readonly IDeliveryStatusRepository _deliveryStatusRepo;
        private readonly IDeliveryRepository _deliveryRepo;
        private readonly IBillRepository _billRepo;

        public DeliveryStatusController(IDeliveryStatusRepository deliveryStatusRepo, IDeliveryRepository deliveryRepo, IBillRepository billRepo)
        {
            _deliveryRepo = deliveryRepo;
            _deliveryStatusRepo = deliveryStatusRepo;
            _billRepo = billRepo;
        }

        [HttpGet("view-all")]
        public async Task<IActionResult> GetAll()
        {
            var deliveryStatuses = await _deliveryStatusRepo.GetAllAsync();
            var deliveryStatusDto = deliveryStatuses.Select(b => b.ToDeliveryStatusDtoFromDeliveryStatus());

            return Ok(deliveryStatusDto);
        }

        [HttpGet("view-by-id/{deliveryStatuslId}")]
        public async Task<IActionResult> GetById([FromRoute] int deliveryStatuslId)
        {
            var deliveryStatusModel = await _deliveryStatusRepo.GetByIdAsync(deliveryStatuslId);

            if (deliveryStatusModel == null)
            {
                return NotFound("No bill detail found");
            }

            return Ok(deliveryStatusModel.ToDeliveryStatusDtoFromDeliveryStatus());
        }
        [HttpGet("view-by-user-id/{userId}")]
        public async Task<IActionResult> GetByUserId([FromRoute] string userId)
        {
            var deliveryStatuses = await _deliveryStatusRepo.GetByUserId(userId);

            if (deliveryStatuses == null)
            {
                return NotFound("No bill detail found");
            }
            var deliveryStatusDto = deliveryStatuses.Select(b => b.ToDeliveryStatusDtoFromDeliveryStatus());

            return Ok(deliveryStatusDto);
        }

        [HttpPost("create/{billId}-{deliveryId}")]
        public async Task<IActionResult> Create([FromRoute] int billId, [FromRoute] int deliveryId, [FromBody] CreateDeliveryStatusDto createDeliveryStatus)
        {
            if (createDeliveryStatus == null)
            {
                return BadRequest("Delivery status data is missing");
            }

            if (!await _billRepo.BillExists(billId))
            {
                return BadRequest("Bill does not exist");
            }

            if (!await _deliveryRepo.DeliveryExist(deliveryId))
            {
                return BadRequest("Delivery does not exist");
            }

            var deliveryStatusModel = createDeliveryStatus.ToDeliveryStatusFromCreateDeliveryStatusDto(billId, deliveryId);

            if (deliveryStatusModel == null)
            {
                return BadRequest();
            }

            await _deliveryStatusRepo.CreateAsync(deliveryStatusModel);

            //return CreatedAtAction(nameof(GetById), new { id = deliveryStatusModel.DeliveryStatusId }, deliveryStatusModel);
            return Ok(deliveryStatusModel.ToDeliveryStatusDtoFromDeliveryStatus());
        }

        [HttpPut("update/{deliveryStatusId}")]
        public async Task<IActionResult> Update([FromRoute] int deliveryStatusId, [FromBody] UpdateDeliveryStatusDto updateDeliveryStatus)
        {
            var deliveryStatusModel = await _deliveryStatusRepo.UpdateAsync(deliveryStatusId, updateDeliveryStatus);

            if (deliveryStatusModel == null)
            {
                return NotFound();
            }

            return Ok(deliveryStatusModel.ToDeliveryStatusDtoFromDeliveryStatus());
        }
        [HttpDelete("delete/{deliveryStatusId}")]
        public async Task<IActionResult> Delete([FromRoute] int deliveryStatusId)
        {
            var deliveryStatusModel = await _deliveryStatusRepo.DeleteAsync(deliveryStatusId);

            if (deliveryStatusModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
