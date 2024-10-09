using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Project_SWP391.Dtos.Feedbacks;
using Project_SWP391.Interfaces;
using Project_SWP391.Mappers;
using Project_SWP391.Model;

namespace Project_SWP391.Controllers
{
    [Route("api/feedback")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackRepository _feedbackRepo;
        private readonly UserManager<AppUser> _userManager;

        public FeedbackController(IFeedbackRepository feedbackRepo, UserManager<AppUser> userManager)
        {
            _feedbackRepo = feedbackRepo;
            _userManager = userManager;
        }
        [HttpGet("view-all")]
        public async Task<IActionResult> ViewAll()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var feedback = await _feedbackRepo.GetAllAsync();
            if (feedback.IsNullOrEmpty()) return NotFound();
            var feedbackDto = feedback.Select(v => v.ToFeedbackDto());
            return Ok(feedbackDto);
        }
        [HttpGet("view/{feedbackId:int}")]
        public async Task<IActionResult> ViewById([FromRoute] int feedbackId)
        {
            var feedback = await _feedbackRepo.GetByIdAsync(feedbackId);
            if (feedback == null)
            {
                return NotFound();
            }
            return Ok(feedback);
        }
        [HttpGet("view/{userId}")]
        public async Task<IActionResult> ViewByUserId([FromRoute] string userId)
        {
            var feedback = await _feedbackRepo.GetByUserIdAsync(userId);
            if (feedback == null)
            {
                return NotFound();
            }
            return Ok(feedback);
        }
        [HttpPost("create/{userId}")]
        public async Task<IActionResult> Create(string userId, [FromBody] CreateFeedbackDto feedback)
        {

            if (feedback == null)
            {
                return BadRequest("Missing data");
            }
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return BadRequest("User does not exist");
            }

            var feedbackModel = feedback.ToCreateFeedbackDto(userId);
            if (feedbackModel == null)
            {
                return NotFound();
            }
            await _feedbackRepo.CreateAsync(feedbackModel);
            return Ok();
        }
        [HttpPut("update/{feedbackId:int}")]
        public async Task<IActionResult> Update([FromBody] UpdateFeedbackDto feedback, int feedbackId)
        {
            var feedbackModel = await _feedbackRepo.UpdateAsync(feedbackId, feedback);

            if (feedbackModel == null)
            {
                return NotFound();
            }

            return Ok(feedbackModel);
        }
        [HttpDelete("delete/{feedbackId:int}")]
        public async Task<IActionResult> Delete(int feedbackId)
        {
            var feedbackModel = await _feedbackRepo.DeleteAsync(feedbackId);

            if (feedbackModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
