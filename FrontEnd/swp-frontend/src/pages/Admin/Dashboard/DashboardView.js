import React, { useState, useEffect } from "react";
import { Card, Row, Col, Statistic, Table } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { Line } from "@ant-design/plots";
import "./Dashboard.scss";
import { get } from "../../../utils/request.js";

const DashboardView = () => {
  const [users, setUsers] = useState([]);
  const [bills, setBills] = useState([]);
  const [bestTours, setBestTours] = useState([]);
  const [bestKois, setBestKois] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const usersData = await get("account/view-all-user");
      const billsData = await get("bill/view-all");

      setUsers(usersData);
      setBills(billsData);

      // Process best tours
      const tourStats = processTourBookings(billsData);
      setBestTours(tourStats);

      // Process best kois
      const koiStats = processKoiSales(billsData);
      setBestKois(koiStats);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const processTourBookings = (billsData) => {
    const tourBookings = {};

    billsData.forEach((bill) => {
      if (bill.tourPrice && bill.tourPrice > 0) {
        const tourKey = bill.tourDescription || "Unknown Tour";
        if (!tourBookings[tourKey]) {
          tourBookings[tourKey] = {
            name: tourKey,
            bookings: 0,
            revenue: 0,
          };
        }
        tourBookings[tourKey].bookings += 1;
        tourBookings[tourKey].revenue += bill.tourPrice;
      }
    });

    return Object.values(tourBookings)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)
      .map((tour, index) => ({
        ...tour,
        key: index,
        rank: index + 1,
      }));
  };

  const processKoiSales = (billsData) => {
    const koiSales = {};

    billsData.forEach((bill) => {
      if (bill.koiPrice && bill.koiPrice > 0) {
        const koiKey = bill.koiDescription || "Unknown Koi";
        if (!koiSales[koiKey]) {
          koiSales[koiKey] = {
            name: koiKey,
            sales: 0,
            revenue: 0,
          };
        }
        koiSales[koiKey].sales += 1;
        koiSales[koiKey].revenue += bill.koiPrice;
      }
    });

    return Object.values(koiSales)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)
      .map((koi, index) => ({
        ...koi,
        key: index,
        rank: index + 1,
      }));
  };

  const totalRevenue = bills.reduce(
    (sum, bill) => sum + (bill.totalPrice || 0),
    0
  );

  const processChartData = () => {
    const data = [];
    const dailyRevenue = {};
    const dailyQuotations = {};

    bills.forEach((bill) => {
      if (bill.paymentDate) {
        const date = new Date(bill.paymentDate).toLocaleDateString();
        dailyRevenue[date] = (dailyRevenue[date] || 0) + (bill.totalPrice || 0);

        if (bill.quotationId) {
          dailyQuotations[date] = (dailyQuotations[date] || 0) + 1;
        }
      }
    });

    const allDates = [
      ...new Set([
        ...Object.keys(dailyRevenue),
        ...Object.keys(dailyQuotations),
      ]),
    ].sort();

    allDates.forEach((date) => {
      if (dailyRevenue[date]) {
        data.push({
          date,
          type: "Doanh thu",
          value: dailyRevenue[date],
        });
      }

      const totalForDay = dailyRevenue[date] || 0;
      data.push({
        date,
        type: "Tổng doanh thu",
        value: totalForDay,
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
    tooltip: {
      showMarkers: false,
      shared: true,
      formatter: (datum) => {
        return {
          name: datum.type,
          value: new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(datum.value),
        };
      },
    },
    color: ["#1979C9", "#D62A0D", "#FAA219"],
  };

  const columns = {
    tours: [
      {
        title: "Rank",
        dataIndex: "rank",
        key: "rank",
        width: 60,
        render: (rank) => (
          <span>
            {rank === 1 && <TrophyOutlined style={{ color: "#FFD700" }} />}
            {rank === 2 && <TrophyOutlined style={{ color: "#C0C0C0" }} />}
            {rank === 3 && <TrophyOutlined style={{ color: "#CD7F32" }} />}
            {rank > 3 && rank}
          </span>
        ),
      },
      {
        title: "Tour",
        dataIndex: "name",
        key: "name",
        ellipsis: true,
      },
      {
        title: "Bookings",
        dataIndex: "bookings",
        key: "bookings",
        width: 100,
        align: "right",
      },
      {
        title: "Revenue",
        dataIndex: "revenue",
        key: "revenue",
        width: 120,
        align: "right",
        render: (value) =>
          new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(value),
      },
    ],
    kois: [
      {
        title: "Rank",
        dataIndex: "rank",
        key: "rank",
        width: 60,
        render: (rank) => (
          <span>
            {rank === 1 && <TrophyOutlined style={{ color: "#FFD700" }} />}
            {rank === 2 && <TrophyOutlined style={{ color: "#C0C0C0" }} />}
            {rank === 3 && <TrophyOutlined style={{ color: "#CD7F32" }} />}
            {rank > 3 && rank}
          </span>
        ),
      },
      {
        title: "Koi",
        dataIndex: "name",
        key: "name",
        ellipsis: true,
      },
      {
        title: "Sales",
        dataIndex: "sales",
        key: "sales",
        width: 80,
        align: "right",
      },
      {
        title: "Revenue",
        dataIndex: "revenue",
        key: "revenue",
        width: 120,
        align: "right",
        render: (value) =>
          new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(value),
      },
    ],
  };

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
                formatter={(value) =>
                  new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(value)
                }
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={16} className="charts" style={{ marginTop: "24px" }}>
          <Col span={12}>
            <Card title="Biểu đồ thống kê doanh thu">
              <Line {...config} />
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Best Koi Seller" bodyStyle={{ padding: "0 0 8px 0" }}>
              <Table
                dataSource={bestKois}
                columns={columns.kois}
                pagination={false}
                size="small"
                scroll={{ y: 240 }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              title="Best Tour Booking"
              bodyStyle={{ padding: "0 0 8px 0" }}
            >
              <Table
                dataSource={bestTours}
                columns={columns.tours}
                pagination={false}
                size="small"
                scroll={{ y: 240 }}
              />
            </Card>
          </Col>
        </Row>{" "}
      </div>
    </>
  );
};

export default DashboardView;
