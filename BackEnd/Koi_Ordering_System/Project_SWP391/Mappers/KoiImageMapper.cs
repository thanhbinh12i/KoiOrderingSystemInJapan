using Project_SWP391.Dtos.KoiImages;
using Project_SWP391.Model;

namespace Project_SWP391.Mappers
{
    public static class KoiImageMapper
    {
        public static KoiImage ToKoiImageFromCreateDto(this CreateKoiImageDto createImage, int koiId)
        {
            return new KoiImage
            {
                UrlImage = createImage.Url,
                KoiId = koiId,
            };
        }
        public static KoiImageDto ToKoiImageDtoFromKoiImage(this KoiImage koiImage)
        {
            return new KoiImageDto
            {
                ImageId = koiImage.KoiImageId,
                Url = koiImage.UrlImage,
                KoiId = koiImage.KoiId
            };
        }
    }
}
