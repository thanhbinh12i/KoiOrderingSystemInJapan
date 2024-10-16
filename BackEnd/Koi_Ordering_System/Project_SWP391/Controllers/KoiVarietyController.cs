using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_SWP391.Data;
using Project_SWP391.Dtos.KoiVarieties;
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
            var variety = await _koiVarietyRepo.GetAllAsync();
            var varietyDto = variety.Select(v => v.ToKoiVarietyDto());
            return Ok(varietyDto);
        }

        [HttpGet("view-by-id/{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var variety = await _koiVarietyRepo.GetByIdAsync(id);
            if (variety == null)
            {
                return NotFound("No variety found!");
            }
            return Ok(variety);
        }

        [HttpGet("view-by-name/{name}")]
        public async Task<IActionResult> GetByName([FromRoute] string name)
        {
            var variety = await _koiVarietyRepo.GetByNameAsync(name);
            if (variety == null)
            {
                return NotFound("No variety found!");
            }
            return Ok(variety);
        }

        [HttpGet("view-by-koi-id/{koiId}")]
        public async Task<IActionResult> GetByKoiId([FromRoute] int koiId)
        {
            var variety = await _koiVarietyRepo.GetByKoiIdAsync(koiId);

            if (variety == null)
            {
                return NotFound("No variety found!");
            }

            return Ok(variety);
        }

        //[HttpPost("create")]
        //public async Task<IActionResult> Create([FromBody] CreateKoiVarietyDto createVariety)
        //{
        //    if (createVariety == null)
        //    {
        //        return BadRequest("Koi variety data is missing.");
        //    }

        //    var varietyModel = createVariety.ToKoiVarietyFromToCreateDto();

        //    if (varietyModel == null)
        //    {
        //        return NotFound();
        //    }

        //    await _koiVarietyRepo.CreateAsync(varietyModel);

        //    return CreatedAtAction(nameof(GetById), new { id = varietyModel.VarietyId }, varietyModel);
        //}

        [HttpPost("upload")]
        public async Task<IActionResult> Create([FromForm] List<IFormFile> files, [FromForm] CreateKoiVarietyDto createKoiVariety)
        {
            try
            {
                if (files == null || !files.Any())
                {
                    return BadRequest("No files uploaded.");
                }

                var uploadedFiles = new List<string>();


                string webRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");

                var uploadPath = Path.Combine(webRootPath, "uploads", "koiVariety");

                if (!Directory.Exists(uploadPath))
                {
                    Directory.CreateDirectory(uploadPath);
                }

                foreach (var file in files)
                {
                    if (file.Length > 0)
                    {
                        var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                        var filePath = Path.Combine(uploadPath, fileName);

                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            await file.CopyToAsync(fileStream);
                        }

                        var relativePath = $"/uploads/koiVariety/{fileName}";
                        uploadedFiles.Add(relativePath);

                        var farmImage = new KoiVariety
                        {
                            VarietyName = createKoiVariety.VarietyName,
                            Description = createKoiVariety.Description,
                            UrlImage = fileName,
                        };
                        await _koiVarietyRepo.CreateAsync(farmImage);
                    }
                }

                return Ok(new { message = "Images uploaded successfully", urls = uploadedFiles });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while uploading images: {ex.Message}");
            }
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update([FromBody] UpdateKoiVarietyDto updateVariety, int id)
        {
            if (updateVariety == null)
            {
                return BadRequest("Koi variety data is missing.");
            }

            var varietyModel = await _koiVarietyRepo.UpdateAsync(id, updateVariety);

            if (varietyModel == null)
            {
                return NotFound();
            }

            return Ok(varietyModel.ToKoiVarietyDto());
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var varietyModel = await _koiVarietyRepo.DeleteAsync(id);

            if (varietyModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}