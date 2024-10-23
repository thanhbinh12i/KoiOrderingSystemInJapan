import React, { useState, useEffect } from "react";
import { Card, Row, Col, Statistic } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { Line, Bar } from "@ant-design/plots";
import "./Dashboard.scss";
import { get } from "../../../utils/request.js";

const DashboardView = () => {
  const [users, setUsers] = useState([]);
  const [bills, setBills] = useState([]);
  const [koiBills, setKoiBills] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const usersData = await get("account/view-all-user");
      const billsData = await get("bill/view-all");
      const koiBillsData = await get("koi-bill/view-all");

      setUsers(usersData);
      setBills(billsData);
      setKoiBills(koiBillsData);

      // Xử lý top products nếu cần
      //     const productCount = {};
      //     // Xử lý logic top products ở đây
      //     setTopProducts(sortedProducts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const totalRevenue =
    bills.reduce((sum, bill) => sum + bill.price, 0) +
    koiBills.reduce((sum, bill) => sum + bill.finalPrice, 0);

  const processChartData = () => {
    const data = [];

    // Xử lý dữ liệu bills theo quotationId
    const quotationCounts = {};
    bills.forEach((bill) => {
      const date = new Date(bill.createdAt).toLocaleDateString();
      if (!quotationCounts[date]) {
        quotationCounts[date] = new Set();
      }
      if (bill.quotationId) {
        quotationCounts[date].add(bill.quotationId);
      }
    });

    Object.entries(quotationCounts).forEach(([date, quotations]) => {
      data.push({
        date,
        type: "Số lượng báo giá",
        value: quotations.size,
      });
    });

    // Xử lý số lượng Koi theo koiId
    const koiCounts = {};
    koiBills.forEach((bill) => {
      const date = new Date(bill.createdAt).toLocaleDateString();
      if (!koiCounts[date]) {
        koiCounts[date] = new Set();
      }
      koiCounts[date].add(bill.koiId);
    });

    Object.entries(koiCounts).forEach(([date, kois]) => {
      data.push({
        date,
        type: "Số lượng Koi",
        value: kois.size,
      });
    });

    // Xử lý doanh thu
    const revenue = {};
    bills.forEach((bill) => {
      const date = new Date(bill.createdAt).toLocaleDateString();
      revenue[date] = (revenue[date] || 0) + bill.price;
    });
    koiBills.forEach((bill) => {
      const date = new Date(bill.createdAt).toLocaleDateString();
      revenue[date] = (revenue[date] || 0) + bill.finalPrice;
    });

    Object.entries(revenue).forEach(([date, value]) => {
      data.push({
        date,
        type: "Doanh thu",
        value: value,
      });
    });

    return data;
  };

  const config = {
    data: processChartData(),
    xField: "date",
    yField: "value",
    seriesField: "type",
    yAxis: {
      label: {
        formatter: (v) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    legend: {
      position: "top",
    },
    smooth: true,
    animation: {
      appear: {
        animation: "path-in",
        duration: 1000,
      },
    },
  };

  return (
    <div className="dashboard">
      <Row gutter={16} className="stats-cards">
        <Col span={8}>
          <Card>
            <Statistic
              title="Tổng số người dùng"
              value={users.length}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Tổng số đơn hàng"
              value={bills.length + koiBills.length}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Tổng doanh thu"
              value={totalRevenue}
              prefix={<DollarOutlined />}
              suffix="VNĐ"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} className="charts">
        <Col span={16}>
          <Card title="Biểu đồ thống kê">
            <Line {...config} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Top sản phẩm bán chạy">
            <Bar
              data={topProducts}
              xField="count"
              yField="name"
              seriesField="name"
              label={{
                position: "right",
              }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardView;
