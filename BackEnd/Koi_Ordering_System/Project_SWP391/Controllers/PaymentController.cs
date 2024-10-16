using Microsoft.AspNetCore.Mvc;
using Project_SWP391.Interfaces;
using Project_SWP391.Model;
using Project_SWP391.Services;

namespace Project_SWP391.Controllers
{
    [Route("api/payment")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IVNPayService _vnPayService;

        public PaymentController(IVNPayService vnPayService)
        {
            _vnPayService = vnPayService;
        }

        [HttpPost]
        public IActionResult CreatePaymentUrl([FromBody] PaymentInformationModel model)
        {
            try
            {
                var url = _vnPayService.CreatePaymentUrl(model, HttpContext);
                if (url != null)
                    return Ok(url);
                else return BadRequest(url);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("InpHandle")]
        public IActionResult InpHandle()
        {
            try
            {
                var url = _vnPayService.PaymentExecuteIpn(Request.Query);
                if (url != null)
                    return Ok(url);
                else return BadRequest(url);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("PaymentCallback")]
        public IActionResult PaymentCallback()
        {
            try
            {
                var response = _vnPayService.PaymentExecute(Request.Query);
                var quotationId = response.QuotationId;

                // Redirect to the specified URL
                return Redirect($"http://localhost:3000/pay-success/{quotationId}");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
