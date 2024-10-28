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
  const [koiBills, setKoiBills] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const [tours, setTours] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersData, billsData, koiBillsData, quotationsData, toursData] = await Promise.all([
        get("account/view-all-user"),
        get("bill/view-all"),
        get("koi-bill/view-all"),
        get("quotation/view-all"),
        get("tour/view-all")
      ]);

      await Promise.all([
        setUsers(usersData),
        setBills(billsData),
        setKoiBills(koiBillsData),
        setQuotations(quotationsData),
        setTours(toursData)
      ]);

      const [koiStats, tourStats] = await Promise.all([
        processKoiSales(koiBillsData, billsData),
        processTourBookings(billsData, toursData, quotationsData)
      ]);

      await Promise.all([
        setBestKois(koiStats),
        setBestTours(tourStats)
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getTourNameById = (tourId, tours) => {
    const tour = tours.find((t) => t.tourId === tourId);
    return tour ? tour.tourName : "Unknown Tour";
  };

  const processTourBookings = (billsData, tours, quotationsData) => {
    const tourBookings = {};

    billsData.forEach((bill) => {
      if (bill.quotationId) {
        const quotation = quotationsData.find(
          (q) => q.quotationId === bill.quotationId
        );
        if (quotation && quotation.tourId) {
          const tourName = getTourNameById(quotation.tourId, tours);
          if (!tourBookings[tourName]) {
            tourBookings[tourName] = {
              name: tourName,
              bookings: 0,
              revenue: 0,
            };
          }
          tourBookings[tourName].bookings += 1;
          tourBookings[tourName].revenue += bill.tourPrice || 0;
        }
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

  const processKoiSales = (koiBillsData, bills) => {
    const koiSales = {};
    bills.forEach((bills) => {
      koiBillsData.forEach((bill) => {
        if (bill.billId === bills.billId) {
          const koiName = bill.koiName || "Unknown Koi";
          if (bills.koiPrice !== null) {
            koiSales[koiName] = {
              name: koiName,
              sales: bill.quantity,
              revenue: bill.finalPrice * bill.quantity,
            };
          }
        }
      });
    });

    return Object.values(koiSales)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10)
      .map((koi, index) => ({
        ...koi,
        key: index,
        rank: index + 1,
      }));
  };

  const totalRevenue = bills.reduce(
    (sum, bill) => sum + (bill.koiPrice || 0) + (bill.tourPrice || 0),
    0
  );

  const processChartData = () => {
    const dailyStats = {};

    // Process bills for revenue
    bills.forEach((bill) => {
      if (bill.paymentDate) {
        const date = new Date(bill.paymentDate).toLocaleDateString("vi-VN");
        if (!dailyStats[date]) {
          dailyStats[date] = {
            tourRevenue: 0,
            koiRevenue: 0,
            quotationCount: 0,
          };
        }
        dailyStats[date].tourRevenue += bill.tourPrice || 0;
        dailyStats[date].koiRevenue += bill.koiPrice || 0;
      }
    });

    // Process quotations for count
    quotations.forEach((quotation) => {
      if (quotation.approvedDate) {
        const date = new Date(quotation.approvedDate).toLocaleDateString(
          "vi-VN"
        );
        if (!dailyStats[date]) {
          dailyStats[date] = {
            tourRevenue: 0,
            koiRevenue: 0,
            quotationCount: 0,
          };
        }
        dailyStats[date].quotationCount += 1;
      }
    });

    // Đảm bảo không có giá trị null
    const chartData = [];
    Object.entries(dailyStats)
      .sort((a, b) => new Date(a[0]) - new Date(b[0]))
      .forEach(([date, stats]) => {
        chartData.push(
          {
            date,
            type: "Doanh thu Tour",
            value: stats.tourRevenue || 0,
          },
          {
            date,
            type: "Doanh thu Koi",
            value: stats.koiRevenue || 0,
          },
          {
            date,
            type: "Số lượng báo giá",
            value: stats.quotationCount || 0,
          }
        );
      });

    return chartData;
  };

  const config = {
    data: processChartData(),
    xField: "date",
    yField: "value",
    seriesField: "type",
    smooth: true,
    point: {
      size: 5,
      shape: "circle",
      style: {
        fill: "white",
        stroke: "#5B8FF9",
        lineWidth: 2,
      },
    },
    yAxis: {
      label: {
        formatter: (v) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    legend: {
      position: "top",
      itemName: {
        style: {
          fontSize: 14,
        },
      },
    },
    animation: {
      appear: {
        animation: "path-in",
        duration: 1000,
      },
    },
    tooltip: {
      showMarkers: true,
      shared: true,
      showCrosshairs: true,
      crosshairs: {
        type: "xy",
      },
      formatter: (datum) => {
        if (datum.type === "Số lượng báo giá") {
          return {
            name: datum.type,
            value: datum.value.toString() + " báo giá",
          };
        }
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
    interactions: [
      {
        type: "marker-active",
      },
    ],
    lineStyle: {
      lineWidth: 3,
    },
    connectNulls: true,
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
        title: "Tên chuyến đi",
        dataIndex: "name",
        key: "name",
        ellipsis: true,
      },
      {
        title: "Số lượng booking",
        dataIndex: "bookings",
        key: "bookings",
        width: 100,
        align: "right",
      },
      {
        title: "Doanh thu",
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
        title: "Tên cá Koi",
        dataIndex: "name",
        key: "name",
        ellipsis: true,
      },
      {
        title: "Số lượng bán",
        dataIndex: "sales",
        key: "sales",
        width: 80,
        align: "right",
      },
      {
        title: "Doanh thu",
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
        <Col span={24}>
          <Card title="Biểu đồ thống kê doanh thu">
            <Line {...config} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Cá Koi Best Seller" bodyStyle={{ padding: "0 0 8px 0" }}>
            <Table
              dataSource={bestKois}
              columns={columns.kois}
              pagination={false}
              size="small"
              scroll={{ y: 240 }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="Chuyến Đi Best Booking"
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
      </Row>
    </div>
  );
};

export default DashboardView;
