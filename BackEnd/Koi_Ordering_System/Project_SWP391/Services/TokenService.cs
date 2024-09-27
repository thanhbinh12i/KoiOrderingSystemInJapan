using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Project_SWP391.Interfaces;
using Project_SWP391.Model;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Project_SWP391.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;
        private readonly SymmetricSecurityKey _key;
        private readonly UserManager<AppUser> _userManager;  // Inject UserManager
        public TokenService(IConfiguration config, UserManager<AppUser> userManager)
        {
            _config = config;
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:SigningKey"]));
            _userManager = userManager;
        }
        public async Task<string> CreateToken(AppUser user)
        {
            // Basic claims
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.GivenName, user.UserName),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.FullName),
                new Claim(JwtRegisteredClaimNames.Gender, user.Gender),
                new Claim(JwtRegisteredClaimNames.NameId, user.Id),
                new Claim(JwtRegisteredClaimNames.Birthdate, user.DateOfBirth.ToString())
            };

            // Retrieve roles from UserManager
            var roles = await _userManager.GetRolesAsync(user);

            // Add role claims
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds,
                Issuer = _config["JWT:Issuer"],
                Audience = _config["JWT:Audience"]
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
