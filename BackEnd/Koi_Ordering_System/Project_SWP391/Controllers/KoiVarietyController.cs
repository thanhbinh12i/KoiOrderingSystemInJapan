using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_SWP391.Data;
using Project_SWP391.Dtos.KoiVariable;
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
            var variables = await _koiVarietyRepo.GetAllAsync();
            var varietyDto = variables.Select(v => v.ToKoiVarietyDto());
            return Ok(varietyDto);
        }
        [HttpGet("view/({id})")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var variety = await _koiVarietyRepo.GetByIdAsync(id);
            if (variety == null)
            {
                return NotFound();
            }
            return Ok(variety);
        }
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CreateKoiVarietyDto koiVariety)
        {
            if (koiVariety == null)
            {
                return BadRequest("Koi variety data is missing.");
            }
            var varietyModel = koiVariety.ToKoiVarietyFromToCreateDto();
            if(varietyModel == null)
            {
                return NotFound();
            }
            await _koiVarietyRepo.CreateAsync(varietyModel);
            return CreatedAtAction(nameof(GetById), new { id = varietyModel.VarietyId }, varietyModel);
        }
        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update([FromBody] UpdateKoiVarietyDto variety, int id)
        {
            var varietyModel = await _koiVarietyRepo.UpdateAsync(id, variety);

            if(varietyModel == null)
            {
                return NotFound();
            }

            return Ok(varietyModel);
        }
        [HttpDelete("delete")]
        public async Task<IActionResult> Delete(int id)
        {
            var varietyModel = await _koiVarietyRepo.DeleteAsync(id);

            if(varietyModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
