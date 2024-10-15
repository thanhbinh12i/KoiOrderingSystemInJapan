using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Project_SWP391.Data;
using Project_SWP391.Dtos.KoiFarms;
using Project_SWP391.Interfaces;
using Project_SWP391.Mappers;

namespace Project_SWP391.Controllers
{
    [Route("api/koiFarm")]
    [ApiController]
    public class KoiFarmController : ControllerBase
    {
        private readonly IKoiFarmRepository _koiFarmRepo;
        public KoiFarmController(IKoiFarmRepository koiFarmRepo)
        {
            _koiFarmRepo = koiFarmRepo;
        }
        [HttpGet("view-all")]
        public async Task<IActionResult> ViewAll()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var koiFarm = await _koiFarmRepo.GetAllAsync();
            if (koiFarm.IsNullOrEmpty()) return NotFound();
            var koiFarmDto = koiFarm.Select(v => v.ToKoiFarmDTO());
            return Ok(koiFarm);
        }
        [HttpGet("view/{farmId:int}")]
        public async Task<IActionResult> ViewById([FromRoute] int farmId)
        {
            var koiFarm = await _koiFarmRepo.GetByIdAsync(farmId);
            if (koiFarm == null)
            {
                return NotFound();
            }
            return Ok(koiFarm);
        }
        [HttpGet("view/{farmName}")]
        public async Task<IActionResult> ViewByName([FromRoute] string farmName)
        {
            var koiFarm = await _koiFarmRepo.GetByNameAsync(farmName);
            if (koiFarm == null)
            {
                return NotFound();
            }
            return Ok(koiFarm);
        }

        [HttpGet("view-by-koi-id/{koiId}")]
        public async Task<IActionResult> GetByKoiId([FromRoute] int koiId)
        {
            var koiFarm = await _koiFarmRepo.GetByKoiIdAsync(koiId);

            if (koiFarm == null)
            {
                return NotFound("No farm found");
            }
            
            return Ok(koiFarm);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CreateKoiFarmDto koiFarm)
        {
            if (koiFarm == null)
            {
                return BadRequest("Koi farm data is missing.");
            }
            var koiFarmModel = koiFarm.ToKoiFarmFromCreateDTO();
            if (koiFarmModel == null)
            {
                return NotFound();
            }
            await _koiFarmRepo.CreateAsync(koiFarmModel);
            return CreatedAtAction(nameof(ViewById), new { farmId = koiFarmModel.FarmId }, koiFarmModel);

        }
        [HttpPut("update/{farmId:int}")]
        public async Task<IActionResult> Update([FromBody] UpdateKoiFarmDto koiFarm, int farmId)
        {
            var koiFarmModel = await _koiFarmRepo.UpdateAsync(farmId, koiFarm);

            if (koiFarmModel == null)
            {
                return NotFound();
            }

            return Ok(koiFarmModel);
        }
        [HttpDelete("delete/{farmId:int}")]
        public async Task<IActionResult> Delete(int farmId)
        {
            var koiFarmModel = await _koiFarmRepo.DeleteAsync(farmId);

            if (koiFarmModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
