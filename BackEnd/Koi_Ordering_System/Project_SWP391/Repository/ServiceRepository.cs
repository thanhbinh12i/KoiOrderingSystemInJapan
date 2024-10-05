using Microsoft.EntityFrameworkCore;
using Project_SWP391.Data;
using Project_SWP391.Dtos.Services;
using Project_SWP391.Interfaces;
using Project_SWP391.Model;

namespace Project_SWP391.Repository
{
    public class ServiceRepository : IServiceRepository
    {
        private readonly ApplicationDBContext _context;
        public ServiceRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Service> CreateAsync(Service service)
        {
            await _context.Services.AddAsync(service);
            await _context.SaveChangesAsync();

            return service;
        }

        public async Task<Service?> DeleteAsync(int id)
        {
            var serviceModel = await _context.Services.FindAsync(id);

            if(serviceModel == null)
            {
                return null;
            }

            _context.Services.Remove(serviceModel);
            _context.SaveChanges();

            return serviceModel;
        }

        public async Task<List<Service>> GetAllAsync()
        {
            return await _context.Services.ToListAsync();
        }

        public async Task<Service?> GetByIdAsync(int id)
        {
            var service = await _context.Services.FirstOrDefaultAsync(s => s.ServiceId == id);

            return service;
        }

        public async Task<Service?> GetByNameAsync(string name)
        {
            var service = await _context.Services.FirstOrDefaultAsync(s => s.ServiceName == name);

            return service;
        }

        public async Task<Service?> UpdateAsync(UpdateServiceDto updateService, int id)
        {
            var serviceModel = await _context.Services.FirstOrDefaultAsync(s => s.ServiceId == id);

            if(serviceModel == null)
            {
                return null;
            }

            serviceModel.ServiceName = updateService.ServiceName;
            serviceModel.Price = updateService.Price;
            serviceModel.Detail = updateService.Detail;

            await _context.SaveChangesAsync();

            return serviceModel;
        }
    }
}
