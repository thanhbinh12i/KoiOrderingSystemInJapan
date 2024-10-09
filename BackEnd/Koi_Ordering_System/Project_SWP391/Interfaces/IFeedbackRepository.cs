using Project_SWP391.Dtos.Feedbacks;
using Project_SWP391.Dtos.Ratings;
using Project_SWP391.Model;

namespace Project_SWP391.Interfaces
{
    public interface IFeedbackRepository
    {
        Task<List<Feedback>> GetAllAsync();
        Task<Feedback?> GetByIdAsync(int feedbackId);
        Task<Feedback?> GetByUserIdAsync(string userId);
        Task<Feedback?> DeleteAsync(int feedbackId);
        Task<Feedback> CreateAsync(Feedback feedbackModel);
        Task<Feedback> UpdateAsync(int feebackId, UpdateFeedbackDto feedbackDto);
    }
}
