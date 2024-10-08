using Project_SWP391.Dtos.Ratings;
using Project_SWP391.Dtos.TourDestinations;
using Project_SWP391.Model;

namespace Project_SWP391.Mappers
{
    public static class RatingMapper
    {
        public static RatingDto ToRatingDto(this Rating ratingModel)
        {
            return new RatingDto
            {
                FarmId = ratingModel.FarmId,
                UserId = ratingModel.UserId,
                Rate = ratingModel.Rate,
                Content = ratingModel.Content
            };
        }
        public static Rating ToRatingFromToCreateDto(this CreateRatingDto ratingDto, int farmId, string userId)
        {
            return new Rating
            {
                FarmId = farmId,
                UserId = userId,
                Content = ratingDto.Content,
                Rate = ratingDto.Rate
            };
        }
    }
}
