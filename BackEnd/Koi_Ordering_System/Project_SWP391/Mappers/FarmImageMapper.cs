//using Project_SWP391.Dtos.FarmImages;
//using Project_SWP391.Model;

//namespace Project_SWP391.Mappers
//{
//    public static class FarmImageMapper
//    {
//        public static FarmImageDto ToFarmImageDto(this FarmImage farmImageModel)
//        {
//            return new FarmImageDto
//            {
//                ImageId = farmImageModel.ImageId,
//                Url = farmImageModel.Url,
//                FarmId = farmImageModel.FarmId,
//            };
//        }
//        public static FarmImage ToCreateFarmImageDto(this CreateFarmImageDto farmImageDto, int farmId)
//        {
//            return new FarmImage
//            {
//                Url = farmImageDto.Url,
//                FarmId = farmId
//            };
//        }
//    }
//}
