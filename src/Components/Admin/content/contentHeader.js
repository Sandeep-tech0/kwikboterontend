
import { Link, useLocation } from "react-router-dom";

const ContentHeader = () => {
  const location = useLocation();

  return (
    <div>
      <div class="heading-profile">
        <h2>Content </h2>
        <ul>
          <Link
           to="/admin/addcontent"
            className={`li-${
              location.pathname === "/admin/addcontent" ? "active" : ""
            }`}
           
          >
            <li>Input Content</li>
          </Link>

          <Link to="/admin/contenthistory" 
          className={`li-${
              location.pathname === "/admin/contenthistory" ? "active" : ""
            }`} >
            <li> Content History </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default ContentHeader;
