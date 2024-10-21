using Microsoft.EntityFrameworkCore;
using Project_SWP391.Data;
using Project_SWP391.Dtos.BillDetails;
using Project_SWP391.Dtos.Deliveries;
using Project_SWP391.Dtos.DeliveryStatuses;
using Project_SWP391.Interfaces;
using Project_SWP391.Model;

namespace Project_SWP391.Repository
{
    public class DeliveryStatusRepository : IDeliveryStatusRepository
    {
        private readonly ApplicationDBContext _context;

        public DeliveryStatusRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<DeliveryStatus> CreateAsync(DeliveryStatus deliveryStatusModel)
        {
            await _context.DeliveryStatuses.AddAsync(deliveryStatusModel);
            await _context.SaveChangesAsync();

            return deliveryStatusModel;
        }

        public async Task<DeliveryStatus> DeleteAsync(int deliveryStatusId)
        {
            var deliveryStatusModel = await _context.DeliveryStatuses.FirstOrDefaultAsync(d => d.DeliveryStatusId == deliveryStatusId);

            if (deliveryStatusModel == null)
            {
                return null;
            }

            _context.DeliveryStatuses.Remove(deliveryStatusModel);
            _context.SaveChanges();

            return deliveryStatusModel;
        }

        public async Task<List<DeliveryStatus>> GetAllAsync()
        {
            return await _context.DeliveryStatuses.ToListAsync();
        }

        public async Task<DeliveryStatus?> GetByIdAsync(int deliveryStatusId)
        {
            return await _context.DeliveryStatuses.FirstOrDefaultAsync(d => d.DeliveryStatusId == deliveryStatusId);
        }

        public async Task<List<DeliveryStatus?>> GetByUserId(string userId)
        {
            return await (from d in _context.DeliveryStatuses
                          join b in _context.Bills on d.BillId equals b.BillId
                          where b.UserId == userId
                          select d)
          .Distinct()
          .ToListAsync();
        }

        public async Task<DeliveryStatus> UpdateAsync(int deliveryStatusId, UpdateDeliveryStatusDto updateDeliveryStatusModel)
        {
            var deliveryStatusModel = await _context.DeliveryStatuses.FirstOrDefaultAsync(d => d.DeliveryStatusId == deliveryStatusId);

            if (deliveryStatusModel == null)
            {
                return null;
            }

            deliveryStatusModel.DeliveryAddress = updateDeliveryStatusModel.DeliveryAddress;
            deliveryStatusModel.DeliveryStatusText = updateDeliveryStatusModel.DeliveryStatusText;
            deliveryStatusModel.EstimatedDate = updateDeliveryStatusModel.EstimatedDate;

            await _context.SaveChangesAsync();

            return deliveryStatusModel;
        }
    }
}
