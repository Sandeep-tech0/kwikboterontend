import React, { useEffect, useState } from "react";
import Header from "../header";
import SubscribptionHeader from "./subscribptionHeader";
import CancelRenewal from "./cancel-renewal";
import { useNavigate } from "react-router-dom";
import { mysubscribption } from "../../../Services/Admin/subscriptionApiCall";
import moment from "moment";
import FirstTimeSubscription from "./FirstTimeSubscription";

const MySubscribption = () => {
  const height = {
    height: "163vh",
  };

  const clientId = localStorage.getItem("clientId");

  const [cancelRenewalButtonHandel, setcancelRenewalButtonHandel] =
    useState(false);
  const [subscribeAgainPage, setsubscribeAgainPage] = useState(false);
  const [cancelRenewalPage, setcancelRenewalPage] = useState(false);
  const [initialamount, setInitialamount] = useState(0);
  const [setupamount, setSetupamount] = useState(0);
  const [frequency, setFrequency] = useState("");
  const [subId, setSubId] = useState("");
  const [renewalData, setRenewalData] = useState("");
  const [firstTimeSubscription, setFirstTimeSubscription] = useState(false);
  const [renewalId, setRenewalId] = useState("");
  const [subcriptionInfo, setSubcriptionInfo] = useState([]);
  const [subscriptionEndDate, setSubscriptionEndDate] = useState("");

  const navigate = useNavigate();

  const handleCancelRenewal = (e, id) => {
    e.preventDefault();
    setcancelRenewalPage(false);
    setcancelRenewalButtonHandel(true);
    setRenewalId(id);
  };

  useEffect(() => {
    subcriptionData();
  }, []);

  const subcriptionData = async () => {
    try {
      const response = await mysubscribption(clientId);
      console.log(response);
      setSubcriptionInfo(response.data);
      if (response.data.renewals.length > 0) {
        setRenewalData([
          response.data.renewals[response.data.renewals.length - 1],
        ]);
        localStorage.setItem(
          "subscriptionId",
          response.data.renewals[0].subscription_id
        );
      }
      setSetupamount(response.data.setUpAmount);
      setInitialamount(response.data.amount);
      setFrequency(response.data.frequency);
      setSubId(response.data._id);
      if (
        response.data.renewals[response.data.renewals.length - 1] &&
        response.data.renewals[response.data.renewals.length - 1]
          .cancellationDate
      ) {
        const cancellationDate =
          response.data.renewals[response.data.renewals.length - 1]
            .cancellationDate;
        if (cancellationDate) {
          setSubscriptionEndDate(cancellationDate);
        }
      }

      if (response.data.renewals.length === 0 && !response.data.isRenew) {
        setFirstTimeSubscription(true);
      }

      if (
        response.data.renewals[response.data.renewals.length - 1]
          .isCancelled === false &&
        response.data.isRenew === false
      ) {
        setcancelRenewalPage(true); // Cancel renewal
      }

      if (
        response.data.renewals[response.data.renewals.length - 1]
          .isCancelled === true &&
        response.data.isRenew === false
      ) {
        setsubscribeAgainPage(true); // Subscribe again
      }

      
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = () => {
    setcancelRenewalButtonHandel(false);
    setcancelRenewalPage(false);
    window.location.reload();
  };

  const onGoingCharges = initialamount + setupamount;

  const handleSubscriptionAgain = (e) => {
    e.preventDefault();
    navigate("/admin/paymentinfo", { state: { onGoingCharges } });
  };

  return (
    <div>
      <Header />
      <section className="profile-page  heightcontrol" style={height}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <SubscribptionHeader />

              {cancelRenewalPage && (
                <div className="profile-card">
                  <h5>Cancel Renewal</h5>
                  {renewalData &&
                    renewalData.map((item, index) => {
                      return (
                        <>
                          <div key={index}>
                            <p>
                              Next payment <i class="fa fa-dollar" />{" "}
                              {item.amount} on{" "}
                              {moment(item.nextRenewalDate).format(
                                "D MMMM YYYY"
                              )}{" "}
                              (VAT may apply)
                            </p>
                            <span className="automatic-text">
                              *Automatic Renewal every month{" "}
                            </span>
                          </div>
                          <br />
                          <br />
                          <div className="text-right">
                            <a
                              href=""
                              className="canbtn-s active"
                              onClick={(e) => handleCancelRenewal(e, item._id)}
                            >
                              Cancel Renewal
                            </a>
                          </div>
                        </>
                      );
                    })}
                </div>
              )}
              {subscribeAgainPage && (
                <div className="profile-card">
                  <h5>Plan History</h5>

                  <div>
                    <p>
                      Your subscription of <i class="fa fa-dollar" />{" "}
                      {initialamount} is not active since{" "}
                      {moment(subscriptionEndDate).format("D MMMM YYYY")}.
                    </p>
                    <br />
                    <span className="automatic-text">
                      *You have cancelled your subscription
                    </span>
                  </div>
                  <br />
                  <br />
                  <div className="text-right">
                    <a
                      href=""
                      className="canbtn-s "
                      onClick={handleSubscriptionAgain}
                    >
                      Subscribe Again
                    </a>
                  </div>
                </div>
              )}

              {firstTimeSubscription && (
                <FirstTimeSubscription
                  state={{
                    initialamount,
                    setupamount,
                    frequency,
                    subId,
                    subcriptionInfo,
                  }}
                />
              )}

              {cancelRenewalButtonHandel && (
                <CancelRenewal onHide={handleBack} renewalId={renewalId} />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MySubscribption;
