using Project_SWP391.Model;

namespace Project_SWP391.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}
