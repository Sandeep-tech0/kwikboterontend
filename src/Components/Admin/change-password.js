import React, { useState } from "react";
import Header from "./header";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {  resetpassword } from "../../Services/Admin/forgotPasswordapi";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { Input } from "antd";

const ChangePassword = () => {
  const heigth = {
    height: "100vh",
  };
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
          navigate("/admin/profile");
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
      <Header />
      <main>
        <section class="profile-page" style={heigth}>
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-5">
                <div class="heading-profile">
                  <h1>Profile Settings</h1>
                </div>

                <div class="profile-card">
                  <h5>Change Password</h5>
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


                    <div style={{ height: "50px", paddingTop: "5px" }}>
                      <span style={{ color: "#272727", textAlign: "center" , fontSize:"13px"}}>
                    *Password must contain at least one number, one uppercase letter and one special character and at least 6 or more characters  </span>
                    </div>

               
                    <div class="text-right mt-5">
                      <a
                        class="cancel"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(-1)}
                      >
                        Cancel
                      </a>{" "}
                      <a
                        class="save-changes"
                        style={{ cursor: "pointer" }}
                        onClick={saveChange}
                      >
                        Save Changes
                      </a>
                    </div>
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

export default ChangePassword;
