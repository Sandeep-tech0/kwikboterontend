import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import swal from "sweetalert";
import { completeSubscription } from "../../../Services/Admin/subscriptionApiCall";
import { useNavigate } from "react-router-dom";

const PayPalButton = ({ planId }) => {
  console.log("planId============", planId);

  const navigate = useNavigate();
  const onSuccess = async (details, data) => {
    console.log("Subscription details:", details);
    console.log("Subscription data:", data);
    try {
      if (details.subscriptionID && details.orderID) {
        const subdata = {
          subscriptionID: details.subscriptionID,
          orderID: details.orderID,
          clientId: localStorage.getItem("clientId"),
        };
        await completeSubscription(subdata);
        navigate("/admin/confirm");

        console.log("Subscription completed!", details);
      } else {
        console.error("Missing subscriptionID or orderID in onSuccess data");
        swal("Oops...", "Something went wrong. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error completing subscription:", error);
      swal("Oops...", "Something went wrong. Please try again.", "error");
    }
  };

  const initialOptions = {
    "client-id":
      "ARu1RMS9PGNw2XNx4GFhf-rZ52gWTLuVF1bNBVifyefMu4VEpOq0W7LuBFi3ep_-x0l2K-vFo0pA0a2b",
    intent: "subscription",
    vault: true,
  };

  return (
    <div>
      <div>
        {planId ? (
          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
              createSubscription={(data, actions) => {
                return actions.subscription.create({
                  plan_id: planId,
                });
              }}
              onApprove={(data, actions) => onSuccess(data, actions)}
              onCancel={(data) => {
                console.log("Subscription cancelled!", data);
                swal(
                  "Oops...",
                  "Something went wrong. Please try again.",
                  "error"
                );
              }}
              onError={(err) => console.log("Subscription error!", err)}
            />
          </PayPalScriptProvider>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default PayPalButton;

//testing email : sb-ap1zp26583889@business.example.com
//testing password : nDk4>M1o
