import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkLogin } from '../../redux/actions/login';

function Logout(){
      const dispatch = useDispatch();
      const navigate = useNavigate();
      useEffect(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("id");
            localStorage.removeItem("role");
            dispatch(checkLogin(false));
            navigate("/");
            // eslint-disable-next-line
      }, [])
      return (
            <></>
      )
}
export default Logout;