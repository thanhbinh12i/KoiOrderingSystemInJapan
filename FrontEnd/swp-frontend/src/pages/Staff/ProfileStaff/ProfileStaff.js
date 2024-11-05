import React, { useState, useEffect } from "react";
import {
    Typography,
    Form,
    Input,
    Select,
    DatePicker,
    Button,
    message,
    Row,
    Col,
    Image,
} from "antd";
import moment from "moment";
import { get, put } from "../../../utils/request";
import "./ProfileStaff.scss";
import avaDivery from "../../../assets/Profile/deliveringStaff.png";
import avaSale from "../../../assets/Profile/saleStaff.jpg";
import avaConsult from "../../../assets/Profile/consultingStaff.jpg";
const { Title } = Typography;

function ProfileStaff() {
    const [isEdit, setIsEdit] = useState(false);
    const [personalInfo, setPersonalInfo] = useState({});
    const userId = localStorage.getItem("id");
    const roleId = localStorage.getItem("role");
    const [form] = Form.useForm();

    const fetchPersonalInfo = async () => {
        try {
            const response = await get(`account/${userId}`);
            const updatedInfo = {
                ...response,
                dateOfBirth: response.dateOfBirth
                    ? moment(response.dateOfBirth, "DD-MM-YYYY")
                    : null,
            };
            setPersonalInfo(updatedInfo);
            form.setFieldsValue(updatedInfo);
        } catch (error) {
            console.error("Error:", error);
        }
    };
    useEffect(() => {
        fetchPersonalInfo();
        // eslint-disable-next-line
    }, []);

    const handleEdit = () => {
        setIsEdit(true);
    };

    const handleSave = async () => {
        try {
            const values = await form.validateFields();

            const response = await put(`account/update/${userId}`, {
                ...values,
                dateOfBirth: values.dateOfBirth
                    ? values.dateOfBirth.format("DD-MM-YYYY")
                    : null,
            });

            message.success("Cập nhật thành công!");
            setPersonalInfo(response);
            setIsEdit(false);
        } catch (error) {
            message.error("Có lỗi xảy ra khi cập nhật thông tin.");
            console.error("Error:", error);
        }
    };

    const handleCancel = () => {
        setIsEdit(false);
        form.resetFields();
    };
    const getImg = () => {
        if (roleId === "DeliveringStaff") {
            return avaDivery;
        }
        else if (roleId === "SalesStaff") {
            return avaSale;
        } else if (roleId === "ConsultingStaff") {
            return avaConsult;
        }
    }
    return (
        <div className="main-content">
            <div style={{ display: "flex", justifyContent: "center", height: "300px" }}>
                <Image
                    src={getImg()}
                    alt="Avatar"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "50%",
                    }}
                />
            </div>
            <Title
                level={2}
                style={{ justifyContent: "center", textAlign: "center" }}
            >
                Thông tin nhân viên
            </Title>

            <Form form={form} layout="vertical" initialValues={personalInfo}>
                <Form.Item label="Tên đầy đủ" name="fullName">
                    <Input placeholder="Full Name" disabled={!isEdit} style={{ justifyContent: "center", textAlign: "center" }} />
                </Form.Item>
                <Row gutter={16}>
                    <Col span={12}>
                        {" "}
                        <Form.Item label="Giới tính" name="gender">
                            <Select placeholder="Chọn giới tính" disabled={!isEdit}>
                                <Select.Option value="male">Nam</Select.Option>
                                <Select.Option value="female">Nữ</Select.Option>
                                <Select.Option value="other">Khác</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        {" "}
                        <Form.Item label="Phòng ban">
                            <Input value={roleId} disabled />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        {" "}
                        <Form.Item label="Ngày sinh" name="dateOfBirth">
                            <DatePicker
                                style={{ width: "100%" }}
                                disabled={!isEdit}
                                format="DD-MM-YYYY"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        {" "}
                        <Form.Item label="Địa chỉ" name="address">
                            <Input placeholder="Nhập thành phố" disabled={!isEdit} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ type: "email", message: "Email không hợp lệ!" }]}
                        >
                            <Input disabled={!isEdit} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        {" "}
                        <Form.Item label="Số điện thoại" name="phoneNumber">
                            <Input
                                placeholder="Nhập số điện thoại"
                                disabled={!isEdit}
                                rules={[
                                    { required: true, message: "Vui lòng nhập số điện thoại!" },
                                    {
                                        pattern: /^0\d{9}$/,
                                        message: "Số điện thoại không hợp lệ!",
                                    },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                {isEdit ? (
                    <Form.Item>
                        <Button type="primary" onClick={handleSave}>
                            Lưu
                        </Button>
                        <Button style={{ marginLeft: 8 }} onClick={handleCancel}>
                            Hủy
                        </Button>
                    </Form.Item>
                ) : (
                    <Button type="primary" onClick={handleEdit}>
                        Cập nhật
                    </Button>
                )}
            </Form>
        </div>
    );
}

export default ProfileStaff;
