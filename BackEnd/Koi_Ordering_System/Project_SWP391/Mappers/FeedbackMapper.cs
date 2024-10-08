using Project_SWP391.Dtos.FarmImages;
using Project_SWP391.Dtos.Feedbacks;
using Project_SWP391.Model;

namespace Project_SWP391.Mappers
{
    public static class FeedbackMapper
    {
        public static FeedbackDto ToFeedbackDto(this Feedback feedbackModel)
        {
            return new FeedbackDto
            {
                FeedbackId = feedbackModel.FeedbackId,
                Rating = feedbackModel.Rating,
                Content = feedbackModel.Content,
                UrlImage = feedbackModel.UrlImage,
                UserId = feedbackModel.UserId
            };
        }
        public static Feedback ToCreateFeedbackDto(this CreateFeedbackDto feedbackDto, string userId)
        {
            return new Feedback
            {
                Rating = feedbackDto.Rating,
                UrlImage = feedbackDto.UrlImage,
                Content = feedbackDto.Content,
                UserId = userId,
            };
        }
    }
}
