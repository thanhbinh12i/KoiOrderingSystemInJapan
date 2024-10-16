using Google.Apis.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Project_SWP391.Dtos.Account;
using Project_SWP391.Dtos.Bills;
using Project_SWP391.Interfaces;
using Project_SWP391.Model;
using System;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Project_SWP391.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<AppUser> _signInManager;
        public AccountController(UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);
                var appUser = new AppUser
                {
                    UserName = registerDto.UserName,
                    Email = registerDto.Email,
                    Gender = registerDto.Gender,
                    Address = registerDto.Address,
                    FullName = registerDto.FullName,
                    PhoneNumber = registerDto.PhoneNumber,
                    DateOfBirth = registerDto.DateOfBirth
                };
                var createdUser = await _userManager.CreateAsync(appUser, registerDto.Password);
                if (createdUser.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(appUser, "Customer");
                    if (roleResult.Succeeded)
                    {
                        return Ok(
                            new NewUserDto
                            {
                                UserName = appUser.UserName,
                                Email = appUser.Email,
                                Gender = appUser.Gender,
                                Address = appUser.Address,
                                FullName = appUser.FullName,
                                PhoneNumber = appUser.PhoneNumber,
                                DateOfBirth = appUser.DateOfBirth,
                                Token = await _tokenService.CreateToken(appUser)
                            }
                        );
                    }
                    else return StatusCode(500, roleResult.Errors);
                }
                else return StatusCode(500, createdUser.Errors);
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }
        [HttpPost("createStaff")]
        [Authorize(Roles = "Manager")]
        public async Task<IActionResult> CreateStaff([FromBody] RegisterDto registerDto,string role)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);
                if (!(role.Equals("DeliveringStaff") || role.Equals("ConsultingStaff") || role.Equals("SalesStaff")))
                {
                    return BadRequest("Invalid role.");
                }
                var appUser = new AppUser
                {
                    UserName = registerDto.UserName,
                    Email = registerDto.Email,
                    Gender = registerDto.Gender,
                    Address = registerDto.Address,
                    FullName = registerDto.FullName,
                    PhoneNumber = registerDto.PhoneNumber,
                    DateOfBirth = registerDto.DateOfBirth
                };
                var createdUser = await _userManager.CreateAsync(appUser, registerDto.Password);
                if (createdUser.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(appUser, role);
                    if (roleResult.Succeeded)
                    {
                        return Ok(
                            new NewUserDto
                            {
                                UserName = appUser.UserName,
                                Email = appUser.Email,
                                Gender = appUser.Gender,
                                Address = appUser.Address,
                                FullName = appUser.FullName,
                                PhoneNumber = appUser.PhoneNumber,
                                DateOfBirth = appUser.DateOfBirth,
                                Token = await _tokenService.CreateToken(appUser)
                            }
                        );
                    }
                    else return StatusCode(500, roleResult.Errors);
                }
                else return StatusCode(500, createdUser.Errors);
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            string FormatNum = FormatPhoneNumber(loginDto.Account);
            var user = await _userManager.Users
                .FirstOrDefaultAsync(x => x.UserName == loginDto.Account.ToLower()
                                       || x.Email == loginDto.Account.ToLower()
                                       || x.PhoneNumber == loginDto.Account.ToLower()
                                       || x.PhoneNumber == FormatNum.ToLower());

            if (user == null) return Unauthorized("Invalid username or email or phoneNumber");

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized("Account and/or password is invalid");

            return Ok(
                new NewUserDto
                {
                    UserName = user.UserName,
                    Email = user.Email,
                    Gender = user.Gender,
                    Address = user.Address,
                    FullName = user.FullName,
                    PhoneNumber = user.PhoneNumber,
                    DateOfBirth = user.DateOfBirth,
                    Token = await _tokenService.CreateToken(user)
                }
            );
        }
        [HttpPost("google-login")]
        public async Task<IActionResult> GoogleLogin(GoogleLoginDto googleLoginDto)
        {
            try
            {
                var payload = await GoogleJsonWebSignature.ValidateAsync(googleLoginDto.Token);
                // check exist email in system
                var user = await _userManager.FindByEmailAsync(payload.Email);
                if (user == null)
                {
                    user = new AppUser
                    {
                        UserName = Regex.Replace(payload.Name, @"[^a-zA-Z0-9]", ""),
                        Email = payload.Email,
                        FullName = (payload.FamilyName ?? "") + " " + (payload.GivenName ?? ""),
                        Gender = "",
                        Address = "",
                        PhoneNumber = "",
                        DateOfBirth = "",
                        PasswordHash = _userManager.PasswordHasher.HashPassword(user, "DefaultPassword123!")
                    };
                    var result = await _userManager.CreateAsync(user);
                    if (!result.Succeeded)
                    {
                        return BadRequest("Failed to create new user");
                    }
                    var roleResult = await _userManager.AddToRoleAsync(user, "Customer");
                    if (!roleResult.Succeeded)
                    {
                        return BadRequest("Failed to add user to role");
                    }
                }
                // login user
                await _signInManager.SignInAsync(user, isPersistent: false);
                return Ok(
                    new NewUserDto
                    {
                        UserName = user.UserName,
                        Email = user.Email,
                        Gender = user.Gender,
                        Address = user.Address,
                        FullName = user.FullName,
                        PhoneNumber = user.PhoneNumber,
                        DateOfBirth = user.DateOfBirth,
                        Token = await _tokenService.CreateToken(user)
                    }
                );
            }
            catch (InvalidJwtException)
            {
                return Unauthorized("Invalid Google token");
            }
        }
        //[HttpPut("update")]
        //public async Task<IActionResult> Update([FromBody] UpdateUserDTO updateUser, [FromHeader] string id)
        //{
        //    if (!ModelState.IsValid) return BadRequest(ModelState);

        //    var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == id);
        //    if (user == null) return NotFound("User not found");

        //    var usernameExists = await _userManager.Users.AnyAsync(x => x.UserName == updateUser.UserName && x.Id != id);
        //    if (usernameExists) return Conflict("Username already in use by another user");

        //    var emailExists = await _userManager.Users.AnyAsync(x => x.Email == updateUser.Email && x.Id != id);
        //    if (emailExists) return Conflict("Email already in use by another user");

        //    string formattedPhoneNumber = FormatPhoneNumber(updateUser.PhoneNumber);
        //    if (formattedPhoneNumber == null) return BadRequest("Invalid phone number format");

        //    if (!string.IsNullOrEmpty(updateUser.Password))
        //    {
        //        var removePasswordResult = await _userManager.RemovePasswordAsync(user);
        //        if (!removePasswordResult.Succeeded)
        //        {
        //            return BadRequest(removePasswordResult.Errors);
        //        }

        //        var addPasswordResult = await _userManager.AddPasswordAsync(user, updateUser.Password);
        //        if (!addPasswordResult.Succeeded)
        //        {
        //            return BadRequest(addPasswordResult.Errors);
        //        }
        //    }

        //    user.UserName = updateUser.UserName;
        //    user.Email = updateUser.Email;
        //    user.Gender = updateUser.Gender;
        //    user.Address = updateUser.Address;
        //    user.FullName = updateUser.FullName;
        //    user.PhoneNumber = formattedPhoneNumber;
        //    user.DateOfBirth = updateUser.DateOfBirth;

        //    var result = await _userManager.UpdateAsync(user);
        //    if (!result.Succeeded)
        //    {
        //        return BadRequest(result.Errors);
        //    }

        //    return Ok(new UpdatedUserDTO
        //    {
        //        UserName = user.UserName,
        //        Email = user.Email,
        //        FullName = user.FullName,
        //        PhoneNumber = user.PhoneNumber,
        //        Gender = user.Gender,
        //        Address = user.Address,
        //        DateOfBirth = user.DateOfBirth,
        //        Token = _tokenService.CreateToken(user)
        //    });
        //}
        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update([FromBody] UpdateUserDto updateUser, string id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null) return NotFound("User not found");

            if (!string.IsNullOrEmpty(updateUser.UserName))
            {
                var usernameExists = await _userManager.Users.AnyAsync(x => x.UserName == updateUser.UserName && x.Id != id);
                if (usernameExists) return Conflict("Username already in use by another user");
                user.UserName = updateUser.UserName;
            }

            if (!string.IsNullOrEmpty(updateUser.Email))
            {
                var emailExists = await _userManager.Users.AnyAsync(x => x.Email == updateUser.Email && x.Id != id);
                if (emailExists) return Conflict("Email already in use by another user");
                user.Email = updateUser.Email;
            }

            if (!string.IsNullOrEmpty(updateUser.PhoneNumber))
            {
                string formattedPhoneNumber = FormatPhoneNumber(updateUser.PhoneNumber);
                if (formattedPhoneNumber == null) return BadRequest("Invalid phone number format");
                user.PhoneNumber = formattedPhoneNumber;
            }

            if (!string.IsNullOrEmpty(updateUser.Gender))
            {
                user.Gender = updateUser.Gender;
            }

            if (!string.IsNullOrEmpty(updateUser.Address))
            {
                user.Address = updateUser.Address;
            }

            if (!string.IsNullOrEmpty(updateUser.FullName))
            {
                user.FullName = updateUser.FullName;
            }

            if (updateUser.DateOfBirth != default)
            {
                user.DateOfBirth = updateUser.DateOfBirth;
            }

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok(new UpdatedUserDto
            {
                UserName = user.UserName,
                Email = user.Email,
                FullName = user.FullName,
                PhoneNumber = user.PhoneNumber,
                Gender = user.Gender,
                Address = user.Address,
                DateOfBirth = user.DateOfBirth,
                Token = await _tokenService.CreateToken(user)
            });
        }
        [HttpPut("change-password/{id}")]
        public async Task<IActionResult> ChangePassword([FromBody] UpdateUserDto updateUser, string id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null) return NotFound("User not found");

            if (!string.IsNullOrEmpty(updateUser.Password))
            {
                var removePasswordResult = await _userManager.RemovePasswordAsync(user);
                if (!removePasswordResult.Succeeded)
                {
                    return BadRequest(removePasswordResult.Errors);
                }

                var addPasswordResult = await _userManager.AddPasswordAsync(user, updateUser.Password);
                if (!addPasswordResult.Succeeded)
                {
                    return BadRequest(addPasswordResult.Errors);
                }
            }

            return Ok(new UpdatedUserDto
            {
                UserName = user.UserName,
                Email = user.Email,
                FullName = user.FullName,
                PhoneNumber = user.PhoneNumber,
                Gender = user.Gender,
                Address = user.Address,
                DateOfBirth = user.DateOfBirth,
                Token = await _tokenService.CreateToken(user)
            });
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> View(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null) return NotFound("No user found");
            return Ok
                (
                    new ViewAccountDto
                    {
                        UserName = user.UserName,
                        Email = user.Email,
                        Gender = user.Gender,
                        Address = user.Address,
                        FullName = user.FullName,
                        PhoneNumber = user.PhoneNumber,
                        DateOfBirth = user.DateOfBirth
                    }
                );
        }
        [HttpGet]
        [Authorize(Roles = "Manager")]
        public async Task<IActionResult> ViewAllUser()
        {
            var users = await _userManager.Users.OfType<AppUser>().Include(u => u.Bills).ToListAsync();

            if (users == null || !users.Any())
                return NotFound("No users found");
            var userDtos = new List<ViewAllAccountDto>();

            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                if (!roles.Contains("Manager"))
                {
                    var userDto = new ViewAllAccountDto
                    {
                        UserId = user.Id,
                        UserName = user.UserName,
                        Email = user.Email,
                        Gender = user.Gender,
                        Address = user.Address,
                        FullName = user.FullName,
                        PhoneNumber = user.PhoneNumber,
                        DateOfBirth = user.DateOfBirth,
                        Role = roles.FirstOrDefault(),
                        Bills = user.Bills.Select(bill => new Bill
                        {
                            BillId = bill.BillId,
                            UserFullName = bill.UserFullName,
                            Price = bill.Price,
                            PhoneNumber = bill.PhoneNumber,
                            Email = bill.Email
                        }).ToList()
                    };
                    userDtos.Add(userDto);
                }
            }

            return Ok(userDtos);
        }
        private string FormatPhoneNumber(string phoneNumber)
        {
            if (phoneNumber.Length == 10)
            {
                return string.Format("{0}.{1}.{2}",
                                      phoneNumber.Substring(0, 4),
                                      phoneNumber.Substring(4, 3),
                                      phoneNumber.Substring(7, 3)
                                     );
            }
            return phoneNumber;
        }


    }
}
