using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Project_SWP391.Dtos.KoiFarms;
using Project_SWP391.Dtos.TourDestinations;
using Project_SWP391.Interfaces;
using Project_SWP391.Mappers;
using Project_SWP391.Model;
using Project_SWP391.Repository;

namespace Project_SWP391.Controllers
{
    [Route("api/tourDestination")]
    [ApiController]
    public class TourDestinationController : ControllerBase
    {
        private readonly ITourDestinationRepository _tourDestinationRepo;
        private readonly ITourRepository _tourRepo;
        private readonly IKoiFarmRepository _koiFarmRepo;

        public TourDestinationController(ITourDestinationRepository tourDestinationRepo, ITourRepository tourRepo, IKoiFarmRepository koiFarmRepo)
        {
            _tourDestinationRepo = tourDestinationRepo;
            _tourRepo = tourRepo;
            _koiFarmRepo = koiFarmRepo;
        }
        [HttpGet("view-all")]
        public async Task<IActionResult> ViewAll()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var tourDestination = await _tourDestinationRepo.GetAllAsync();
            if (tourDestination.IsNullOrEmpty()) return NotFound();
            var tourDestinationDto = tourDestination.Select(v => v.ToTourDestinationDto());
            return Ok(tourDestinationDto);
        }
        [HttpGet("view/{farmId:int}&{tourId:int}")]
        public async Task<IActionResult> ViewById([FromRoute] int farmId, int tourId)
        {
            var tourDestination = await _tourDestinationRepo.GetByIdAsync(farmId, tourId);
            if (tourDestination == null)
            {
                return NotFound($"No TourDestination found for FarmId {farmId} and TourId {tourId}");
            }
            var tourDestinationDto = tourDestination.ToTourDestinationDto();
            if (tourDestinationDto == null)
            {
                return NotFound();
            }
            return Ok(tourDestinationDto);
        }
        [HttpGet("view-tourId/{tourId:int}")]
        public async Task<IActionResult> ViewByTourId([FromRoute] int tourId)
        {
            var tourDestination = await _tourDestinationRepo.GetByTourIdAsync(tourId);
            if (tourDestination == null)
            {
                return NotFound($"No TourDestination found for TourId {tourId}");
            }
            //var tourDestinationDto = tourDestination.ToTourDestinationDto();
            //if (tourDestinationDto == null)
            //{
            //    return NotFound();
            //}
            return Ok(tourDestination);
        }
        [HttpPost("create/{farmId:int}&{tourId:int}")]
        public async Task<IActionResult> Create(int farmId, int tourId, [FromBody] CreateTourDestinationDto tourDestination)
        {

            if (tourDestination == null)
            {
                return BadRequest("Missing data");
            }
            if (!await _koiFarmRepo.ExistKoiFarm(farmId))
            {
                return BadRequest("Koi farm does not exist");
            }
            if (!await _tourRepo.ExistTour(tourId))
            {
                return BadRequest("Tour does not exist");
            }

            var tourDestinationModel = tourDestination.ToTourDestinationFromToCreateDto(farmId, tourId);
            if (tourDestinationModel == null)
            {
                return NotFound();
            }
            await _tourDestinationRepo.CreateAsync(tourDestinationModel);
            return Ok();
        }
        [HttpPut("update/{farmId:int}&{tourId:int}")]
        public async Task<IActionResult> Update([FromBody] UpdateTourDestinationDto tourDestination, int farmId, int tourId)
        {
            var tourDestinationModel = await _tourDestinationRepo.UpdateAsync(farmId, tourId, tourDestination);

            if (tourDestinationModel == null)
            {
                return NotFound();
            }

            return Ok(tourDestinationModel);
        }
        [HttpDelete("delete/{farmId:int}&{tourId:int}")]
        public async Task<IActionResult> Delete(int farmId, int tourId)
        {
            var tourDestinationModel = await _tourDestinationRepo.DeleteAsync(farmId,tourId);

            if (tourDestinationModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
