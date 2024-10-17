using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Project_SWP391.Dtos.KoiBills;
using Project_SWP391.Interfaces;
using Project_SWP391.Mappers;
using Project_SWP391.Model;

namespace Project_SWP391.Controllers
{
    [Route("api/koi-bill")]
    [ApiController]
    public class KoiBillController : ControllerBase
    {
        private readonly IBillRepository _billRepo;
        private readonly IKoiRepository _koiRepo;
        private readonly IKoiBillRepository _koiBillRepo;

        public KoiBillController(IBillRepository billRepo, IKoiRepository koiRepo, IKoiBillRepository koiBillRepo)
        {
            _billRepo = billRepo;
            _koiRepo = koiRepo;
            _koiBillRepo = koiBillRepo;
        }

        [HttpGet("view-all")]
        public async Task<IActionResult> GetAll()
        {
            var koiBills = await _koiBillRepo.GetAllAsync();
            var koiBillDto = koiBills.Select(b => b.ToKoiBillDtoFromKoiBill());

            return Ok(koiBillDto);
        }

        [HttpGet("view-by-id/{billId}-{koiId}")]
        public async Task<IActionResult> GetById([FromRoute] int billId, [FromRoute] int koiId)
        {
            var koiBill = await _koiBillRepo.GetByIdAsync(koiId, billId);

            if (koiBill == null)
            {
                return NotFound("No koi bill found");
            }

            return Ok(koiBill.ToKoiBillDtoFromKoiBill());
        }
        [HttpGet("view-by-billId/{billId}")]
        public async Task<IActionResult> GetByBillId([FromRoute] int billId)
        {
            var koiBill = await _koiBillRepo.GetByBillIdAsync(billId);

            if (koiBill == null)
            {
                return NotFound("No koi bill found");
            }
            var koiBillDto = koiBill.Select(b => b.ToKoiBillDtoFromKoiBill());
            return Ok(koiBillDto);
        }

        [HttpPost("create/{billId}-{koiId}")]
        public async Task<IActionResult> Create([FromRoute] int billId, [FromRoute] int koiId, [FromBody] CreateKoiBillDto createKoiBill)
        {

            if (createKoiBill == null)
            {
                return BadRequest("Koi bill data is missing");
            }

            if (!await _koiRepo.KoiExists(koiId))
            {
                return BadRequest("Koi does not exist");
            }

            if (!await _billRepo.BillExists(billId))
            {
                return BadRequest("Bill does not exist");
            }

            var koiBillModel = createKoiBill.ToKoiFromCreateKoiBillDto(koiId, billId);

            if (koiBillModel == null)
            {
                return NotFound();
            }

            await _koiBillRepo.CreateAsync(koiBillModel);

            return Ok(koiBillModel.ToKoiBillDtoFromKoiBill());
        }

        [HttpPut("update/{billId}-{koiId}")]
        public async Task<IActionResult> Update([FromRoute] int billId, [FromRoute] int koiId, [FromBody] UpdateKoiBillDto updateKoiBill)
        {
            var koiBillModel = await _koiBillRepo.UpdateAsync(koiId, billId, updateKoiBill);

            if (koiBillModel == null)
            {
                return NotFound();
            }

            return Ok(koiBillModel.ToKoiBillDtoFromKoiBill());
        }
        [HttpDelete("delete/{billId}-{koiId}")]
        public async Task<IActionResult> Delete([FromRoute] int billId, [FromRoute] int koiId)
        {
            var koiBillModel = await _koiBillRepo.DeleteAsync(koiId, billId);

            if (koiBillModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
