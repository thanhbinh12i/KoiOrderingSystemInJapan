import React, { useState, useEffect } from "react";
import { Row, Col, Card, Statistic } from "antd";
import {
  UserOutlined,
  HomeOutlined,
  CarOutlined,
  FileOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { Line, Pie } from "@ant-design/charts";
import { get } from "../../../utils/request";

const DashboardView = () => {
  const [stats, setStats] = useState({
    userCount: 0,
    farmCount: 0,
    tourCount: 0,
    billCount: 0,
    totalRevenue: 0,
  });

  const [revenueData, setRevenueData] = useState([]);
  const [userTypeData, setUserTypeData] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [users, farms, tours, bills] = await Promise.all([
        get("account/view-all-user"),
        get("koiFarm/view-all"),
        get("tour/view-all"),
        get("bill/view-all"),
      ]);

      const totalRevenue = bills.reduce(
        (sum, bill) => sum + bill.totalAmount,
        0
      );

      setStats({
        userCount: users.length,
        farmCount: farms.length,
        tourCount: tours.length,
        billCount: bills.length,
        totalRevenue,
      });

      setRevenueData(prepareRevenueData(bills));
      setUserTypeData(prepareUserTypeData(users));
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const prepareRevenueData = (bills) => {
    const groupedData = bills.reduce((acc, bill) => {
      const date = new Date(bill.createdAt).toISOString().split("T")[0];
      acc[date] = (acc[date] || 0) + bill.totalAmount;
      return acc;
    }, {});

    return Object.entries(groupedData).map(([date, value]) => ({
      date,
      value,
    }));
  };

  const prepareUserTypeData = (users) => {
    const userTypes = users.reduce((acc, user) => {
      acc[user.type] = (acc[user.type] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(userTypes).map(([type, value]) => ({ type, value }));
  };

  const lineConfig = {
    data: revenueData,
    xField: "date",
    yField: "value",
    seriesField: "value",
    yAxis: {
      label: {
        formatter: (v) => `$${v}`,
      },
    },
    legend: { position: "top" },
    smooth: true,
    animation: {
      appear: {
        animation: "path-in",
        duration: 5000,
      },
    },
  };

  const pieConfig = {
    data: userTypeData,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name} {percentage}",
    },
    interactions: [{ type: "pie-legend-active" }, { type: "element-active" }],
  };

  return (
    <div style={{ padding: "24px" }}>
      <Row gutter={16}>
        <Col span={4}>
          <Card>
            <Statistic
              title="Total Users"
              value={stats.userCount}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="Total Farms"
              value={stats.farmCount}
              prefix={<HomeOutlined />}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="Total Tours"
              value={stats.tourCount}
              prefix={<CarOutlined />}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="Total Bills"
              value={stats.billCount}
              prefix={<FileOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={stats.totalRevenue}
              prefix={<DollarOutlined />}
              precision={2}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: "24px" }}>
        <Col span={16}>
          <Card title="Revenue Over Time">
            <Line {...lineConfig} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="User Types">
            <Pie {...pieConfig} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardView;
