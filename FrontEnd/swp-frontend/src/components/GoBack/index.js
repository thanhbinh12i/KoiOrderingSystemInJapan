import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./GoBack.scss";

function GoBack() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Button className="go-back-button" onClick={handleBack}>
      Trở lại
    </Button>
  );
}
export default GoBack;
