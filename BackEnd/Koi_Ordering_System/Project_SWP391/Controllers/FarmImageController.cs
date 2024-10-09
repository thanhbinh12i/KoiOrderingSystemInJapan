using Microsoft.AspNetCore.Mvc;
using Project_SWP391.Dtos.FarmImages;
using Project_SWP391.Interfaces;
using Project_SWP391.Mappers;
using Project_SWP391.Model;

namespace Project_SWP391.Controllers
{
    [Route("api/farmImage")]
    [ApiController]
    public class FarmImageController : ControllerBase
    {
        private readonly IFarmImageRepository _farmImageRepo;
        private readonly IKoiFarmRepository _koiFarmRepo;
        private readonly IWebHostEnvironment _environment;

        public FarmImageController(IFarmImageRepository farmImageRepo, IKoiFarmRepository koiFarmRepo, IWebHostEnvironment environment)
        {
            _farmImageRepo = farmImageRepo;
            _koiFarmRepo = koiFarmRepo;
            _environment = environment;
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
        //[HttpPost("Create/{farmId:int}")]
        //public async Task<IActionResult> Create(int farmId, CreateFarmImageDto farmImageDto)
        //{
        //    if (!ModelState.IsValid) return BadRequest(ModelState);
        //    if (!await _koiFarmRepo.ExistKoiFarm(farmId)) return BadRequest("Farm does not exist!!!!");
        //    var farmImageModel = farmImageDto.ToCreateFarmImageDto(farmId);
        //    await _farmImageRepo.CreateAsync(farmImageModel);
        //    return CreatedAtAction(nameof(GetById), new { farmId = farmImageModel.FarmId }, farmImageModel.ToFarmImageDto());
        //}
        [HttpPost("upload/{farmId:int}")]
        public async Task<IActionResult> UploadImages(int farmId, [FromForm] List<IFormFile> files)
        {
            try
            {
                if (!await _koiFarmRepo.ExistKoiFarm(farmId))
                {
                    return BadRequest("Koi farm does not exist");
                }

                if (files == null || !files.Any())
                {
                    return BadRequest("No files uploaded.");
                }

                var uploadedFiles = new List<string>();


                string webRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
                var uploadPath = Path.Combine(webRootPath, "uploads", "koiFarm");

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

                        var relativePath = $"/uploads/koiFarm/{fileName}";
                        uploadedFiles.Add(relativePath);

                        var farmImage = new FarmImage
                        {
                            UrlImage = fileName,
                            FarmId = farmId
                        };
                        await _farmImageRepo.CreateAsync(farmImage);
                    }
                }

                return Ok(new { message = "Images uploaded successfully", urls = uploadedFiles });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while uploading images: {ex.Message}");
            }
        }
        [HttpDelete("delete/{imageId:int}")]
        public async Task<IActionResult> Delete(int farmId)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var farmImageModel = await _farmImageRepo.DeleteAsync(farmId);
            if (farmImageModel == null) return NotFound("Farm image not found!!!");
            return NoContent();
        }
        //[HttpPut("update/{imageId:int}")]
        //public async Task<IActionResult> Update(int imageId, [FromBody] UpdateFarmImageDto farmImageDto)
        //{
        //    if (!ModelState.IsValid) return BadRequest(ModelState);
        //    var farmImageModel = await _farmImageRepo.UpdateAsync(imageId, farmImageDto);
        //    if (farmImageModel == null) return NotFound("Farm image not found!!!");

        //    return Ok(farmImageModel.ToFarmImageDto());
        //}
        [HttpPut("update/{farmImageId:int}")]
        public async Task<IActionResult> UpdateImages(int farmImageId, [FromForm] List<IFormFile> files)
        {
            try
            {
                var farmImage = await _farmImageRepo.GetByIdAsync(farmImageId);
                if (farmImage == null)
                {
                    return BadRequest("Farm image does not exist.");
                }

                // check if file can't upload
                if (files == null || !files.Any())
                {
                    return BadRequest("No files uploaded.");
                }

                var uploadedFiles = new List<string>();

                string webRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
                var uploadPath = Path.Combine(webRootPath, "uploads", "koiFarm");

                // create folder if not exist
                if (!Directory.Exists(uploadPath))
                {
                    Directory.CreateDirectory(uploadPath);
                }

                // delete old image(if yes)
                if (!string.IsNullOrEmpty(farmImage.UrlImage))
                {
                    var oldFilePath = Path.Combine(uploadPath, farmImage.UrlImage);
                    if (System.IO.File.Exists(oldFilePath))
                    {
                        System.IO.File.Delete(oldFilePath);
                    }
                }

                // upload new image
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

                        var relativePath = $"/uploads/koiFarm/{fileName}";
                        uploadedFiles.Add(relativePath);

                        // update new url
                        farmImage.UrlImage = fileName;

                        await _farmImageRepo.UpdateAsync(farmImageId, farmImage.UrlImage);
                    }
                }

                return Ok(new { message = "Images updated successfully", urls = uploadedFiles });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while updating images: {ex.Message}");
            }
        }


    }
}