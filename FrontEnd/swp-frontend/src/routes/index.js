import BookSuccess from "../components/BookSuccess";
import BookTour from "../components/BookTour";
import Cart from "../components/Cart";
import CheckOutKoi from "../components/CheckOutKoi";
import Feedback from "../components/Feedback";
import MyBill from "../components/MyBill";
import PayBooking from "../components/PayBooking";
import PaymentRemain from "../components/PaymentRemain";
import PaymentSuccess from "../components/PaySuccess";
import PrivateRoutes from "../components/privateRouter";
import TourResult from "../components/SearchTour/TourResult";
import ChangePasswordForm from "../components/Setting/ChangePasswordForm";
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutDefault from "../layouts/LayoutDefault";
import LayoutStaff from "../layouts/LayoutStaff";
import AboutUs from "../pages/AboutUs";
import Dashboard from "../pages/Admin/Dashboard";
import FarmManager from "../pages/Admin/FarmManager";
import CreateKoiFarm from "../pages/Admin/FarmManager/CreateKoiFarm";
import FarmDetail from "../pages/Admin/FarmManager/FarmDetail";
import FeedbackManage from "../pages/Admin/FeedbackManager";
import KoiManager from "../pages/Admin/KoiManager";
import CreateKoi from "../pages/Admin/KoiManager/CreateKoi";
import KoiDetail from "../pages/Admin/KoiManager/KoiDetail";
import KoiVarietyManager from "../pages/Admin/KoiVarietyManager";
import OrderManager from "../pages/Admin/OrderManager";
import QuotationManager from "../pages/Admin/QuotationManager";
import ServiceManager from "../pages/Admin/ServiceManager";
import StaffManager from "../pages/Admin/StaffManager";
import CreateStaff from "../pages/Admin/StaffManager/CreateStaff";
import TourManager from "../pages/Admin/Tour";
import CreateTour from "../pages/Admin/Tour/CreateTour";
import TourDetail from "../pages/Admin/Tour/TourDetail";
import UpdateTour from "../pages/Admin/Tour/UpdateTour";
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
import Checkin from "../pages/Staff/Checkin";
import DeliveryDate from "../pages/Staff/DeliveryDate";
import EstiminatedDate from "../pages/Staff/EstiminatedDate";
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
        element: <TourResult />,
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
              },
              {
                path: "settings",
                element: <ChangePasswordForm />,
              },
            ],
          },
          {
            path: "order-koi/:id/cart",
            element: <Cart />,
          },
          {
            path: "my-orders/feedback/:userId",
            element: <Feedback />,
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
          {
            path: "payment-remain/:id",
            element: <PaymentRemain />,
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
            path: "tour-update/:id",
            element: <UpdateTour />,
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
          {
            path: "feedback-manager",
            element: <FeedbackManage />,
          },
          {
            path: "order-manager",
            element: <OrderManager />,
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
            element: <EstiminatedDate />,
          },
          {
            path: "koi-delivery-date",
            element: <DeliveryDate />,
          },
          {
            path: "check-in",
            element: <Checkin />,
          },
        ],
      },
    ],
  },
];
