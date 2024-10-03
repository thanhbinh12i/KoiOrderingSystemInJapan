using Microsoft.AspNetCore.Mvc;
using Project_SWP391.Dtos.FarmImages;
using Project_SWP391.Interfaces;
using Project_SWP391.Mappers;

namespace Project_SWP391.Controllers
{
    [Route("api/farmImage")]
    [ApiController]
    public class FarmImageController : ControllerBase
    {
        private readonly IFarmImageRepository _farmImageRepo;
        private readonly IKoiFarmRepository _koiFarmRepo;
        public FarmImageController(IFarmImageRepository farmImageRepo, IKoiFarmRepository koiFarmRepo)
        {
            _farmImageRepo = farmImageRepo;
            _koiFarmRepo = koiFarmRepo;
        }
        [HttpGet("view-all")]
        public async Task<IActionResult> GetAll()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var farmImage = await _farmImageRepo.GetAllAsync();
            var farmImageDto = farmImage.Select(s => s.ToFarmImageDto());
            return Ok(farmImageDto);
        }
        [HttpGet("view/{imageId:int}")]
        public async Task<IActionResult> GetById([FromRoute] int imageId)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var farmImage = await _farmImageRepo.GetByIdAsync(imageId);
            if (farmImage == null)
            {
                return NotFound();
            }
            return Ok(farmImage.ToFarmImageDto());
        }
        [HttpPost("Create/{farmId:int}")]
        public async Task<IActionResult> Create(int farmId, CreateFarmImageDto farmImageDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (!await _koiFarmRepo.ExistKoiFarm(farmId)) return BadRequest("Farm does not exist!!!!");
            var farmImageModel = farmImageDto.ToCreateFarmImageDto(farmId);
            await _farmImageRepo.CreateAsync(farmImageModel);
            return CreatedAtAction(nameof(GetById), new { farmId = farmImageModel.FarmId }, farmImageModel.ToFarmImageDto());
        }
        [HttpDelete("delete/{imageId:int}")]
        public async Task<IActionResult> Delete(int farmId)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var farmImageModel = await _farmImageRepo.DeleteAsync(farmId);
            if (farmImageModel == null) return NotFound("Farm image not found!!!");
            return NoContent();
        }
        [HttpPut("update/{imageId:int}")]
        public async Task<IActionResult> Update(int imageId, [FromBody] UpdateFarmImageDto farmImageDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var farmImageModel = await _farmImageRepo.UpdateAsync(imageId, farmImageDto);
            if (farmImageModel == null) return NotFound("Farm image not found!!!");

            return Ok(farmImageModel.ToFarmImageDto());
        }

    }
}
