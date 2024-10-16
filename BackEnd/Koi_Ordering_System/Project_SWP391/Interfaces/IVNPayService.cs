using Project_SWP391.Model;

namespace Project_SWP391.Interfaces
{
    public interface IVNPayService
    {
        string CreatePaymentUrl(PaymentInformationModel model, HttpContext context);
        PaymentResponseModel PaymentExecute(IQueryCollection collections);
        ErrorViewModel PaymentExecuteIpn(IQueryCollection collections);
    }
}
