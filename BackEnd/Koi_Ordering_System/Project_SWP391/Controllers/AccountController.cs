﻿using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_SWP391.Dtos.Account;
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
                    FullName  = registerDto.FullName,
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
                                Token = _tokenService.CreateToken(appUser)
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
                    Token = _tokenService.CreateToken(user)
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
                    // Nếu email không tồn tại, tạo tài khoản mới cho người dùng
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
                        Token = _tokenService.CreateToken(user)
                    }
                );
            }
            catch (InvalidJwtException)
            {
                return Unauthorized("Invalid Google token");
            }
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
