using Microsoft.EntityFrameworkCore;
using Project_SWP391.Data;
using Project_SWP391.Dtos.Feedbacks;
using Project_SWP391.Dtos.KoiFarms;
using Project_SWP391.Interfaces;
using Project_SWP391.Model;
using static System.Net.Mime.MediaTypeNames;

namespace Project_SWP391.Repository
{
    public class FeedbackRepository : IFeedbackRepository
    {
        private readonly ApplicationDBContext _context;

        public FeedbackRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<Feedback> CreateAsync(Feedback feedbackModel)
        {
            await _context.Feedbacks.AddAsync(feedbackModel);
            await _context.SaveChangesAsync();
            return feedbackModel;
        }

        public async Task<Feedback?> DeleteAsync(int feedbackId)
        {
            var feedbackModel = await _context.Feedbacks.FirstOrDefaultAsync(x => x.FeedbackId == feedbackId);
            if (feedbackModel == null) return null;
            _context.Feedbacks.Remove(feedbackModel);
            await _context.SaveChangesAsync();
            return feedbackModel;
        }

        public async Task<List<Feedback>> GetAllAsync()
        {
            return await _context.Feedbacks.ToListAsync();
        }

        public async Task<Feedback?> GetByIdAsync(int feedbackId)
        {
            return await _context.Feedbacks.FindAsync(feedbackId);
        }

        public async Task<Feedback?> GetByUserIdAsync(string userId)
        {
            return await _context.Feedbacks.FirstOrDefaultAsync(x => x.UserId == userId);
        }

        public async Task<Feedback> UpdateAsync(int feebackId, UpdateFeedbackDto feedbackDto)
        {
            var feedbackExist = await _context.Feedbacks.FirstOrDefaultAsync(x => x.FeedbackId == feebackId);
            if (feedbackExist == null) return null;
            feedbackExist.Rating = feedbackDto.Rating;
            feedbackExist.UrlImage = feedbackDto.UrlImage;
            feedbackExist.Content = feedbackDto.Content;
            await _context.SaveChangesAsync();
            return feedbackExist;
        }
    }
}
