import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import { sendotp, verifyotp } from "../../../Services/Admin/forgotPasswordapi";
import { FloatButton } from "antd";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [resetInfo, setResetInfo] = useState({
    email: "",
    otp: "",
  });
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [error, setError] = useState({});
  const [timerCounter, setTimerCounter] = useState(59);
  const [isReadytoResendOtp, setIsReadytoResendOtp] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResetInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
    setError({ ...error, [name]: "" });
  };

  ///=================Send OTP===================///
  const handleSendOtp = async () => {
    const newError = {};
    if (!resetInfo.email) {
      newError.email = "Please enter email";
    } else if (!/\S+@\S+\.\S+/.test(resetInfo.email)) {
      newError.email = "Email is invalid";
    }
    setError(newError);

    if (Object.keys(newError).length === 0) {
      try {
        console.log(resetInfo.email);
        const sendOtpResponse = await sendotp({ email: resetInfo.email });

        if (sendOtpResponse.success) {
          toast.success(sendOtpResponse.message);
          setShowOtpInput(true);
        }
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
      }
    }
  };

  ///=================Verify OTP===================///
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const newError = {};
    if (!resetInfo.otp) {
      newError.otp = "Please enter OTP";
    }
    setError(newError);

    if (Object.keys(newError).length === 0) {
      try {
        const otpVerifyResponse = await verifyotp(resetInfo);
        if (otpVerifyResponse.success) {
          navigate("/admin/resetpassword", {
            state: { email: resetInfo.email },
          });
        }
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
      }
    }
  };
  ///=================Resend OTP===================///

  const reSendOtpFunc = () => {
    setTimerCounter(59);
    setIsReadytoResendOtp(false);
    handleSendOtp();
  };

  useEffect(() => {
    const timer =
      timerCounter > 0
        ? setInterval(() => setTimerCounter(timerCounter - 1), 1000)
        : setIsReadytoResendOtp(true);
    return () => clearInterval(timer);
  }, [timerCounter]);

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <a className="navbar-brand" href="#">
              <img className="" src="/images/kwikbot-bran-logo.png" alt="" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0"></ul>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section className="">
          <div className="container mt-5 pt-3">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="loging-card">
                  <div class="heading-profile" style={{ marginRight: "150px" }}>
                    <h1>Forgot Password ?</h1>
                  </div>

                  <form className="text-center">
                    <div className="mb-4">
                      <input
                        type="email"
                        name="email"
                        value={resetInfo.email}
                        onChange={handleChange}
                        className="input-filed"
                        placeholder="Email ID"
                        disabled={showOtpInput}
                        required={true}
                      />
                      <div
                        style={{
                          textAlign: "center",
                          height: "30px",
                          paddingTop: "10px",
                        }}
                      >
                        <span style={{ color: "red", textAlign: "center" }}>
                          {error.email}
                        </span>
                      </div>
                      <div
                        className="text-right"
                        disabled={!isReadytoResendOtp}
                      >
                        {isReadytoResendOtp ? (
                          <a
                            className="cancel"
                            style={{
                              cursor: "pointer",
                              marginRight: "70px",
                              color: "#3B42C4",
                              display: !showOtpInput ? "none" : "",
                            }}
                            onClick={reSendOtpFunc}
                          >
                            Resend OTP ({timerCounter}s)
                          </a>
                        ) : (
                          <a
                            className="cancel"
                            style={{
                              cursor: "pointer",
                              marginRight: "70px",
                              display: !showOtpInput ? "none" : "",
                            }}
                          >
                            Resend OTP ({timerCounter}s)
                          </a>
                        )}
                      </div>
                    </div>

                    {!showOtpInput && (
                      <>
                      <div className="resendotpbutton" >
                        <input
                          type="button"
                          value="Send OTP"
                          className="sign-in-btn mb-4"
                          onClick={handleSendOtp}
                        />
                           
                      </div>
                      <a
                          className="cancel"
                          style={{ cursor: "pointer" }}
                          onClick={() => navigate(-1)}
                        >
                          Cancel
                        </a>
                        </>
                    )}

                    {showOtpInput && (
                      <>
                        <div className="mb-4 mt-5 ">
                          <input
                            type="number"
                            name="otp"
                            value={resetInfo.otp}
                            onChange={handleChange}
                            className="input-filed"
                            placeholder="OTP"
                          />
                          <div
                            style={{
                              textAlign: "center",
                              height: "30px",
                              paddingTop: "10px",
                            }}
                          >
                            <span style={{ color: "red", textAlign: "center" }}>
                              {error.otp}
                            </span>
                          </div>
                        </div>

                        <div className="resendotpbutton">
                          <input
                            type="button"
                            value="Verify OTP"
                            className="sign-in-btn mb-4"
                            onClick={handleVerifyOtp}
                          />
                        </div>
                        <a
                          className="cancel"
                          style={{ cursor: "pointer" }}
                          onClick={() => navigate(-1)}
                        >
                          Cancel
                        </a>
                      </>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ForgetPassword;
