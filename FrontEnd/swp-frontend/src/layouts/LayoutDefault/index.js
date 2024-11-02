import React, { useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import "./LayoutDefault.scss";
function LayoutDefault() {
  useEffect(() => {
    var Tawk_API = Tawk_API || {};
    (function () {
      var s1 = document.createElement("script");
      var s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/6725f4804304e3196adc4604/1ibm465ka";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode.insertBefore(s1, s0);
    })();
  }, []);
  return (
    <>
      <div className="layout-default">
        <Header />
        <Main />
        <Footer />
      </div>
    </>
  );
}
export default LayoutDefault;
