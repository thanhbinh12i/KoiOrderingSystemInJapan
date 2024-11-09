import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import "./LayoutDefault.scss";
import { BackTop } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
function LayoutDefault() {
  return (
    <>
      <div className="layout-default">
        <Header />
        <Main />
        <BackTop>
          <ArrowUpOutlined />
        </BackTop>
        <Footer />
      </div>
    </>
  );
}
export default LayoutDefault;
