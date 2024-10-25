import './CancelTemplate.scss'

const CancelTemplate = (props) => {
      const { item } = props;
      const refundAmount = item.priceOffer * 0.5;
      const formatCurrency = (amount) => {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
      };
      return (
            <html>
                  <head>
                        <meta charSet="UTF-8" />
                        <style>
                              {`
            .cancellation-email {
              font-family: Arial, sans-serif;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            h2 { color: #1890ff; }
            .order-details {
              background-color: #f5f5f5;
              padding: 15px;
              margin: 20px 0;
            }
            .currency { font-weight: bold; }
            .currency.refund { color: #52c41a; }
            .footer {
              margin-top: 20px;
              font-size: 12px;
              color: #8c8c8c;
            }
          `}
                        </style>
                  </head>
                  <body>
                        <div className="cancellation-email">
                              <h2>Xác nhận hủy đơn đặt chỗ</h2>

                              <p>Kính gửi Quý khách,</p>

                              <p>Chúng tôi xác nhận đã nhận được yêu cầu hủy đơn đặt chỗ của Quý khách với mã đơn <strong>{item.quotationId}</strong>.</p>

                              <div className="order-details">
                                    <h3>Chi tiết đơn hàng:</h3>
                                    <p><strong>Dịch vụ:</strong> {item.tourId}</p>
                                    <p><strong>Giá tiền:</strong> <span className="currency">{formatCurrency(item.priceOffer)} đ</span></p>
                                    <p><strong>Số tiền hoàn lại (50%):</strong> <span className="currency refund">{formatCurrency(refundAmount)} đ</span></p>
                              </div>

                              <p>Theo chính sách của chúng tôi, yêu cầu hủy đơn của Quý khách đã được chấp nhận. Quý khách sẽ được hoàn lại 50% số tiền đã thanh toán, tương đương <span className="currency refund">{formatCurrency(refundAmount)} đ</span>.</p>

                              <p>Chúng tôi rất tiếc vì sự bất tiện này và hy vọng sẽ có cơ hội phục vụ Quý khách trong tương lai.</p>

                              <p>Trân trọng,<br />Koi đây nè</p>

                              <div className="footer">
                                    <p>Email này được gửi tự động. Vui lòng không trả lời email này.</p>
                              </div>
                        </div>
                  </body>
            </html>
      );
}
export default CancelTemplate;