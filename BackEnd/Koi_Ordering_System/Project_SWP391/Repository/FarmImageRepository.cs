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

        public Task<FarmImage?> DeleteAsync(int imageId)
        {
            throw new NotImplementedException();
        }

        public Task<List<FarmImage>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<FarmImage?> GetByIdAsync(int imageId)
        {
            throw new NotImplementedException();
        }

        public Task<FarmImage> UpdateAsync(int imageId, UpdateFarmImageDto farmImageDto)
        {
            throw new NotImplementedException();
        }

        //    public async Task<FarmImage?> DeleteAsync(int imageId)
        //    {
        //        var farmImageModel = await _context.FarmImages.FirstOrDefaultAsync(x => x.fa == id);
        //        if (commentModel == null) return null;
        //        _context.Comments.Remove(commentModel);
        //        await _context.SaveChangesAsync();
        //        return commentModel;
        //    }

        //    public async Task<List<FarmImage>> GetAllAsync()
        //    {
        //        return await _context.Comments.ToListAsync();
        //    }

        //    public async Task<FarmImage?> GetByIdAsync(int imageId)
        //    {
        //        return await _context.Comments.FindAsync(id);
        //    }

        //    public async Task<FarmImage> UpdateAsync(int imageId, UpdateFarmImageDto farmImageDto)
        //    {
        //        var existComment = await _context.Comments.FirstOrDefaultAsync(x => x.Id == id);
        //        if (existComment == null) return null;
        //        existComment.Title = commentDto.Title;
        //        existComment.Content = commentDto.Content;
        //        await _context.SaveChangesAsync();
        //        return existComment;
        //    }
        //}
    }
}
