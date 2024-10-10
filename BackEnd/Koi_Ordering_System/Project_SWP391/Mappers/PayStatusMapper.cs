using Project_SWP391.Dtos.Feedbacks;
using Project_SWP391.Dtos.PayStatus;
using Project_SWP391.Model;

namespace Project_SWP391.Mappers
{
    public static class PayStatusMapper
    {
        public static PayStatusDto ToPayStatusDto(this PayStatus payStatusModel)
        {
            return new PayStatusDto
            {
                PayId = payStatusModel.PayId,
                PaymentMethod = payStatusModel.PaymentMethod,
                Deposit = payStatusModel.Deposit,
                Remain = payStatusModel.Remain,
                Status = payStatusModel.Status,
                BillId = payStatusModel.BillId,
            };
        }
        public static PayStatus ToCreatePayStatusDto(this CreatePayStatusDto payStatusDto, int billId)
        {
            return new PayStatus
            {
                PaymentMethod = payStatusDto.PaymentMethod,
                Deposit = payStatusDto.Deposit,
                Remain = payStatusDto.Remain,
                Status = payStatusDto.Status,
                BillId = billId
            };
        }
    }
}
