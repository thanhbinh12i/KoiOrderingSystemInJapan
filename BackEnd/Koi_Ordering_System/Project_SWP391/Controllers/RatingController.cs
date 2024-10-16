using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Project_SWP391.Dtos.Ratings;
using Project_SWP391.Dtos.TourDestinations;
using Project_SWP391.Interfaces;
using Project_SWP391.Mappers;
using Project_SWP391.Model;

namespace Project_SWP391.Controllers
{
    [Route("api/rating")]
    [ApiController]
    public class RatingController :ControllerBase
    {
        private readonly IRatingRepository _ratingRepo;
        private readonly IKoiFarmRepository _koiFarmRepo;
        private readonly UserManager<AppUser> _userManager;
        public RatingController(IRatingRepository ratingRepo, IKoiFarmRepository koiFarmRepo, UserManager<AppUser> userManager)
        {
            _ratingRepo = ratingRepo;
            _koiFarmRepo = koiFarmRepo;
            _userManager = userManager;
        }
        [HttpGet("view-all")]
        public async Task<IActionResult> ViewAll()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var rating = await _ratingRepo.GetAllAsync();
            if (rating.IsNullOrEmpty()) return NotFound();
            var ratingDto = rating.Select(v => v.ToRatingDto());
            return Ok(ratingDto);
        }
        [HttpGet("view/{farmId:int}&{userId}")]
        public async Task<IActionResult> ViewById([FromRoute] int farmId, string userId)
        {
            var rating = await _ratingRepo.GetByIdAsync(farmId, userId);
            if (rating == null)
            {
                return NotFound($"No Rating found for FarmId {farmId} and userId {userId}");
            }
            var ratingDto = rating.ToRatingDto();
            if (ratingDto == null)
            {
                return NotFound();
            }
            return Ok(ratingDto);
        }
        [HttpPost("create/{farmId:int}&{userId}")]
        public async Task<IActionResult> Create(int farmId, string userId, [FromBody] CreateRatingDto rating)
        {

            if (rating == null)
            {
                return BadRequest("Missing data");
            }
            if (!await _koiFarmRepo.ExistKoiFarm(farmId))
            {
                return BadRequest("Koi farm does not exist");
            }
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return BadRequest("User does not exist");
            }

            var ratingModel = rating.ToRatingFromToCreateDto(farmId, userId);
            if (ratingModel == null)
            {
                return NotFound();
            }
            await _ratingRepo.CreateAsync(ratingModel);
            return Ok();
        }
        [HttpPut("update/{farmId:int}&{userId}")]
        public async Task<IActionResult> Update([FromBody] UpdateRatingDto rating, int farmId, string userId)
        {
            var ratingModel = await _ratingRepo.UpdateAsync(farmId, userId, rating);

            if (ratingModel == null)
            {
                return NotFound();
            }

            return Ok(ratingModel);
        }
        [HttpDelete("delete/{farmId:int}&{userId}")]
        public async Task<IActionResult> Delete(int farmId, string userId)
        {
            var ratingModel = await _ratingRepo.DeleteAsync(farmId, userId);

            if (ratingModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
