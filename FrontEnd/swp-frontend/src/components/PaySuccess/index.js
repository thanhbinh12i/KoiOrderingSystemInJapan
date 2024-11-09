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
                    }
                    localStorage.removeItem('pendingPaymentData');
                }
            } else if (pendingPaymentKoi) {
                const paymentData = JSON.parse(pendingPaymentKoi);
                const currentBill = await get(`bill/view-by-id/${paymentData.id}`);
                const koiPrice = paymentData.totalPrice;
                const dataToUpdate = {
                    "koiPrice": koiPrice,
                    "totalPrice": currentBill.tourPrice + koiPrice + paymentData.deliveryFee,
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
                        setPrice(paymentData.deposit + paymentData.deliveryFee);
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

