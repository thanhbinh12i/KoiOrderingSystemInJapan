import PrivateRoutes from "../components/privateRouter";
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutDefault from "../layouts/LayoutDefault";
import AboutUs from "../pages/AboutUs";
import Dashboard from "../pages/Admin/Dashboard";
import FarmManager from "../pages/Admin/FarmManager";
import CreateKoiFarm from "../pages/Admin/FarmManager/CreateKoiFarm";
import FarmDetail from "../pages/Admin/FarmManager/FarmDetail";
import KoiManager from "../pages/Admin/KoiManager";
import CreateKoi from "../pages/Admin/KoiManager/CreateKoi";
import KoiDetail from "../pages/Admin/KoiManager/KoiDetail";
import KoiVarietyManager from "../pages/Admin/KoiVarietyManager";
import ServiceManager from "../pages/Admin/ServiceManager";
import TourManager from "../pages/Admin/Tour";
import CreateTour from "../pages/Admin/Tour/CreateTour";
import TourDetail from "../pages/Admin/Tour/TourDetail";
import UserManager from "../pages/Admin/UserManager";
import Farm from "../pages/Farm";
import FarmDetailUser from "../pages/Farm/FarmDetail";
import Home from "../pages/Home";
import Koi from "../pages/Koi";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import Tour from "../pages/Tours";
import Variety from "../pages/Varitety";

export const routes = [
      {
            path: "/",
            element: <LayoutDefault />,
            children: [
                  {
                        index: true,
                        element: <Home />
                  },
                  {
                        path: "login",
                        element: <Login />
                  },
                  {
                        path: "register",
                        element: <Register />
                  },
                  {
                        path: "logout",
                        element: <Logout />
                  },
                  {
                        path: "tours",
                        element: <Tour />
                  },
                  {
                        path: "farms",
                        element: <Farm />
                  },
                  {
                        path: "farms/:id",
                        element: <FarmDetailUser />
                  },
                  {
                        path: "kois",
                        element: <Koi />
                  },
                  {
                        path: "varieties",
                        element: <Variety />
                  },
                  {
                        path: "aboutus",
                        element: <AboutUs />
                  },
                  {
                        element: <PrivateRoutes />,
                        children: [
                              {
                                    path: "profile",
                                    element: <Profile />
                              },
                        ]
                  }
            ]
      },
      {
            element: <PrivateRoutes />,
            children: 
            [     
                  {
                        element: <LayoutAdmin />,
                        children: [
                              {
                                    path: "admin",
                                    element: <Dashboard />
                              },
                              {
                                    path: "user-manager",
                                    element: <UserManager />
                              },
                              {
                                    path: "farm-manager",
                                    element: <FarmManager />
                              },
                              {
                                    path: "create-farm",
                                    element: <CreateKoiFarm />
                              },
                              {
                                    path: "farm-detail/:id",
                                    element: <FarmDetail />
                              },
                              {
                                    path: "koi-manager",
                                    element: <KoiManager />
                              },
                              {
                                    path: "koi-detail/:id",
                                    element: <KoiDetail />
                              },
                              {
                                    path: "create-koi",
                                    element: <CreateKoi />
                              },
                              {
                                    path: "koivariety-manager",
                                    element: <KoiVarietyManager />
                              },
                              {
                                    path: "service-manager",
                                    element: <ServiceManager />
                              },
                              {
                                    path: "tour-manager",
                                    element: <TourManager />
                              },
                              {
                                    path: "create-tour",
                                    element: <CreateTour />
                              },
                              {
                                    path: "tour-detail/:id",
                                    element: <TourDetail />
                              }
                        ]
                  }
            ]
      }
]
