using Project_SWP391.Dtos.Email;
using Project_SWP391.Interfaces;
using System.Net.Mail;
using System.Net;

namespace Project_SWP391.Services
{
    public class EmailService : IEmailService
    {
        private readonly string _emailAddress;
        private readonly string _emailPassword;

        public EmailService()
        {
            DotNetEnv.Env.Load();
            _emailAddress = Environment.GetEnvironmentVariable("EMAIL_ADDRESS");
            _emailPassword = Environment.GetEnvironmentVariable("EMAIL_PASSWORD");
        }
        public async Task<bool> SendEmailAsync(EmailDTO emailDTO)
        {
            if (string.IsNullOrEmpty(_emailAddress) || string.IsNullOrEmpty(_emailPassword))
            {
                throw new Exception("Email credentials are not set in the environment variables.");
            }

            var fromAddress = new MailAddress(_emailAddress, "Koi Day Ne");
            var toAddress = new MailAddress(emailDTO.ToEmail);
            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromAddress.Address, _emailPassword)
            };

            using (var mailMessage = new MailMessage(fromAddress, toAddress)
            {
                Subject = emailDTO.Subject,
                Body = emailDTO.Message,
                IsBodyHtml = true
            })
            {
                try
                {
                    await smtp.SendMailAsync(mailMessage);
                    return true;
                }
                catch (SmtpException smtpEx)
                {
                    Console.WriteLine($"SMTP Error: {smtpEx.Message}, Status Code: {smtpEx.StatusCode}");
                    throw new Exception($"SMTP Error: {smtpEx.Message}, Status Code: {smtpEx.StatusCode}");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error: {ex.Message}");
                    throw new Exception($"Error: {ex.Message}");
                }
            }
        }
    }
}
