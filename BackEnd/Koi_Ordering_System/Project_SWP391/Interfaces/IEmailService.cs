using Project_SWP391.Dtos.Email;
using Project_SWP391.Model;

namespace Project_SWP391.Interfaces
{
    public interface IEmailService
    {
        Task<bool> SendEmailAsync(EmailDTO emailDTO);
    }
}
