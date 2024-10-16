using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Project_SWP391.Dtos.Quotations;
using Project_SWP391.Dtos.Ratings;
using Project_SWP391.Interfaces;
using Project_SWP391.Mappers;
using Project_SWP391.Model;

namespace Project_SWP391.Controllers
{
    [Route("api/quotation")]
    [ApiController]
    public class QuotationController : ControllerBase
    {
        private readonly IQuotationRepository _quotationRepo;
        private readonly UserManager<AppUser> _userManager;
        private readonly ITourRepository _tourRepo;

        public QuotationController(IQuotationRepository quotationRepo, UserManager<AppUser> userManager, ITourRepository tourRepo)
        {
            _quotationRepo = quotationRepo;
            _userManager = userManager;
            _tourRepo = tourRepo;
        }
        [HttpGet("view-all")]
        public async Task<IActionResult> ViewAll()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var quotation = await _quotationRepo.GetAllAsync();
            if (quotation.IsNullOrEmpty()) return NotFound();
            var quotationDto = quotation.Select(v => v.ToQuotationDto());
            return Ok(quotationDto);
        }
        [HttpGet("view/{userId}&{tourId}")]
        public async Task<IActionResult> ViewById([FromRoute] string userId, int tourId)
        {
            var quotation = await _quotationRepo.GetByIdAsync(userId, tourId);
            if (quotation == null)
            {
                return NotFound($"No TourDestination found for UserId {userId} and TourId {tourId}");
            }
            var quotationDto = quotation.Select(q => q.ToQuotationDto()).ToList();
            if (quotationDto == null)
            {
                return NotFound();
            }
            return Ok(quotationDto);
        }
        [HttpGet("view/{quotatonId:int}")]
        public async Task<IActionResult> ViewByQuotationId([FromRoute] int quotatonId)
        {
            var quotation = await _quotationRepo.GetByQuotationIdAsync(quotatonId);
            if (quotation == null)
            {
                return NotFound($"No TourDestination found for Quotation ID {quotatonId}");
            }
            var quotationDto = quotation.ToQuotationDto();
            if (quotationDto == null)
            {
                return NotFound();
            }
            return Ok(quotationDto);
        }
        [HttpGet("view/{userId}")]
        public async Task<IActionResult> ViewByUserId([FromRoute] string userId)
        {
            var quotation = await _quotationRepo.GetByUserIdAsync(userId);
            if (quotation == null)
            {
                return NotFound($"No TourDestination found for Quotation ID {userId}");
            }
            var quotationDto = quotation.Select(q => q.ToQuotationDto()).ToList();
            if (quotationDto == null)
            {
                return NotFound();
            }
            return Ok(quotationDto);
        }
        [HttpPost("create/{userId}&{tourId:int}")]
        public async Task<IActionResult> Create(string userId, int tourId, [FromBody] CreateQuotationDto quotation)
        {

            if (quotation == null)
            {
                return BadRequest("Missing data");
            }
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return BadRequest("User does not exist");
            }
            var tour = await _tourRepo.GetIdByAsync(tourId);
            if (tour == null)
            {
                return BadRequest("Tour does not exist");
            }

            var quotationModel = quotation.ToQuotationFromToCreateDto(userId, tourId);
            if (quotationModel == null)
            {
                return NotFound();
            }
            await _quotationRepo.CreateAsync(quotationModel);
            return Ok();
        }
        [HttpPut("update/{quotationId:int}")]
        public async Task<IActionResult> Update([FromBody] UpdateQuotationDto quotation, int quotationId)
        {
            var quotationModel = await _quotationRepo.UpdateAsync(quotationId, quotation);

            if (quotationModel == null)
            {
                return NotFound();
            }

            return Ok(quotationModel);
        }
        [HttpDelete("delete/{quotationId:int}")]
        public async Task<IActionResult> Delete(int quotationId)
        {
            var quotationModel = await _quotationRepo.DeleteAsync(quotationId);

            if (quotationModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
