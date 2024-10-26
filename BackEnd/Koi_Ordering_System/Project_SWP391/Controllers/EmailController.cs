using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using System.Net;
using Project_SWP391.Dtos.Email;
using Project_SWP391.Services;
using Project_SWP391.Interfaces;

namespace Project_SWP391.Controllers
{
    [Route("api/email")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IEmailService _emailService;

        public EmailController(IEmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendEmail([FromBody] EmailDTO request)
        {
            try
            {
                var result = await _emailService.SendEmailAsync(request);
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
    }
}
