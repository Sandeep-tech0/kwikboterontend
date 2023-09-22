import React, { useState } from "react";
import { cancelrenewalapi } from "../../../Services/Admin/subscriptionApiCall";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CancelRenewal = ({ onHide, renewalId }) => {
  const navigate = useNavigate();
  const [reasons, setReasons] = useState([]);
  const [otherReason, setOtherReason] = useState("");
  const [error, setError] = useState("");
  const clientId = localStorage.getItem("clientId");

  const handleReasonChange = (event) => {
    const value = event.target.value;
    if (reasons.includes(value)) {
      setReasons(reasons.filter((reason) => reason !== value));
    } else {
      setReasons([...reasons, value]);
    }
  };

  const handleOtherReasonChange = (event) => {
    setOtherReason(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (reasons.length === 0) {
      setError("*Please select atleast one reason");
      return;
    }

    const newdata = {
      renewal_id: renewalId,
      subscriptionID: localStorage.getItem("subscriptionId"),
      isCancelled: true,
      cancellationReason: reasons,
      fullReason: otherReason,
    };

    try {
      const cancelRenewal = await cancelrenewalapi({ clientId, newdata });

      if (cancelRenewal.success === true) {
        toast.success("Your subscription has been cancelled successfully");
      onHide()
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.request.response.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="profile-card ">
      <h5>
        Cancel Renewal{" "}
        <span
          className="sm-gr-fnt"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
        >
          <i className="fa-solid fa-angle-right"></i> Back
        </span>
      </h5>
      <h4 className="bld-byline">
        You’re about to cancel your subscription renewal
      </h4>
      <p className="line-sm">
        You can continue enjoying your plan benefits until the end of the
        billing period. After that, you will only be able to download free
        assets.
      </p>
      <p className="sub-textbld">
        Please, tell us why you’re canceling your subscription renewal. Select
        more than one option if needed.
      </p>
      <form onSubmit={handleSubmit}>
        <ul className="cancel-renewal-ul">
          <li>
            <label>
              <input
                className="larger"
                type="checkbox"
                value="no_longer_need"
                checked={reasons.includes("no_longer_need")}
                onChange={handleReasonChange}
              />{" "}
              I no longer need a subscription.
            </label>
          </li>
          <li>
            <label>
              <input
                className="larger"
                type="checkbox"
                value="too_expensive"
                checked={reasons.includes("too_expensive")}
                onChange={handleReasonChange}
              />{" "}
              It’s too expensive for me.
            </label>
          </li>
          <li>
            <label>
              <input
                className="larger"
                type="checkbox"
                value="dont_use_often"
                checked={reasons.includes("dont_use_often")}
                onChange={handleReasonChange}
              />{" "}
              I don’t use it that often.
            </label>
          </li>
          <li>
          <div style={{ 
                        
                  
                         height:"30px",
                         paddingTop:"10px",
                         color: 'red',
                          }}>
                         <span>{error}</span>
                      </div>
          </li>

        </ul>
        
                     
        <p className="some-tap-line">
          Is there something else you want to share with us?
        </p>

        <textarea
          name="otherReason"
          value={otherReason}
          onChange={handleOtherReasonChange}
          className="textarea-cancel-renewal input-filed-profile text-area-heightfix"
        ></textarea>
       

        <div className="text-right">
          <a
            class="cancel"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(-1)}
          >
            Cancel
          </a>
          <button type="submit" className="save-changes">
            Cancel Renewal
          </button>
        </div>
      </form>
    </div>
  );
};

export default CancelRenewal;
