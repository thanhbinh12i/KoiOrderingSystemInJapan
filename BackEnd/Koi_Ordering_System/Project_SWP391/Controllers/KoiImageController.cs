using Microsoft.AspNetCore.Mvc;
using Project_SWP391.Dtos.KoiImages;
using Project_SWP391.Interfaces;
using Project_SWP391.Mappers;
using Project_SWP391.Model;

namespace Project_SWP391.Controllers
{
    [Route("api/koi-image")]
    [ApiController]
    public class KoiImageController : ControllerBase
    {
        private readonly IKoiImageRepository _imageRepo;
        private readonly IKoiRepository _koiRepo;
        private readonly IWebHostEnvironment _environment;
        public KoiImageController(IKoiImageRepository imageRepo, IKoiRepository koiRepo, IWebHostEnvironment environment)
        {
            _imageRepo = imageRepo;
            _koiRepo = koiRepo;
            _environment = environment;

        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var koiImages = await _imageRepo.GetAllAsync();
            var koiImageDto = koiImages.Select(i => i.ToKoiImageDtoFromKoiImage());

            return Ok(koiImageDto);
        }
        [HttpGet("view-by-id/{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var koiImage = await _imageRepo.GetByIdAsync(id);

            if (koiImage == null)
            {
                return NotFound("No image found");
            }

            var koiImageDto = koiImage.ToKoiImageDtoFromKoiImage();

            return Ok(koiImageDto);
        }

        [HttpGet("view-by-koi-id/{koiId}")]
        public async Task<IActionResult> GetByKoiId([FromRoute] int koiId)
        {
            var koiImage = await _imageRepo.GetByKoiIdAsync(koiId);

            if (koiImage == null)
            {
                return NotFound("No image found");
            }

            var koiImageDto = koiImage.ToKoiImageDtoFromKoiImage();

            return Ok(koiImageDto);
        }


        //[HttpPost("create/{koiId}")]
        //public async Task<IActionResult> Create([FromBody] CreateKoiImageDto createImage, [FromRoute] int koiId)
        //{
        //    if (!await _koiRepo.KoiExists(koiId))
        //    {
        //        return BadRequest("Koi does not exist");
        //    }

        //    if (createImage == null)
        //    {
        //        return BadRequest("Koi image data is missing.");
        //    }

        //    var imageModel = createImage.ToKoiImageFromCreateDto(koiId);

        //    await _imageRepo.CreateAsync(imageModel);

        //    return CreatedAtAction(nameof(GetById), new { id = imageModel.ImageId }, imageModel);
        //}
        [HttpPost("upload/{koiId}")]
        public async Task<IActionResult> UploadImages(int koiId, [FromForm] List<IFormFile> files)
        {
            try
            {
                if (!await _koiRepo.KoiExists(koiId))
                {
                    return BadRequest("Koi does not exist");
                }

                if (files == null || !files.Any())
                {
                    return BadRequest("No files uploaded.");
                }

                var uploadedFiles = new List<string>();


                string webRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
                var uploadPath = Path.Combine(webRootPath, "uploads", "koi");

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

                        var relativePath = $"/uploads/koi/{fileName}";
                        uploadedFiles.Add(relativePath);

                        var koiImage = new KoiImage
                        {
                            UrlImage = fileName,
                            KoiId = koiId
                        };
                        await _imageRepo.CreateAsync(koiImage);
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
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateKoiImageDto updateImage)
        {
            if (updateImage == null)
            {
                return BadRequest("Koi image data is missing");
            }

            var imageModel = await _imageRepo.UpdateAsync(id, updateImage);

            if (imageModel == null)
            {
                return NotFound();
            }

            return Ok(imageModel);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var imageModel = await _imageRepo.DeleteAsync(id);

            if (imageModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
