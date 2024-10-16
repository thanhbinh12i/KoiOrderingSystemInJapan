using Project_SWP391.Dtos.KoiImages;
using Project_SWP391.Model;

namespace Project_SWP391.Interfaces
{
    public interface IKoiImageRepository
    {
        Task<List<KoiImage>> GetAllAsync();
        Task<KoiImage?> GetByIdAsync(int id);
        Task<KoiImage?> GetByKoiIdAsync(int id);
        Task<KoiImage?> CreateAsync(KoiImage koiImage);
        Task<KoiImage?> UpdateAsync(int id, UpdateKoiImageDto updateImage);
        Task<KoiImage?> DeleteAsync(int id);
    }
}
