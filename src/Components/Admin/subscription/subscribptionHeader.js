import React from "react";
import { Link, useLocation } from "react-router-dom";

const SubscribptionHeader = () => {
  const location = useLocation();
  return (
    <div>
      <div class="heading-profile">
        <h2>Subscription</h2>

        <ul>
          <li
            className={`li-${
              location.pathname === "/admin/mysubscribption" ? "active" : ""
            }`}
          >
            {" "}
            <Link to="/admin/mysubscribption" >My Subscription</Link>
          </li>
          <li
            className={`li-${
              location.pathname === "/admin/billinginformation" ? "active" : ""
            }`}
          >
            {" "}
            <Link to="/admin/billinginformation">Billing Information</Link>
          </li>
          <li
            className={`li-${
              location.pathname === "/admin/invoices" ? "active" : ""
            }`}
          >
            <Link to="/admin/invoices">Invoices </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SubscribptionHeader;
