using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Project_SWP391.Dtos.Bills;
using Project_SWP391.Interfaces;
using Project_SWP391.Mappers;
using Project_SWP391.Model;

namespace Project_SWP391.Controllers
{
    [Route("api/bill")]
    [ApiController]
    public class BillController : ControllerBase
    {
        private readonly IBillRepository _billRepo;
        private readonly UserManager<AppUser> _userManager;

        public BillController(IBillRepository billRepo, UserManager<AppUser> userManager)
        {
            _billRepo = billRepo;
            _userManager = userManager;
        }

        [HttpGet("view-all")]
        public async Task<IActionResult> GetAll()
        {
            var bills = await _billRepo.GetAllAsync();
            var billDto = bills.Select(b => b.ToBillDtoFromBill());

            return Ok(billDto);
        }

        [HttpGet("view-by-id/{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var bill = await _billRepo.GetByIdAsync(id);

            if (bill == null)
            {
                return NotFound("No bill found");
            }

            return Ok(bill.ToBillDtoFromBill());
        }

        [HttpGet("view-by-user-id/{userId}")]
        public async Task<IActionResult> GetByUserId([FromRoute] string userId)
        {
            var bill = await _billRepo.GetByUserIdAsync(userId);

            if (bill == null)
            {
                return NotFound("No bill found");
            }

            return Ok(bill.ToBillDtoFromBill());
        }

        [HttpPost("create/{userId}-{quotationId}")]
        public async Task<IActionResult> Create([FromRoute] string userId, [FromRoute]int quotationId, [FromBody] CreateBillDto createBill)
        {

            if (createBill == null)
            {
                return BadRequest("Bill data is missing");
            }
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return BadRequest("User does not exist");
            }

            var billModel = createBill.ToBillFromCreateBillDto(userId, quotationId);

            if (billModel == null)
            {
                return NotFound();
            }
            await _billRepo.CreateAsync(billModel);

            //return CreatedAtAction(nameof(GetById), new { id = billModel.BillId }, billModel);
            return Ok(billModel.ToBillDtoFromBill());
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateBillDto updateBill)
        {
            var billModel = await _billRepo.UpdateAsync(id, updateBill);

            if (billModel == null)
            {
                return NotFound();
            }

            return Ok(billModel);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var billModel = await _billRepo.DeleteAsync(id);

            if (billModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
