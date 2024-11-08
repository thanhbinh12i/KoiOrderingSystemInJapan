import React, { useEffect, useState } from 'react';
import { Result, Button, Typography, Row, Col, Card, Descriptions, Statistic } from 'antd';
import { CheckCircleFilled, PrinterOutlined, HomeFilled } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import './PaymentSuccess.scss';
import { get, post, put } from '../../utils/request';

const { Title } = Typography;

const PaymentSuccess = () => {
    const [bill, setBill] = useState();
    const params = useParams();
    const date = new Date().toLocaleString();
    const userId = localStorage.getItem("id");
    const [price, setPrice] = useState(0);
    useEffect(() => {
        const fetchApi = async () => {
            const pendingPaymentData = localStorage.getItem('pendingPaymentData');
            const pendingPaymentKoi = localStorage.getItem('pendingPaymentKoi');
            const pendingPaymentRemain = localStorage.getItem('pendingPaymentRemain');
            const getTimeCurrent = () => {
                return new Date().toLocaleString();
            };

            if (pendingPaymentData) {
                const paymentData = JSON.parse(pendingPaymentData);
                const billResponse = await post(`bill/create/${userId}-${paymentData.quotationId}`, paymentData);
                if (billResponse) {
                    const quotationData = {
                        "priceOffer": paymentData.tourPrice,
                        "status": "Đã thanh toán",
                        "approvedDate": getTimeCurrent(),
                        "description": ""
                    };
                    await put(`quotation/update/${paymentData.quotationId}`, quotationData);
                    const response = await get(`bill/view-by-id/${billResponse.billId}`);
                    if (response) {
                        setBill(response);
                        setPrice(paymentData.tourPrice);
                        const tour = await get(`tour/view-by-quotationId/${response.quotationId}`);
                        const templateTicket = TemplateTicket({ response, tour });
                        const emailData = {
                            "toEmail": response.email,
                            "subject": `Vé máy bay của quý khách - Mã đơn ${response.quotationId}`,
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
                    }
                    localStorage.removeItem('pendingPaymentData');
                }
            } else if (pendingPaymentKoi) {
                const paymentData = JSON.parse(pendingPaymentKoi);
                const currentBill = await get(`bill/view-by-id/${paymentData.id}`);
                const koiPrice = paymentData.totalPrice;
                const dataToUpdate = {
                    "koiPrice": koiPrice,
                    "totalPrice": currentBill.tourPrice + koiPrice,
                    "paymentDate": getTimeCurrent()
                }
                const response = await put(`bill/update/${paymentData.id}`, dataToUpdate);
                if (response) {
                    const data = {
                        "deliveryAddress": paymentData.deliveryAddress,
                        "deliveryStatusText": "Đã thanh toán",
                        "estimatedDate": ""
                    }
                    const dataPayStatus = {
                        "paymentMethod": "VN PAY",
                        "deposit": paymentData.deposit,
                        "remain": koiPrice - paymentData.deposit,
                        "status": "Đã thanh toán tiền cọc"
                    }
                    const deliveryResponse = await post(`delivery-status/create/${paymentData.id}-${paymentData.deliveryId}`, data);
                    const payStatusResponse = await post(`payStatus/create/${paymentData.id}`, dataPayStatus);
                    if (deliveryResponse || payStatusResponse) {
                        setBill(currentBill);
                        setPrice(paymentData.price);
                    }
                    localStorage.removeItem('pendingPaymentKoi');
                }
            } else if (pendingPaymentRemain) {
                const paymentData = JSON.parse(pendingPaymentRemain);
                const dataPayStatus = {
                    "paymentMethod": "VN PAY",
                    "deposit": paymentData.payStatusResponse.deposit,
                    "remain": paymentData.payStatusResponse.remain,
                    "status": "Đã thanh toán"
                }
                const payStatusResponse = await put(`payStatus/update/${paymentData.payStatusResponse.payId}`, dataPayStatus);
                if (payStatusResponse) {
                    setPrice(paymentData.payStatusResponse.remain);
                }
                localStorage.removeItem('pendingPaymentRemain');
            }
        };
        fetchApi();
    }, [params.id, userId])

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="payment-success-page">
            <Row justify="center">
                <Col xs={24} sm={22} md={20} lg={18} xl={16}>
                    <Card className="success-card">
                        <Result
                            icon={<CheckCircleFilled className="success-icon" />}
                            title={<Title level={2}>Thanh toán thành công!</Title>}
                        />
                        {bill && (
                            <>
                                <div className="payment-details">
                                    <Descriptions title="Chi tiết thanh toán" bordered column={{ xs: 1, sm: 2 }}>
                                        <Descriptions.Item label="Mã giao dịch">{params.id}</Descriptions.Item>
                                        <Descriptions.Item label="Ngày thanh toán">{date}</Descriptions.Item>
                                        <Descriptions.Item label="Phương thức">VN PAY</Descriptions.Item>
                                        <Descriptions.Item label="Khách hàng">{bill.userFullName}</Descriptions.Item>
                                        <Descriptions.Item label="Số điện thoại">{bill.phoneNumber}</Descriptions.Item>
                                        <Descriptions.Item label="Email">{bill.email}</Descriptions.Item>
                                    </Descriptions>
                                </div>
                            </>
                        )}
                        <div className="amount-container">
                            <Statistic
                                title="Tổng thanh toán"
                                value={price}
                                precision={0}
                                suffix="VND"
                                className="amount-statistic"
                            />
                        </div>


                        <div className="action-buttons">
                            <Button type="primary" icon={<PrinterOutlined />} size="large" onClick={handlePrint}>
                                In hóa đơn
                            </Button>
                            <Link to="/">
                                <Button icon={<HomeFilled />} size="large">
                                    Về trang chủ
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
export default PaymentSuccess;
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
                                                    <div class="pnr-code">PTF8RR</div>
                                                </div>

                                                <table cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        <td style="padding-right: 10px;">✈</td>
                                                        <td>
                                                            <div class="airline-name">VietJet Air</div>
                                                            <div class="flight-number">VJ-262</div>
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
        </table>
    </div>
</body>
</html>
      `
}
