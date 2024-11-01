using Azure.Core;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using Project_SWP391.Dtos.Account;
using Project_SWP391.Dtos.Bills;
using Project_SWP391.Dtos.Email;
using Project_SWP391.Interfaces;
using Project_SWP391.Model;
using Project_SWP391.Services;
using System;
using System.Data;
using System.Net;
using System.Security.Cryptography;
using System.Text;
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
        private readonly IEmailService _emailService;
        public AccountController(UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signInManager, IEmailService emailService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
            _emailService = emailService;
        }

        //[HttpPost("register")]
        //public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        //{
        //    try
        //    {
        //        if (!ModelState.IsValid) return BadRequest(ModelState);
        //        var appUser = new AppUser
        //        {
        //            UserName = registerDto.UserName,
        //            Email = registerDto.Email,
        //            Gender = registerDto.Gender,
        //            Address = registerDto.Address,
        //            FullName = registerDto.FullName,
        //            PhoneNumber = registerDto.PhoneNumber,
        //            DateOfBirth = registerDto.DateOfBirth
        //        };
        //        var createdUser = await _userManager.CreateAsync(appUser, registerDto.Password);
        //        if (createdUser.Succeeded)
        //        {
        //            var roleResult = await _userManager.AddToRoleAsync(appUser, "Customer");
        //            if (roleResult.Succeeded)
        //            {
        //                return Ok(
        //                    new NewUserDto
        //                    {
        //                        UserName = appUser.UserName,
        //                        Email = appUser.Email,
        //                        Gender = appUser.Gender,
        //                        Address = appUser.Address,
        //                        FullName = appUser.FullName,
        //                        PhoneNumber = appUser.PhoneNumber,
        //                        DateOfBirth = appUser.DateOfBirth,
        //                        Token = await _tokenService.CreateToken(appUser)
        //                    }
        //                );
        //            }
        //            else return StatusCode(500, roleResult.Errors);
        //        }
        //        else return StatusCode(500, createdUser.Errors);
        //    }
        //    catch (Exception e)
        //    {
        //        return StatusCode(500, e);
        //    }
        //}

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
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
                if (!createdUser.Succeeded)
                {
                    return StatusCode(500, createdUser.Errors);
                }

                var token = await _userManager.GenerateEmailConfirmationTokenAsync(appUser);
                var emailModel = new EmailDTO
                {
                    ToEmail = registerDto.Email,
                    Subject = "Comfirm email token",
                    Message = $"Here is your email confirmation token: {token}"
                };

                await _emailService.SendEmailAsync(emailModel);

                return Ok($"{token}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("createStaff")]
        [Authorize(Roles = "Manager")]
        public async Task<IActionResult> CreateStaff([FromBody] RegisterDto registerDto, string role)
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

            if (!user.EmailConfirmed)
            {
                return Unauthorized("Email not confirmed. Please check your inbox for a confirmation email.");
            }

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

                    user.EmailConfirmed = true;
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

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update([FromBody] UpdateUserDto updateUser, string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

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


        //[HttpPut("update/{id}")]
        //public async Task<IActionResult> Update([FromBody] UpdateUserDto updateUser, string id)
        //{
        //    if (!ModelState.IsValid) return BadRequest(ModelState);

        //    var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == id);
        //    if (user == null) return NotFound("User not found");


        //    await UpdateUserFieldsAsync(updateUser, user, id);
        //    var result = await _userManager.UpdateAsync(user);

        //    if (!result.Succeeded)
        //    {
        //        return BadRequest(result.Errors);
        //    }

        //    return Ok(CreateUpdatedUserDto(user));
        //}



        //private async Task UpdateUserFieldsAsync(UpdateUserDto updateUser, AppUser user, string currentUserId)
        //{
        //    if (!string.IsNullOrEmpty(updateUser.UserName))
        //    {
        //        if (await IsUsernameTakenAsync(updateUser.UserName, currentUserId))
        //            throw new("Username already in use by another user");
        //        user.UserName = updateUser.UserName;
        //    }

        //    if (!string.IsNullOrEmpty(updateUser.Email))
        //    {
        //        if (await IsEmailTakenAsync(updateUser.Email, currentUserId))
        //            throw new("Email already in use by another user");
        //        user.Email = updateUser.Email;
        //    }

        //    if (!string.IsNullOrEmpty(updateUser.PhoneNumber))
        //    {
        //        var formattedPhoneNumber = FormatPhoneNumber(updateUser.PhoneNumber);
        //        if (formattedPhoneNumber == null)
        //            throw new("Invalid phone number format");
        //        user.PhoneNumber = formattedPhoneNumber;
        //    }

        //    user.Gender = updateUser.Gender ?? user.Gender;
        //    user.Address = updateUser.Address ?? user.Address;
        //    user.FullName = updateUser.FullName ?? user.FullName;
        //    user.DateOfBirth = updateUser.DateOfBirth != default ? updateUser.DateOfBirth : user.DateOfBirth;
        //}

        //private async Task<bool> IsUsernameTakenAsync(string username, string currentUserId)
        //{
        //    return await _userManager.Users.AnyAsync(x => x.UserName == username && x.Id != currentUserId);
        //}

        //private async Task<bool> IsEmailTakenAsync(string email, string currentUserId)
        //{
        //    return await _userManager.Users.AnyAsync(x => x.Email == email && x.Id != currentUserId);
        //}

        //private UpdatedUserDto CreateUpdatedUserDto(AppUser user)
        //{
        //    return new UpdatedUserDto
        //    {
        //        UserName = user.UserName,
        //        Email = user.Email,
        //        FullName = user.FullName,
        //        PhoneNumber = user.PhoneNumber,
        //        Gender = user.Gender,
        //        Address = user.Address,
        //        DateOfBirth = user.DateOfBirth,
        //        Token = _tokenService.CreateToken(user).Result
        //    };
        //}

        [HttpGet("{id}")]
        public async Task<IActionResult> View(string id)
        {
            var user = await _userManager.Users
            .Include(u => u.Feedback)
            .Include(u => u.Bills)
            .FirstOrDefaultAsync(u => u.Id == id);
            if (user == null) return NotFound("No user found");
            return Ok
                (
                    new ViewAllAccountDto
                    {
                        UserId = user.Id,
                        UserName = user.UserName,
                        Email = user.Email,
                        Gender = user.Gender,
                        Address = user.Address,
                        FullName = user.FullName,
                        PhoneNumber = user.PhoneNumber,
                        DateOfBirth = user.DateOfBirth,
                        Feedbacks = user.Feedback.Select(fb => new Feedback
                        {
                            FeedbackId = fb.FeedbackId,
                            Rating = fb.Rating,
                            UrlImage = fb.UrlImage,
                            Content = fb.Content,
                        }).ToList(),
                        Bills = user.Bills.Select(bill => new Bill
                        {
                            BillId = bill.BillId,
                            UserFullName = bill.UserFullName,
                            Email = bill.Email,
                            PhoneNumber = bill.PhoneNumber,
                            KoiPrice = bill.KoiPrice,
                            TourPrice = bill.TourPrice,
                            TotalPrice = bill.TotalPrice,
                            PaymentDate = bill.PaymentDate
                        }).ToList()
                    }
                );
        }
        [HttpGet("view-staff{id}")]
        [Authorize(Roles = "Manager")]
        public async Task<IActionResult> ViewStaff(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            var roles = await _userManager.GetRolesAsync(user);
            if (user == null || roles.Contains("Customer") || roles.Contains("Manager") || roles.IsNullOrEmpty()) return NotFound("No user found");
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
        [HttpGet("view-all-user")]
        public async Task<IActionResult> ViewAllUser()
        {
            var users = await _userManager.Users.OfType<AppUser>().Include(u=>u.Feedback).Include(u => u.Bills).ToListAsync();

            if (users == null || !users.Any())
                return NotFound("No users found");
            var userDtos = new List<ViewAllAccountDto>();

            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                if (roles.Contains("Customer") || roles.IsNullOrEmpty())
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
                        Feedbacks = user.Feedback.Select(fb => new Feedback
                        {
                            FeedbackId = fb.FeedbackId,
                            Rating = fb.Rating,
                            UrlImage = fb.UrlImage,
                            Content = fb.Content,

                        }).ToList(),
                        Bills = user.Bills.Select(bill => new Bill
                        {
                            BillId = bill.BillId,
                            UserFullName = bill.UserFullName,
                            Email = bill.Email,
                            PhoneNumber = bill.PhoneNumber,
                            KoiPrice = bill.KoiPrice,
                            TourPrice = bill.TourPrice,
                            TotalPrice = bill.TotalPrice,
                            PaymentDate = bill.PaymentDate
                        }).ToList()
                    };
                    userDtos.Add(userDto);
                }
            }

            return Ok(userDtos);
        }
        [HttpGet("view-all-staff")]
        [Authorize(Roles = "Manager")]
        public async Task<IActionResult> ViewAllStaff()
        {
            var users = await _userManager.Users.OfType<AppUser>().Include(u => u.Bills).ToListAsync();

            if (users == null || !users.Any())
                return NotFound("No users found");
            var userDtos = new List<ViewAllAccountDto>();

            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                if (roles.Contains("DeliveringStaff") || roles.Contains("ConsultingStaff") || roles.Contains("SalesStaff"))
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
                            Email = bill.Email,
                            PhoneNumber = bill.PhoneNumber,
                            KoiPrice = bill.KoiPrice,
                            TourPrice = bill.TourPrice,
                            TotalPrice = bill.TotalPrice,
                            PaymentDate = bill.PaymentDate
                        }).ToList()
                    };
                    userDtos.Add(userDto);
                }
            }

            return Ok(userDtos);
        }

        [HttpPut("change-password/{id}")]
        public async Task<IActionResult> ChangePassword(string id, ChangePasswordDto password)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null)
            {
                return NotFound("User not found");
            }

            if (!string.IsNullOrEmpty(password.OldPassword))
            {
                if (!await _userManager.CheckPasswordAsync(user, password.OldPassword))
                {
                    return BadRequest("Password is not incorrect!");
                }

                if(password.NewPassword != password.ConfirmPassword)
                {
                    return BadRequest("Two passwords are not match!");
                }

                var removePasswordResult = await _userManager.RemovePasswordAsync(user);
                if (!removePasswordResult.Succeeded)
                {
                    return BadRequest(removePasswordResult.Errors);
                }

                var addPasswordResult = await _userManager.AddPasswordAsync(user, password.NewPassword);
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

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordEmailDto resetEmail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (resetEmail == null || string.IsNullOrWhiteSpace(resetEmail.ToEmail))
            {
                return BadRequest("Email address is required.");
            }

            var user = await _userManager.FindByEmailAsync(resetEmail.ToEmail);
            if (user == null)
            {
                return NotFound("No user found with that email address.");
            }


            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            if (string.IsNullOrWhiteSpace(token))
            {
                return StatusCode(500, "Failed to generate password reset token.");
            }

            var emailModel = new EmailDTO
            {
                ToEmail = resetEmail.ToEmail,
                Subject = "Password Reset",
                Message = $"Here is your reset code: {token}",
            };

            try
            {
                var result = await _emailService.SendEmailAsync(emailModel);
                if (result)
                    return Ok("Email sent successfully.");
                else
                    return StatusCode(500, "Failed to send email.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordEmailDto resetEmail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByEmailAsync(resetEmail.Email);

            if (user == null)
            {
                return BadRequest("Invalid request");
            }

            var result = await _userManager.ResetPasswordAsync(user, resetEmail.Token, resetEmail.Password);

            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description);
                return BadRequest(result.Errors);
            }

            return Ok("Password has reset successfully!");
        }

        [HttpGet("confirm-email")]
        public async Task<IActionResult> ConfirmEmail(string email, string code)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(code))
            {
                return BadRequest("Invalid email confirmation request.");
            }

            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return NotFound("No user found!");
            }

            var result = await _userManager.ConfirmEmailAsync(user, code);
            if (!result.Succeeded)
            {
                return BadRequest("Email confirmation failed!");
            }

            var roleResult = await _userManager.AddToRoleAsync(user, "Customer");
            if (!roleResult.Succeeded)
            {
                return StatusCode(500, roleResult.Errors);
            }

            return Ok(new NewUserDto
            {
                UserName = user.UserName,
                Email = user.Email,
                Gender = user.Gender,
                Address = user.Address,
                FullName = user.FullName,
                PhoneNumber = user.PhoneNumber,
                DateOfBirth = user.DateOfBirth,
                Token = await _tokenService.CreateToken(user),
            });
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
