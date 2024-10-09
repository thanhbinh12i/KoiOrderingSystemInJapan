using Project_SWP391.Dtos.FarmImages;
using Project_SWP391.Model;

namespace Project_SWP391.Interfaces
{
    public interface IFarmImageRepository
    {
        Task<List<FarmImage>> GetAllAsync();
        Task<FarmImage?> GetByIdAsync(int imageId);
        Task<FarmImage?> DeleteAsync(int imageId);
        Task<FarmImage> CreateAsync(FarmImage farmImageModel);
        Task<FarmImage> UpdateAsync(int imageId, string urlImage);
        Task<bool> ExistFarmImage(int farmImageId);

    }
}
