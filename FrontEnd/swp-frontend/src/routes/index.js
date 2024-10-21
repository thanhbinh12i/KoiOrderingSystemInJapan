import BookSuccess from "../components/BookSuccess";
import BookTour from "../components/BookTour";
import Cart from "../components/Cart";
import CheckOutKoi from "../components/CheckOutKoi";
import MyBill from "../components/MyBill";
import PayBooking from "../components/PayBooking";
import PaymentSuccess from "../components/PaySuccess";
import PrivateRoutes from "../components/privateRouter";
import TourResult from "../components/SearchTour/TourResult";
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutDefault from "../layouts/LayoutDefault";
import LayoutStaff from "../layouts/LayoutStaff";
import AboutUs from "../pages/AboutUs";
import Dashboard from "../pages/Admin/Dashboard";
import FarmManager from "../pages/Admin/FarmManager";
import CreateKoiFarm from "../pages/Admin/FarmManager/CreateKoiFarm";
import FarmDetail from "../pages/Admin/FarmManager/FarmDetail";
import KoiManager from "../pages/Admin/KoiManager";
import CreateKoi from "../pages/Admin/KoiManager/CreateKoi";
import KoiDetail from "../pages/Admin/KoiManager/KoiDetail";
import KoiVarietyManager from "../pages/Admin/KoiVarietyManager";
import QuotationManager from "../pages/Admin/QuotationManager";
import ServiceManager from "../pages/Admin/ServiceManager";
import StaffManager from "../pages/Admin/StaffManager";
import CreateStaff from "../pages/Admin/StaffManager/CreateStaff";
import TourManager from "../pages/Admin/Tour";
import CreateTour from "../pages/Admin/Tour/CreateTour";
import TourDetail from "../pages/Admin/Tour/TourDetail";
import UserManager from "../pages/Admin/UserManager";
import Farm from "../pages/Farm";
import FarmDetailUser from "../pages/Farm/FarmDetail";
import Home from "../pages/Home";
import Koi from "../pages/Koi";
import KoiDetailById from "../pages/Koi/KoiDetailById";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import MyBooking from "../pages/MyBooking";
import MyOrder from "../pages/MyOrder";
import OrderKoi from "../pages/OrderKoi";
import Profile from "../pages/Profile";
import MainContent from "../pages/Profile/MainContent";
import Register from "../pages/Register";
import DeliveryDate from "../pages/Staff/DeliveryDate";
import EliminatedDate from "../pages/Staff/EliminatedDate";
import KoiDeal from "../pages/Staff/KoiDeal";
import KoiDealDetail from "../pages/Staff/KoiDeal/KoiDealDetail";
import Quotation from "../pages/Staff/Quotation";
import Tour from "../pages/Tours";
import TourDetailUser from "../pages/Tours/TourDetail";
import Variety from "../pages/Variety";
import KoiByVariety from "../pages/Variety/KoiByVariety";
export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "tours",
        element: <Tour />,
      },
      {
        path: "tours/:id",
        element: <TourDetailUser />,
      },
      {
        path: "/search-results",
        element: <TourResult />
      },
      {
        path: "farms",
        element: <Farm />,
      },
      {
        path: "farms/:id",
        element: <FarmDetailUser />,
      },
      {
        path: "kois",
        element: <Koi />,
      },
      {
        path: "kois/:id",
        element: <KoiDetailById />,
      },
      {
        path: "varieties",
        element: <Variety />,
      },
      {
        path: "varieties/:name",
        element: <KoiByVariety />,
      },
      {
        path: "aboutus",
        element: <AboutUs />,
      },
      {
        path: "order-koi/:id/cart",
        element: <Cart />,
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            element: <Profile />,
            children: [
              {
                path: "my-bookings",
                element: <MyBooking />,
              },
              {
                path: "profile",
                element: <MainContent />,
              },
              {
                path: "my-bills",
                element: <MyBill />,
              },
              {
                path: "my-orders",
                element: <MyOrder />,
              }
            ],
          },
          {
            path: "book-tour/:id",
            element: <BookTour />,
          },
          {
            path: "book-success",
            element: <BookSuccess />,
          },
          {
            path: "pay-booking/:id",
            element: <PayBooking />,
          },
          {
            path: "pay-success/:id",
            element: <PaymentSuccess />,
          },
          {
            path: "order-koi/:id",
            element: <OrderKoi />,
          },
          {
            path: "check-out-koi/:id",
            element: <CheckOutKoi />,
          },
        ],
      },
    ],
  },
  {
    element: <PrivateRoutes />,
    children: [
      {
        element: <LayoutAdmin />,
        children: [
          {
            path: "admin",
            element: <Dashboard />,
          },
          {
            path: "user-manager",
            element: <UserManager />,
          },
          {
            path: "farm-manager",
            element: <FarmManager />,
          },
          {
            path: "create-farm",
            element: <CreateKoiFarm />,
          },
          {
            path: "farm-detail/:id",
            element: <FarmDetail />,
          },
          {
            path: "koi-manager",
            element: <KoiManager />,
          },
          {
            path: "koi-detail/:id",
            element: <KoiDetail />,
          },
          {
            path: "create-koi",
            element: <CreateKoi />,
          },
          {
            path: "koivariety-manager",
            element: <KoiVarietyManager />,
          },
          {
            path: "service-manager",
            element: <ServiceManager />,
          },
          {
            path: "tour-manager",
            element: <TourManager />,
          },
          {
            path: "create-tour",
            element: <CreateTour />,
          },
          {
            path: "tour-detail/:id",
            element: <TourDetail />,
          },
          {
            path: "quotation-manager",
            element: <QuotationManager />,
          },
          {
            path: "staff-manager",
            element: <StaffManager />,
          },
          {
            path: "create-staff",
            element: <CreateStaff />,
          },
        ],
      },
      {
        path: "staff",
        element: <LayoutStaff />,
        children: [
          {
            path: "quotation-staff",
            element: <Quotation />,
          },
          {
            path: "koi-deal-staff",
            element: <KoiDeal />,
          },
          {
            path: "koi-deal-staff/:id",
            element: <KoiDealDetail />,
          },
          {
            path: "koi-eliminated-date",
            element: <EliminatedDate />,
          },
          {
            path: "koi-delivery-date",
            element: <DeliveryDate />,
          }
        ],
      },
    ],
  },
];
