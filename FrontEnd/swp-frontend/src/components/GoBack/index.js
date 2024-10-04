import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function GoBack() {
      const navigate = useNavigate();

      const handleBack = () => {
            navigate(-1);
      };

      return (
            <Button onClick={handleBack}>
                  Trở lại
            </Button>
      );
}
export default GoBack;