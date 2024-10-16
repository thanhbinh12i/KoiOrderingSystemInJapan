using Microsoft.EntityFrameworkCore;
using Project_SWP391.Data;
using Project_SWP391.Dtos.Deliveries;
using Project_SWP391.Interfaces;
using Project_SWP391.Model;

namespace Project_SWP391.Repository
{
    public class DeliveryRepository : IDeliveryRepository
    {
        private readonly ApplicationDBContext _context;
        public DeliveryRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<Delivery> CreateAsync(Delivery deliveryModel)
        {
            await _context.Deliveries.AddAsync(deliveryModel);
            await _context.SaveChangesAsync();

            return deliveryModel;
        }

        public async Task<Delivery> DeleteAsync(int deliveryId)
        {
            var deliveryModel = await _context.Deliveries.FirstOrDefaultAsync(d => d.DeliveryId == deliveryId);

            if (deliveryModel == null)
            {
                return null;
            }

            _context.Deliveries.Remove(deliveryModel);
            _context.SaveChanges();

            return deliveryModel;
        }

        public async Task<bool> DeliveryExist(int deliveryId)
        {
            return await _context.Deliveries.AnyAsync(d => d.DeliveryId == deliveryId);
        }

        public async Task<List<Delivery>> GetAllAsync()
        {
            return await _context.Deliveries.ToListAsync();
        }

        public async Task<Delivery?> GetByIdAsync(int deliveryId)
        {
            return await _context.Deliveries.FirstOrDefaultAsync(d => d.DeliveryId == deliveryId);
        }

        public async Task<Delivery> UpdateAsync(int deliveryId, UpdateDeliveryDto updateDelivery)
        {
            var deliveryModel = await _context.Deliveries.FirstOrDefaultAsync(d => d.DeliveryId == deliveryId);

            if (deliveryModel == null)
            {
                return null;
            }

            deliveryModel.DeliveryType = updateDelivery.DeliveryType;
            deliveryModel.DeliveryFee = updateDelivery.DeliveryFee;
            deliveryModel.DeliveryDescription = updateDelivery.DeliveryDescription;

            await _context.SaveChangesAsync();

            return deliveryModel;
        }
    }
}
