using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_SWP391.Data;
using Project_SWP391.Dtos.KoiVarieties;
using Project_SWP391.Interfaces;
using Project_SWP391.Mappers;
using Project_SWP391.Model;

namespace Project_SWP391.Controllers
{
    [Route("api/koi-variable")]
    [ApiController]
    public class KoiVarietyController : ControllerBase
    {
        private readonly IKoiVarietyRepository _koiVarietyRepo;
        public KoiVarietyController(IKoiVarietyRepository koiVarietyRepo)
        {
            _koiVarietyRepo = koiVarietyRepo;
        }
        [HttpGet("view-all")]
        public async Task<IActionResult> ViewAll()
        {
            var variety = await _koiVarietyRepo.GetAllAsync();
            var varietyDto = variety.Select(v => v.ToKoiVarietyDto());
            return Ok(varietyDto);
        }
        [HttpGet("view-by-id/{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var variety = await _koiVarietyRepo.GetByIdAsync(id);
            if (variety == null)
            {
                return NotFound("No variety found!");
            }
            return Ok(variety);
        }
        [HttpGet("view-by-name/{name}")]
        public async Task<IActionResult> GetByName([FromRoute] string name)
        {
            var variety = await _koiVarietyRepo.GetByNameAsync(name);
            if (variety == null)
            {
                return NotFound("No variety found!");
            }
            return Ok(variety);
        }
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CreateKoiVarietyDto createVariety)
        {
            if (createVariety == null)
            {
                return BadRequest("Koi variety data is missing.");
            }

            var varietyModel = createVariety.ToKoiVarietyFromToCreateDto();

            if(varietyModel == null)
            {
                return NotFound("No variety found!");
            }

            await _koiVarietyRepo.CreateAsync(varietyModel);

            return CreatedAtAction(nameof(GetById), new { id = varietyModel.VarietyId }, varietyModel);
        }
        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update([FromBody] UpdateKoiVarietyDto updateVariety, int id)
        {
            if (updateVariety == null)
        {
                return BadRequest("Koi variety data is missing.");
            }

            var varietyModel = await _koiVarietyRepo.UpdateAsync(id, updateVariety);

            if(varietyModel == null)
            {
                return NotFound("No variety found!");
            }

            return Ok(varietyModel);
        }
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var varietyModel = await _koiVarietyRepo.DeleteAsync(id);

            if(varietyModel == null)
            {
                return NotFound("No variety found!");
            }

            return NoContent();
        }
    }
}
