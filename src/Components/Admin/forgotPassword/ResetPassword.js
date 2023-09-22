import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { resetpassword} from "../../../Services/Admin/forgotPasswordapi";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const stateData = location.state || {};
  const { email } = stateData;
  const [passwordError, setPasswordError] = useState("");

  const [data, setData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const saveChange = async () => {
    const newErrors = {};
    if (!data.newPassword) {
      newErrors.newPassword = "New Password is required";
    } else if (data.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    } else if (data.newPassword.length > 15) {
      newErrors.newPassword = "Password must be at most 15 characters";
    } else if (!data.newPassword.match(/[a-z]/g)) {
      newErrors.newPassword =
        "Password must contain at least one lowercase letter";
    } else if (!data.newPassword.match(/[A-Z]/g)) {
      newErrors.newPassword =
        "Password must contain at least one uppercase letter";
    } else if (!data.newPassword.match(/[0-9]/g)) {
      newErrors.newPassword = "Password must contain at least one number";
    } else if (!data.newPassword.match(/[^a-zA-Z\d]/g)) {
      newErrors.newPassword =
        "Password must contain at least one special character";
    }

    if (!data.confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required";
    if (data.newPassword !== data.confirmPassword)
      newErrors.confirmPassword = "Password does not match";

    setPasswordError(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const newData = {
        email,
        password: data.newPassword,
        confirmPassword: data.confirmPassword,
      };

      try {
        const response = await resetpassword(newData);
        if (response.success === true) {
          toast.success("Password changed successfully");
          navigate("/");
        }
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    }
  };
  const handleInputFocus = (e) => {
    const { name } = e.target;

    setPasswordError((prevMessage) => ({
      ...prevMessage,
      [name]: "",
    }));
  };

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
            <div className="row justify-content-center text-center">
              <div className="col-lg-6">
                <div className="loging-card">
                  <div class="heading-profile" style={{ marginRight: "150px" }}>
                    <h1>Forgot Password</h1>
                  </div>

                  <form action="" class="from-admin-pr">
                    <div class="position-relative">
                      <Input.Password
                        name="newPassword"
                        value={data.newPassword}
                        onChange={handleChange}
                        className="input-filed-profile"
                        placeholder="New Password"
                        onFocus={handleInputFocus}
                        iconRender={(visible) =>
                          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                      />
                      <label for="" class="po-ab-label">
                        New Password
                      </label>
                    </div>
                    <div style={{ height: "50px", paddingTop: "5px" }}>
                      <span style={{ color: "red", textAlign: "center" }}>
                        {passwordError.newPassword}
                      </span>
                    </div>

                    <div class="position-relative">
                      <Input.Password
                        name="confirmPassword"
                        value={data.confirmPassword}
                        onChange={handleChange}
                        className="input-filed-profile"
                        placeholder="Confirm Password"
                        onFocus={handleInputFocus}
                        iconRender={(visible) =>
                          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                      />

                      <label for="" class="po-ab-label">
                        Confirm Password
                      </label>
                    </div>
                    <div style={{ height: "50px", paddingTop: "5px" }}>
                      <span style={{ color: "red", textAlign: "center" }}>
                        {passwordError.confirmPassword}
                      </span>
                    </div>

                    <div className="resendotpbutton">
                      <input
                        type="button"
                        value="Reset Password"
                        className="sign-in-btn mb-4"
                        onClick={saveChange}
                      />
                    </div>
                    <a
                      className="cancel"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(-1)}
                    >
                      Cancel
                    </a>
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

export default ResetPassword;
