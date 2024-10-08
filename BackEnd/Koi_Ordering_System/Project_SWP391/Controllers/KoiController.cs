using Microsoft.AspNetCore.Mvc;
using Project_SWP391.Dtos.Kois;
using Project_SWP391.Interfaces;
using Project_SWP391.Mappers;

namespace Project_SWP391.Controllers
{
    [Route("api/koi")]
    [ApiController]
    public class KoiController : ControllerBase
    {
        private readonly IKoiRepository _koiRepo;
        public KoiController(IKoiRepository koiRepo)
        {
            _koiRepo = koiRepo;
        }
        [HttpGet("view-all")]
        public async Task<IActionResult> GetAll()
        {
            var kois = await _koiRepo.GetAllAsync();
            var koiDto = kois.Select(k => k.ToKoiDto());

            return Ok(koiDto);
        }
        [HttpGet("view-by-id/{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var koi = await _koiRepo.GetByIdAsync(id);

            if (koi == null)
            {
                return NotFound("No koi found!");
            }

            return Ok(koi);
        }
        [HttpGet("view-by-name/{name})")]
        public async Task<IActionResult> GetByName([FromRoute] string name)
        {
            var koi = await _koiRepo.GetByNameAsync(name);

            if (koi == null)
            {
                return NotFound("No koi found!");
            }

            return Ok(koi);
        }
        [HttpPost("create/{farmId}")]
        public async Task<IActionResult> Create([FromRoute] int farmId, [FromBody] CreateKoiDto createKoi)
        {
            if (createKoi == null)
            {
                return BadRequest("Koi data is missing");
            }

            var koiModel = createKoi.ToKoiFromCreateDto(farmId);

            await _koiRepo.CreateAsync(koiModel);

            return CreatedAtAction(nameof(GetById), new { id = koiModel.KoiId }, koiModel);
        }
        [HttpPut("update/{koiId}")]
        public async Task<IActionResult> Update([FromRoute] int koiId, [FromBody] UpdateKoiDto updateKoi)
        {
            if (updateKoi == null)
            {
                return BadRequest("Koi data is missing");
            }

            var koiModel = await _koiRepo.UpdateAsync(koiId, updateKoi);

            if (koiModel == null)
            {
                return NotFound();
            }

            return Ok(koiModel);
        }
        [HttpDelete("delete/{koiId}")]
        public async Task<IActionResult> Delete([FromRoute] int koiId)
        {
            var koiModel = await _koiRepo.DeleteAsync(koiId);

            if (koiModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
