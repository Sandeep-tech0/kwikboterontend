
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const RoutesProtected = (props) => {
    let Cmp = props.cmp;
  
    const [authorized, SetAuthorized] = useState(false);
  
    const navigate = useNavigate();
  
    const check = () => {
      if (!localStorage.getItem("token")) {
        localStorage.clear();
        navigate("/");
      } else {
        SetAuthorized(true);
      }
    };
  
    useEffect(() => {
      check();
    }, [0]);
  
    return authorized && <Cmp />;
  };