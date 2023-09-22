import React, { useEffect, useState } from "react";
import PayPalButton from "./PayPal";
import Header from "../header";
import { createSubscription } from "../../../Services/Admin/subscriptionApiCall";

const PaymentMethod = () => {
  const [planId, setPlanId] = useState("");
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    paypalSubscriptionData();
  }, []);

  const clientId = localStorage.getItem("clientId");

  const paypalSubscriptionData = async () => {
    try {
      const response = await createSubscription({ clientId: clientId });
      setPlanId(response.data.paypalCreatePlanResponse.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <section class="profile-page">
        <div class="container">
          <div class=" row justify-content-center">
            <div class="col-lg-6">
              <div>
                <div class="heading-payment">
                  <h3>Payment Method </h3>
                </div>
              </div>

              <div className="heightcontrol">
                <div class="profile-card rom-admin-pr">
                  <div class="main-card-stm mb-5">
                    <div class="payment-card">
                      <div class="credite-card">
                        <div class="radio-btn">
                          <label>Credit Card</label>
                        </div>
                        <div class="/creditecard-image">
                          <img src="/images/visa.png" alt="" />
                          <img src="/images/master.png" alt="" />
                          <img src="/images/amex.png" alt="" />
                        </div>
                      </div>
                    </div>
                    <br />
                    <div>
                      <PayPalButton planId={planId} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaymentMethod;
