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
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const usersData = await get("api/account/view-all-user");
      const billsData = await get("api/bill/view-all");
      const koiBillsData = await get("api/koi-bill/view-all");

      setUsers(usersData);
      setBills([...billsData, ...koiBillsData]);

      // Tính toán top sản phẩm
      const productCount = {};
      bills.forEach((bill) => {
        bill.products.forEach((product) => {
          productCount[product.name] =
            (productCount[product.name] || 0) + product.quantity;
        });
      });

      const sortedProducts = Object.entries(productCount)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      setTopProducts(sortedProducts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const totalRevenue = bills.reduce((sum, bill) => sum + bill.totalAmount, 0);

  const revenueData = bills.reduce((acc, bill) => {
    const date = new Date(bill.createdAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + bill.totalAmount;
    return acc;
  }, {});

  const revenueChartData = Object.entries(revenueData).map(([date, value]) => ({
    date,
    revenue: value,
  }));

  return (
    <>
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
                value={bills.length}
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
            <Card title="Biểu đồ doanh thu">
              <Line
                data={revenueChartData}
                xField="date"
                yField="revenue"
                point={{ size: 5 }}
                smooth
              />
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
    </>
  );
};

export default DashboardView;
