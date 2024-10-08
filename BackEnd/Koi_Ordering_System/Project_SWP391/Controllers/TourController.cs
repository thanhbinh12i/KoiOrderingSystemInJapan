//using Microsoft.AspNetCore.Mvc;
//using Project_SWP391.Dtos.KoiFarm;
//using Project_SWP391.Dtos.Tour;
//using Project_SWP391.Interfaces;
//using Project_SWP391.Mappers;

//namespace Project_SWP391.Controllers
//{
//    [Route("api/tour")]
//    [ApiController]
//    public class TourController : ControllerBase
//    {
//        private readonly ITourRepository _tourRepo;
//        public TourController(ITourRepository tourRepo)
//        {
//            _tourRepo = tourRepo;
//        }
//        [HttpGet("view-all")]
//        public async Task<IActionResult> ViewAll()
//        {
//            var tour = await _tourRepo.GetAllAsync();
//            var tourDto = tour.Select(v => v.ToTourDto());
//            return Ok(tourDto);
//        }
//        [HttpGet("view/{tourId:int}")]
//        public async Task<IActionResult> ViewAllId([FromRoute] int tourId)
//        {
//            var tour = await _tourRepo.GetIdByAsync(tourId);
//            if (tour == null)
//            {
//                return NotFound();
//            }
//            return Ok(tour);
//        }
//        [HttpPost("create")]
//        public async Task<IActionResult> Create([FromBody] CreateTourDto tour)
//        {
//            if (tour == null)
//            {
//                return BadRequest("Tour data is missing.");
//            }
//            var tourModel = tour.ToTourFromToCreateDto();
//            if (tourModel == null)
//            {
//                return NotFound();
//            }
//            await _tourRepo.CreateAsync(tourModel);
//            return CreatedAtAction(nameof(ViewAllId), new { tourId = tourModel.TourId }, tourModel);

//        }
//        [HttpPut("update/{tourId:int}")]
//        public async Task<IActionResult> Update([FromBody] UpdateTourDto tour, int tourId)
//        {
//            var tourModel = await _tourRepo.UpdateAsync(tourId, tour);

//            if (tourModel == null)
//            {
//                return NotFound();
//            }

//            return Ok(tourModel);
//        }
//        [HttpDelete("delete/{tourId:int}")]
//        public async Task<IActionResult> Delete(int tourId)
//        {
//            var tourModel = await _tourRepo.DeleteAsync(tourId);

//            if (tourModel == null)
//            {
//                return NotFound();
//            }

//            return NoContent();
//        }
//    }
//}
