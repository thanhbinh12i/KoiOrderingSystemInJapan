import PrivateRoutes from "../components/privateRouter";
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutDefault from "../layouts/LayoutDefault";
import Dashboard from "../pages/Admin/Dashboard";
import FarmManager from "../pages/Admin/FarmManager";
import KoiManager from "../pages/Admin/KoiManager";
import CreateKoi from "../pages/Admin/KoiManager/CreateKoi";
import KoiVarietyManager from "../pages/Admin/KoiVarietyManager";
import UserManager from "../pages/Admin/UserManager";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Profile from "../pages/Profile";
import Register from "../pages/Register";



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
                                    path: "koi-manager",
                                    element: <KoiManager />
                              },
                              {
                                    path: "create-koi",
                                    element: <CreateKoi />
                              },
                              {
                                    path: "koivariety-manager",
                                    element: <KoiVarietyManager />
                              }
                        ]
                  }
            ]
      }
]