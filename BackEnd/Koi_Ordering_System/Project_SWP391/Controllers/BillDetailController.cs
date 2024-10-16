using Microsoft.AspNetCore.Mvc;
using Project_SWP391.Interfaces;
using Project_SWP391.Mappers;
using Project_SWP391.Dtos;
using Microsoft.AspNetCore.Identity;
using Project_SWP391.Dtos.BillDetails;
using Project_SWP391.Dtos.KoiBills;
using Project_SWP391.Model;

namespace Project_SWP391.Controllers
{
    [Route("api/bill-detail")]
    [ApiController]
    public class BillDetailController : ControllerBase
    {
        private readonly IBillDetailRepository _billDetailRepo;
        private readonly IBillRepository _billRepo;

        public BillDetailController(IBillDetailRepository billDetailRepo, IBillRepository billRepo)
        {
            _billDetailRepo = billDetailRepo;
            _billRepo = billRepo;
        }

        [HttpGet("view-all")]
        public async Task<IActionResult> GetAll()
        {
            var billDetails = await _billDetailRepo.GetAllAsync();
            var billDetailDto = billDetails.Select(b => b.ToBillDetailDtoFromBillDetail());

            return Ok(billDetailDto);
        }

        [HttpGet("view-by-id/{id}")]
        public async Task<IActionResult> GetById([FromRoute] int billDetailId)
        {
            var billDetailModel = await _billDetailRepo.GetByIdAsync(billDetailId);

            if (billDetailModel == null)
            {
                return NotFound("No bill detail found");
            }

            return Ok(billDetailModel.ToBillDetailDtoFromBillDetail());
        }

        [HttpPost("create/{billId}")]
        public async Task<IActionResult> Create([FromRoute] int billId, [FromBody] CreateBillDetailDto createBillDetail)
        {
            if (createBillDetail == null)
            {
                return BadRequest("Bill detail is data missing");
            }

            if(!await _billRepo.BillExists(billId))
            {
                return BadRequest("Bill does not exist");
            }

            var billDetailModel = createBillDetail.ToBillDetailFromCreateBillDetailDto(billId);

            if(billDetailModel == null)
            {
                return BadRequest();
            }

            await _billDetailRepo.CreateAsync(billDetailModel);

            //return CreatedAtAction(nameof(GetById), new { id = billDetailModel.BillDetailId }, billDetailModel);
            return Ok(billDetailModel.ToBillDetailDtoFromBillDetail());
        }

        [HttpPut("update/{billDetailId}")]
        public async Task<IActionResult> Update([FromRoute] int billDetailId, [FromBody] UpdateBillDetailDto updateBillDetail)
        {
            var billDetailModel = await _billDetailRepo.UpdateAsync(billDetailId, updateBillDetail);

            if (billDetailModel == null)
            {
                return NotFound();
            }

            return Ok(billDetailModel.ToBillDetailDtoFromBillDetail());
        }
        [HttpDelete("delete/{billDetailId}")]
        public async Task<IActionResult> Delete([FromRoute] int billDetailId)
        {
            var billDetailModel = await _billDetailRepo.DeleteAsync(billDetailId);

            if (billDetailModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
