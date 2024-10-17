import { Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkLogin } from "../../actions/login";
function PrivateRoutes() {
      const dispatch = useDispatch();
      const token = localStorage.getItem("token");

      useEffect(() => {
            if (token) {
                  dispatch(checkLogin(true));
            }
      }, [dispatch, token]);
      return (
            <>
            {token ? (<Outlet />) : (
                  <Navigate to="/login"/>
            )}
            </>
      )
}
export default PrivateRoutes;