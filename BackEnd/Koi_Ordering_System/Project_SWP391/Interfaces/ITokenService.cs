using Project_SWP391.Model;

namespace Project_SWP391.Interfaces
{
    public interface ITokenService
    {
        Task<String> CreateToken(AppUser user);
    }
}
