using Microsoft.AspNetCore.Mvc;
using Project_SWP391.Data;
using Project_SWP391.Dtos.KoiFarm;
using Project_SWP391.Dtos.KoiVariable;
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
            var koiFarm = await _koiFarmRepo.GetAllAsync();
            var koiFarmDto = koiFarm.Select(v => v.ToKoiFarmDTO());
            return Ok(koiFarmDto);
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
            return Ok();
        }
    }
}
