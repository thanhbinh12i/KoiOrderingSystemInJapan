using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Project_SWP391.Dtos.Ratings;
using Project_SWP391.Dtos.VarietyOfKois;
using Project_SWP391.Interfaces;
using Project_SWP391.Mappers;

namespace Project_SWP391.Controllers
{
    [Route("api/varietyOfKoi")]
    [ApiController]
    public class VarietyOfKoiController : ControllerBase
    {
        private readonly IVarietyOfKoiRepository _vokRepo;
        private readonly IKoiRepository _koiRepo;
        private readonly IKoiVarietyRepository _koiVarietyRepo;

        public VarietyOfKoiController(IVarietyOfKoiRepository vokRepo, IKoiRepository koiRepo, IKoiVarietyRepository koiVarietyRepo)
        {
            _vokRepo = vokRepo;
            _koiRepo = koiRepo;
            _koiVarietyRepo = koiVarietyRepo;
        }
        [HttpGet("view-all")]
        public async Task<IActionResult> ViewAll()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var vok = await _vokRepo.GetAllAsync();
            if (vok.IsNullOrEmpty()) return NotFound();
            var vokDto = vok.Select(v => v.ToVOKDto());
            return Ok(vokDto);
        }
        [HttpGet("view/{koiId:int}&{varietyId:int}")]
        public async Task<IActionResult> ViewById([FromRoute] int koiId, int varietyId)
        {
            var vok = await _vokRepo.GetByIdAsync(koiId, varietyId);
            if (vok == null)
            {
                return NotFound($"No Variety of koi found for koiId {koiId} and varietyId {varietyId}");
            }
            var vokDto = vok.ToVOKDto();
            if (vokDto == null)
            {
                return NotFound();
            }
            return Ok(vokDto);
        }
        [HttpPost("create/{koiId:int}&{varietyId:int}")]
        public async Task<IActionResult> Create(int koiId, int varietyId)
        {
            if (!await _koiRepo.KoiExists(koiId))
            {
                return BadRequest("Koi id does not exist");
            }
            if (!await _koiVarietyRepo.KoiVarietyExists(varietyId))
            {
                return BadRequest("Koi Variey id does not exist");
            }
            var vokModel = VarietyOfKoiMapper.ToVOKFromToCreateDto(koiId, varietyId);
            await _vokRepo.CreateAsync(vokModel);
            return Ok();
        }
        [HttpDelete("delete/{koiId:int}&{varietyId:int}")]
        public async Task<IActionResult> Delete(int koiId, int varietyId)
        {
            var vokModel = await _vokRepo.DeleteAsync(koiId, varietyId);

            if (vokModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
