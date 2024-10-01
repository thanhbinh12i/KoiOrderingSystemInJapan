using Microsoft.AspNetCore.Mvc;
using Project_SWP391.Dtos.Kois;
using Project_SWP391.Interfaces;
using Project_SWP391.Mappers;

namespace Project_SWP391.Controllers
{
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
                return NotFound();
            }

            return Ok(koi);
        }
        [HttpGet("view-by-name/{name})")]
        public async Task<IActionResult> GetByName([FromRoute] string name)
        {
            var koi = await _koiRepo.GetByNameAsync(name);

            if (koi == null)
            {
                return NotFound();
            }

            return Ok(koi);
        }
        [HttpPut("create")]
        public async Task<IActionResult> Create([FromRoute] int koiFarmId, [FromRoute] int varietyId, [FromBody] CreateKoiDto createKoi)
        {
            if(createKoi == null)
            {
                return BadRequest();
            }

            var koiModel = createKoi.ToKoiFromCreateDto();

            await _koiRepo.CreateAsync(koiModel);

            return Ok(koiModel);
        }
    }
}
