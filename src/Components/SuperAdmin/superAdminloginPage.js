import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { superAdminlogin } from "../../Services/SuperAdmin/authApiCall";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();

  // State for form inputs and errors
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  //========  Login API Call =========//
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const loginapiData = await superAdminlogin(formData);

        if (loginapiData.success) {
          const { token, user } = loginapiData.data;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/superadmin/users");
        } else {
          toast.error("Login failed: " + loginapiData.message);
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else if (error.request) {
          toast.error("No response from server");
        } else {
          toast.error("Error: " + error.message);
        }
      }
    }
  };

  const handleInputFocus = (e) => {
    const { name } = e.target;

    setErrors((prevMessage) => ({
      ...prevMessage,
      [name]: "",
    }));
  };

  return (
    <div>
      <main>
        <section>
          <Container className="text-center">
            <Row className="justify-content-md-center">
              <Col lg={6} xs={6} className="mx-auto">
                <div className="brand-logo-image">
                  <img
                    src="/images/superadminimages/kwikbot-bran-logo.png"
                    alt="logo"
                    className="img-fluid"
                  />
                </div>
              </Col>
              <Col lg={6} xs={6}>
                <div className="from-sauperabmin">
                  <Form>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        className={`input-soild m-0 ${
                          errors.email ? "is-invalid" : ""
                        }`}
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                      />

                      <div className="email-content-h ">
                        {errors.email && (
                          <div className="message-text">{errors.email}</div>
                        )}
                      </div>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        className={`input-soild m-0 ${
                          errors.password ? "is-invalid" : ""
                        }`}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                      />

                      <div className="email-content-h ">
                        {errors.password && (
                          <div className="message-text">{errors.password} </div>
                        )}
                      </div>
                    </Form.Group>
                    <button
                      type="submit"
                      className="login-btn-superadmin mt-0"
                      onClick={handleFormSubmit}
                    >
                      Login
                    </button>
                    <div className="text-right mt-3"></div>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </div>
  );
};

export default Home;
