using Microsoft.EntityFrameworkCore;
using Project_SWP391.Data;
using Project_SWP391.Dtos.KoiImages;
using Project_SWP391.Interfaces;
using Project_SWP391.Model;

namespace Project_SWP391.Repository
{
    public class KoiImageRepository : IKoiImageRepository
    {
        private readonly ApplicationDBContext _context;
        public KoiImageRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<KoiImage?> CreateAsync(KoiImage koiImage)
        {
            await _context.KoiImages.AddAsync(koiImage);
            await _context.SaveChangesAsync();

            return koiImage;
        }

        public async Task<KoiImage?> DeleteAsync(int id)
        {
            var koiImage = await _context.KoiImages.FindAsync(id);

            if (koiImage == null)
            {
                return null;
            }

            _context.KoiImages.Remove(koiImage);
            await _context.SaveChangesAsync();

            return koiImage;
        }

        public async Task<List<KoiImage>> GetAllAsync()
        {
            return await _context.KoiImages.ToListAsync();
        }

        public async Task<KoiImage?> GetByIdAsync(int id)
        {
            return await _context.KoiImages.FirstOrDefaultAsync(i => i.KoiImageId == id);
        }

        public async Task<KoiImage?> GetByKoiIdAsync(int id)
        {
            return await _context.KoiImages.FirstOrDefaultAsync(i => i.KoiId == id);
        }

        public async Task<KoiImage?> UpdateAsync(int id, UpdateKoiImageDto updateImage)
        {
            var imageModel = await _context.KoiImages.FirstOrDefaultAsync(i => i.KoiImageId == id);

            if (imageModel == null)
            {
                return null;
            }

            imageModel.UrlImage = updateImage.Url;
            imageModel.KoiId = updateImage.KoiId;

            return imageModel;
        }
    }
}
