using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Project_SWP391.Dtos.Feedbacks;
using Project_SWP391.Dtos.PayStatus;
using Project_SWP391.Interfaces;
using Project_SWP391.Mappers;

namespace Project_SWP391.Controllers
{
    [Route("api/payStatus")]
    [ApiController]
    public class PayStatusController : ControllerBase
    {
        private readonly IPayStatusRepository _payStatusRepo;
        private readonly IBillRepository _billRepo;

        public PayStatusController(IPayStatusRepository payStatusRepo, IBillRepository billRepo)
        {
            _payStatusRepo = payStatusRepo;
            _billRepo = billRepo;
        }
        [HttpGet("view-all")]
        public async Task<IActionResult> ViewAll()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var payStatus = await _payStatusRepo.GetAllAsync();
            if (payStatus.IsNullOrEmpty()) return NotFound();
            var payStatusDto = payStatus.Select(v => v.ToPayStatusDto());
            return Ok(payStatusDto);
        }
        [HttpGet("view-payId/{payStatusId:int}")]
        public async Task<IActionResult> ViewById([FromRoute] int payStatusId)
        {
            var payStatus = await _payStatusRepo.GetByIdAsync(payStatusId);
            if (payStatus == null)
            {
                return NotFound();
            }
            return Ok(payStatus);
        }
        [HttpGet("view-billId/{billId:int}")]
        public async Task<IActionResult> ViewByBillId([FromRoute] int billId)
        {
            var payStatus = await _payStatusRepo.GetByBillIdAsync(billId);
            if (payStatus == null)
            {
                return NotFound();
            }
            return Ok(payStatus);
        }
        [HttpPost("create/{billId:int}")]
        public async Task<IActionResult> Create(int billId, [FromBody] CreatePayStatusDto payStatus)
        {

            if (payStatus == null)
            {
                return BadRequest("Missing data");
            }
            if (!await _billRepo.BillExists(billId))
            {
                return NotFound("Bill id does not exist");
            }

            var payStatusModel = payStatus.ToCreatePayStatusDto(billId);
            if (payStatusModel == null)
            {
                return NotFound();
            }
            await _payStatusRepo.CreateAsync(payStatusModel);
            return Ok();
        }
        [HttpPut("update/{payStatusId:int}")]
        public async Task<IActionResult> Update([FromBody] UpdatePayStatusDto payStatus, int payStatusId)
        {
            var payStatusModel = await _payStatusRepo.UpdateAsync(payStatusId, payStatus);

            if (payStatusModel == null)
            {
                return NotFound();
            }

            return Ok(payStatusModel);
        }
        [HttpDelete("delete/{payStatusId:int}")]
        public async Task<IActionResult> Delete(int payStatusId)
        {
            var payStatusModel = await _payStatusRepo.DeleteAsync(payStatusId);

            if (payStatusModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
