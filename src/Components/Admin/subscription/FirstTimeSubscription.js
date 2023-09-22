import React from "react";
import { useNavigate } from "react-router-dom";

const FirstTimeLogin = (props) => {
  const { state } = props; // Destructure the state object
  const { initialamount, setupamount, frequency, subId, subcriptionInfo } =
    state;

  const navigate = useNavigate();

  const handleSubscription = (e) => {
    e.preventDefault();
    navigate("/admin/paymentinfo", { state: { onGoingCharges, subId } });
  };

  /// ========on going charges add amount and setup amount =========
  const onGoingCharges = initialamount + setupamount;

  return (
    <div class="profile-card">
      <h5>My Subscription</h5>
      <form action="" class="from-admin-pr">
        <div class="d-flex justify-content-between">
          <p class="text-login">Initial setup and training</p>{" "}
          {subcriptionInfo.isSetUpAmountApplicable == false ? (
            <p class="line-throght">
              <b style={{ textDecoration: "line-through" }}>
                ${subcriptionInfo.setUpAmount}
              </b>
            </p>
          ) : (
            <p>
              <b>${subcriptionInfo.setUpAmount}</b>
            </p>
          )}
        </div>
        <br />
        <div class="d-flex justify-content-between">
          <p class="text-login">Ongoing charges</p>{" "}
          <p class="blue-text-b">
            ${subcriptionInfo.amount}/{frequency}
          </p>
        </div>

        <div class="text-right mt-5">
          <a href="" class="subscribe-kwikbot" onClick={handleSubscription}>
            Subscribe to kwikbot
          </a>
        </div>
      </form>
    </div>
  );
};

export default FirstTimeLogin;
