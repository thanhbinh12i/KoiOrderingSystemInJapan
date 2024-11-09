import { useEffect, useState } from "react";
import { get, put } from "../../../utils/request";
import { Button, Card, Col, Pagination, Row } from "antd";
import "./Checkin.scss"

function Checkin() {
      const [quotation, setQuotation] = useState([]);
      const [currentPage, setCurrentPage] = useState(1);
      const pageSize = 6;

      const getCurrentPageData = () => {
            const startIndex = (currentPage - 1) * pageSize;
            return quotation.slice(startIndex, startIndex + pageSize);
      };


      const fetchApi = async () => {
            const response = await get("quotation/view-all");
            if (response) {
                  const quotationsWithTours = await Promise.all(
                        response.filter(quotation => quotation.status === "Đã thanh toán" || quotation.status === "Đã check-in")
                              .map(async (quotation) => {
                                    const tourResponse = await get(`tour/view-tourId/${quotation.tourId}`);
                                    return {
                                          ...quotation,
                                          tourDetail: tourResponse
                                    };
                              })

                  );
                  setQuotation(quotationsWithTours.reverse());
            }
      };
      useEffect(() => {
            fetchApi();
      }, []);
      const checkIn = async (quotationId, priceOffer) => {
            const getTimeCurrent = () => {
                  return new Date().toLocaleString();
            };
            const quotationData = {
                  "priceOffer": priceOffer,
                  "status": "Đã check-in",
                  "approvedDate": getTimeCurrent(),
                  "description": '',
            };
            const response = await put(`quotation/update/${quotationId}`, quotationData);
            if (response) {
                  fetchApi();
            }
      }
      const sendPlaneTicket = async (item) => {
            const getTimeCurrent = () => {
                  return new Date().toLocaleString();
            };
            const quotationData = {
                  "priceOffer": item.priceOffer,
                  "status": "Đã check-in",
                  "approvedDate": getTimeCurrent(),
                  "description": "Chúng tôi đã gửi vé máy bay qua email của bạn. Vui lòng xem kĩ lại thông tin vé và chuẩn bị.",
            };
            const response = await put(`quotation/update/${item.quotationId}`, quotationData);
            if (response) {
                  const tour = await get(`tour/view-by-quotationId/${item.quotationId}`);
                  const templateTicket = TemplateTicket({ item, tour });
                  const emailData = {
                        "toEmail": item.email,
                        "subject": `Vé máy bay của quý khách - Mã đơn ${item.quotationId}`,
                        "message": templateTicket
                  };
                  await fetch("https://koidayne.azurewebsites.net/api/email/send", {
                        method: "POST",
                        headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json"
                        },
                        body: JSON.stringify(emailData)
                  });
                  fetchApi();
            }
      }
      return (
            <>
                  <div className="check-in">
                        {quotation.length > 0 ? (
                              <>
                                    <Row gutter={20}>
                                          {getCurrentPageData().map((item) => (
                                                <Col span={12} key={item.quotationId}>
                                                      <Card title={`Đặt chỗ số ${item.quotationId} - ${item.status}`}>
                                                            <p>Họ và tên: <strong>{item.fullName}</strong></p>
                                                            <p>Email: <strong>{item.email}</strong></p>
                                                            <p>Số điện thoại: <strong>{item.phoneNumber}</strong></p>
                                                            <p>Chuyến đi: <strong>{item.tourDetail.tourName}</strong></p>
                                                            <p>Ngày đi: <strong>{item.tourDetail.startTime}</strong></p>
                                                            <p>Số người tham gia: <strong>{item.tourDetail.numberOfParticipate}</strong></p>
                                                            {item.status === "Đã thanh toán" && (
                                                                  <Button type="primary" onClick={() => sendPlaneTicket(item)}>
                                                                        Gửi vé máy bay cho khách hàng
                                                                  </Button>
                                                            )}
                                                            {item.status === "Đã gửi vé máy bay" && (
                                                                  <Button type="primary" onClick={() => checkIn(item.quotationId, item.priceOffer)}>
                                                                        Làm thủ tục check-in
                                                                  </Button>
                                                            )}
                                                      </Card>
                                                </Col>
                                          ))}
                                    </Row>
                                    <div style={{ marginTop: '20px', textAlign: 'right' }}>
                                          <Pagination
                                                current={currentPage}
                                                onChange={(page) => setCurrentPage(page)}
                                                total={quotation.length}
                                                pageSize={pageSize}
                                                showSizeChanger={false}
                                                showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} mục`}
                                          />
                                    </div>
                              </>

                        ) : (
                              <h1>Không có báo giá nào</h1>
                        )}
                  </div>
            </>
      )
}
export default Checkin;

const TemplateTicket = (props) => {
      const { response, tour } = props;
      return `
  <html>
  <head>
      <meta charset="UTF-8">
      <style>
          body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
              margin: 20px;
              color: #333;
              line-height: 1.6;
          }
  
          .container {
              width: 600px;
              margin: 0 auto;
              padding: 20px;
          }
  
          .logo {
              text-align: center;
              margin-bottom: 30px;
          }
  
          h1 {
              font-size: 24px;
              margin-bottom: 30px;
          }
  
          .ticket-container {
              width: 800px;
              margin: 20px auto;
              padding: 25px;
              border: 1px solid #e0e0e0;
              border-radius: 8px;
              background: #fff;
          }
  
          .greeting {
              margin-bottom: 20px;
          }
  
          .header {
              color: #687176;
              font-size: 14px;
              padding-bottom: 15px;
              border-bottom: 1px solid #e0e0e0;
              margin-bottom: 20px;
          }
  
          .pnr-label {
              color: #687176;
              font-size: 14px;
              margin-bottom: 5px;
          }
  
          .pnr-code {
              color: #1ba0e2;
              font-size: 24px;
              font-weight: bold;
          }
  
          .airline-name {
              font-weight: 500;
          }
  
          .flight-number {
              color: #687176;
              font-size: 14px;
          }
  
          .flight-date {
              font-size: 20px;
              font-weight: bold;
              margin-bottom: 5px;
          }
  
          .flight-duration {
              color: #687176;
              font-size: 14px;
              margin-bottom: 25px;
          }
  
          .time {
              font-size: 18px;
              font-weight: bold;
          }
  
          .city {
              font-weight: 500;
          }
  
          .vertical-line {
              width: 2px;
              background: #687176;
              margin: 0 auto;
          }
  
          .dot {
              width: 10px;
              height: 10px;
              background: #687176;
              border-radius: 50%;
              margin: 0 auto;
          }
      </style>
  </head>
  
  <body>
      <div class="container">
          <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                  <td align="center" style="padding-bottom: 30px;">
                      <span style="font-size: 32px; color: #0064d2;">Koi Day ne</span>
                  </td>
              </tr>
  
              <tr>
                  <td>
                      <h1>Vé điện tử của quý khách trong thư này!</h1>
                  </td>
              </tr>
  
              <tr>
                  <td class="greeting">
                      Kính gửi quý khách ${response.userFullName},<br>
                      Yêu cầu đặt chỗ của quý khách đã được xác nhận thành công. Quý khách vui lòng xem vé điện tử trong tập tin đính kèm.
                  </td>
              </tr>
  
              <tr>
                  <td>
                      <div class="ticket-container">
                          <table width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                  <td class="header">
                                      <table width="100%" cellpadding="0" cellspacing="0">
                                          <tr>
                                              <td>CHUYẾN BAY ĐI</td>
                                              <td align="right">HO CHI MINH CITY - TOKYO</td>
                                          </tr>
                                      </table>
                                  </td>
                              </tr>
  
                              <tr>
                                  <td>
                                      <table width="100%" cellpadding="0" cellspacing="0">
                                          <tr>
                                              <td width="200" style="padding-right: 20px; vertical-align: top;">
                                                  <div class="pnr-section">
                                                      <div class="pnr-label">Mã đặt vé (PNR):</div>
                                                      <div class="pnr-code">SWP391</div>
                                                  </div>
  
                                                  <table cellpadding="0" cellspacing="0">
                                                      <tr>
                                                          <td style="padding-right: 10px;">✈</td>
                                                          <td>
                                                              <div class="airline-name">VietJet Air</div>
                                                              <div class="flight-number">VJ-391</div>
                                                          </td>
                                                      </tr>
                                                  </table>
                                              </td>
  
                                              <td style="border-left: 1px solid #e0e0e0; padding-left: 20px; vertical-align: top;">
                                                  <div class="flight-date">${tour.startTime}</div>
                                                  <div class="flight-duration">07:20 - 13:00 (5h 40m, Bay thẳng)</div>
  
                                                  <table width="100%" cellpadding="0" cellspacing="0">
                                                      <tr>
                                                          <td width="20">
                                                              <div class="dot"></div>
                                                              <div class="vertical-line" style="height: 70px;"></div>
                                                              <div class="dot"></div>
                                                          </td>
                                                          <td style="vertical-align: top;">
                                                              <div style="margin-bottom: 30px;">
                                                                  <div class="time">07:20</div>
                                                                  <div class="city">Ho Chi Minh City (SGN)</div>
                                                              </div>
                                                              <div>
                                                                  <div class="time">13:00</div>
                                                                  <div class="city">Haneda (HND)</div>
                                                              </div>
                                                          </td>
                                                      </tr>
                                                  </table>
                                              </td>
                                          </tr>
                                      </table>
                                  </td>
                              </tr>
                          </table>
                      </div>
                  </td>
              </tr>
              <div style="margin-bottom: 30px;"></div>
               <tr>
                  <td>
                      <div class="ticket-container">
                          <table width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                  <td class="header">
                                      <table width="100%" cellpadding="0" cellspacing="0">
                                          <tr>
                                              <td>CHUYẾN BAY VỀ</td>
                                              <td align="right">TOKYO - HO CHI MINH CITY</td>
                                          </tr>
                                      </table>
                                  </td>
                              </tr>
  
                              <tr>
                                  <td>
                                      <table width="100%" cellpadding="0" cellspacing="0">
                                          <tr>
                                              <td width="200" style="padding-right: 20px; vertical-align: top;">
                                                  <div class="pnr-section">
                                                      <div class="pnr-label">Mã đặt vé (PNR):</div>
                                                      <div class="pnr-code">SWP391</div>
                                                  </div>
  
                                                  <table cellpadding="0" cellspacing="0">
                                                      <tr>
                                                          <td style="padding-right: 10px;">✈</td>
                                                          <td>
                                                              <div class="airline-name">VietJet Air</div>
                                                              <div class="flight-number">VJ-391</div>
                                                          </td>
                                                      </tr>
                                                  </table>
                                              </td>
  
                                              <td style="border-left: 1px solid #e0e0e0; padding-left: 20px; vertical-align: top;">
                                                  <div class="flight-date">${tour.finishTime}</div>
                                                  <div class="flight-duration">02:30 - 7:20 (6h 50m, Bay thẳng)</div>
  
                                                  <table width="100%" cellpadding="0" cellspacing="0">
                                                      <tr>
                                                          <td width="20">
                                                              <div class="dot"></div>
                                                              <div class="vertical-line" style="height: 70px;"></div>
                                                              <div class="dot"></div>
                                                          </td>
                                                          <td style="vertical-align: top;">
                                                              <div style="margin-bottom: 30px;">
                                                                  <div class="time">2:30</div>
                                                                  <div class="city">Haneda (HND)</div>
                                                              </div>
                                                              <div>
                                                                  <div class="time">07:20</div>
                                                                  <div class="city">Ho Chi Minh City (SGN)</div>
                                                              </div>
                                                          </td>
                                                      </tr>
                                                  </table>
                                              </td>
                                          </tr>
                                      </table>
                                  </td>
                              </tr>
                          </table>
                      </div>
                  </td>
              </tr>
          </table>
      </div>
  </body>
  </html>
        `
}