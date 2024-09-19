import { Outlet } from "react-router-dom";

function Main() {
      return (
            <>
                  <div className="layout-default__main">
                        <div className="container">
                              <Outlet />
                        </div>
                  </div>
            </>
      )
}
export default Main;