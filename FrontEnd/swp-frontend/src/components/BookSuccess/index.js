import { Card, Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import './BookSuccess.scss';

function BookSuccess() {
      return (
            <>
                  <div className="booking-success">
                        <Result
                              status="success"
                              title="Đặt tour thành công!"
                              subTitle="Cảm ơn bạn đã đặt tour với chúng tôi. Chúng tôi sẽ liên hệ với bạn sớm nhất có thể."
                              extra={[
                                    <Link to="/" key="home">
                                          <Button type="primary">Quay về trang chủ</Button>
                                    </Link>,
                                    <Link to="/my-bookings" key="bookings">
                                          <Button>Danh sách đặt tour của tôi</Button>
                                    </Link>,
                              ]}
                        />
                        <Card className="additional-info">
                              <h3>Thông tin thêm</h3>
                              <p>Bạn sẽ nhận được thông tin xác nhận báo giá trong vòng 24 giờ.</p>
                              <p>Để biết thêm thông tin, vui lòng liên hệ với chúng tôi email để hỗ trợ.</p>
                        </Card>
                  </div>
            </>
      )
}
export default BookSuccess;