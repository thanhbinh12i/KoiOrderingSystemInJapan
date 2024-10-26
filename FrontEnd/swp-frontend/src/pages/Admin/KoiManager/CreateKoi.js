import { Button, Col, Form, Input, message, Row, Select, Upload } from "antd";
import { useEffect, useState } from "react";
import { get, post } from "../../../utils/request";
import { UploadOutlined } from "@ant-design/icons";
const { TextArea } = Input;
const { Option } = Select;

function CreateKoi() {
  const [form] = Form.useForm();
  const [varieties, setVarieties] = useState([]);
  const [farm, setFarm] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    const fetchApi = async () => {
      const response = await get("koi-variable/view-all");
      if (response) {
        const formattedVarieties = response.map((item) => ({
          label: item.varietyName,
          value: item.varietyId,
        }));
        setVarieties(formattedVarieties);
      }
    };
    fetchApi();
  }, []);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await get("koiFarm/view-all");
      if (response) {
        const formattedFarm = response.map((item) => ({
          label: item.farmName,
          value: item.farmId,
        }));
        setFarm(formattedFarm);
      }
    };
    fetchApi();
  }, []);
  const handleFinish = async (values) => {
    try {
      setLoading(true);
      const farmId = values.farmId;
      const varietyIds = values.varietyId;
      const getTimeCurrent = () => {
        return new Date().toISOString();
      };

      const koiResponse = await post(`koi/create/${farmId}`, {
        ...values,
        varietyId: undefined,
        updateDate: getTimeCurrent(),
      });
      if (koiResponse) {
        const koiId = koiResponse.koiId;
        const varietyPromises = varietyIds.map((varietyId) =>
          post(`varietyOfKoi/create/${koiId}&${varietyId}`, null)
        );

        if (fileList.length > 0) {
          await uploadImages(koiId, fileList);
          form.resetFields();
          setFileList([]);
          messageApi.success("Thêm cá koi mới thành công");
        }
        await Promise.all(varietyPromises);
      } else {
        messageApi.error("Thêm cá mới không thành công");
      }
    } catch (error) {
      console.log(error);
      messageApi.error("Lỗi");
    } finally {
      setLoading(false);
    }
  };
  const uploadImages = async (koiId, files) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file.originFileObj);
    });

    try {
      const response = await fetch(
        `https://koidayne.azurewebsites.net/api/koi-image/upload/${koiId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Lỗi tải lên hình ảnh");
      }

      const data = await response.json();
      message.success("Tải lên hình ảnh thành công");
      return data.urls;
    } catch (error) {
      console.error("Error uploading images:", error);
      message.error("Lỗi tải lên hình ảnh");
      throw error;
    }
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  return (
    <>
      {contextHolder}
      <h1>Thêm cá koi mới</h1>
      <Form onFinish={handleFinish} layout="vertical" form={form}>
        <Row gutter={20}>
          <Col span={24}>
            <Form.Item
              label="Tên cá koi"
              name="koiName"
              rules={[{ required: true, message: "Vui lòng nhập tên cá koi!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Độ dài (cm)"
              name="length"
              rules={[{ required: true, message: "Vui lòng nhập độ dài!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Giá"
              name="price"
              rules={[{ required: true, message: "Vui lòng nhập giá tiền!" }]}
            >
              <Input addonAfter="đ" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Năm"
              name="yob"
              rules={[{ required: true, message: "Vui lòng nhập năm sinh!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Giới tính"
              name="gender"
              rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
            >
              <Select>
                <Option value="Koi Đực">Đực</Option>
                <Option value="Koi Cái">Cái</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Trang trại"
              name="farmId"
              rules={[{ required: true, message: "Vui lòng chọn trang trại!" }]}
            >
              <Select options={farm} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Giống cá"
              name="varietyId"
              rules={[{ required: true, message: "Vui lòng chọn giống cá!" }]}
            >
              <Select mode="multiple" options={varieties} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Số lượng"
              name="quantity"
              rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Hình ảnh" name="images">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={handleChange}
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />}>Tải lên hình ảnh</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Mô tả" name="description">
              <TextArea rows={16} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Tạo mới
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}
export default CreateKoi;
