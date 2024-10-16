using Microsoft.EntityFrameworkCore;
using Project_SWP391.Data;
using Project_SWP391.Dtos.FarmImages;
using Project_SWP391.Interfaces;
using Project_SWP391.Model;

namespace Project_SWP391.Repository
{
    public class FarmImageRepository : IFarmImageRepository
    {
        private readonly ApplicationDBContext _context;

        public FarmImageRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<FarmImage> CreateAsync(FarmImage farmImageModel)
        {
            await _context.FarmImages.AddAsync(farmImageModel);
            await _context.SaveChangesAsync();
            return farmImageModel;
        }
        public async Task<FarmImage?> DeleteAsync(int imageId)
        {
            var farmImageModel = await _context.FarmImages.FirstOrDefaultAsync(x => x.FarmImageId == imageId);
            if (farmImageModel == null) return null;
            _context.FarmImages.Remove(farmImageModel);
            await _context.SaveChangesAsync();
            return farmImageModel;
        }

        public async Task<List<FarmImage>> GetAllAsync()
        {
            return await _context.FarmImages.ToListAsync();
        }

        public async Task<FarmImage?> GetByIdAsync(int imageId)
        {
            return await _context.FarmImages.FindAsync(imageId);
        }

        public async Task<FarmImage> UpdateAsync(int imageId, string UrlImage)
        {
            var farmImageExist = await _context.FarmImages.FirstOrDefaultAsync(x => x.FarmImageId == imageId);
            if (farmImageExist == null) return null;
            farmImageExist.UrlImage = UrlImage;
            await _context.SaveChangesAsync();
            return farmImageExist;
        }
        public Task<bool> ExistFarmImage(int farmImageId)
        {
            return _context.FarmImages.AnyAsync(s => s.FarmImageId == farmImageId);
        }
    }
}

