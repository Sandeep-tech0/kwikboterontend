import React, { useEffect, useState } from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { userRegister } from "../../../Services/SuperAdmin/apiCall";
import { handleValidation } from "./validation";
import { toast } from "react-toastify";
const steps = [" Add User", "Create Plan"];

const WizardModal = ({ show, onHide, data }) => {
  const [currentStep, setCurrentStep] = useState(0);

  ///---- Add User form handle next function ------------------
  const handleNext = () => {
    console.log("formdata", formData);

    try {
      const isValid = handleValidation(formData, setErrorMessage);

      if (isValid) {
        if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1);
        }
      }
    } catch (error) {
      alert(error, "errpr in validation");
    }
  };

  ///---- Add User form handle  button previous function ------------------
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const [subscriptionPlan, setSubscriptionPlan] = useState({
    frequency: "",
    amount: "",
    setUpAmount: 0,
    isSetUpAmountApplicable: true,
    planName: "Basic Plan",
    currency: "USD",
    applicableTaxPercentage: 0,
    isDeleted: false,
    description: [
      {
        title: "Subscription Fee",
        amount: 0,
        isPayable: true,
      },
    ],
    renewals: [],
  });

  /// ---- Add User form handle ------------------
  const [errorMessage, setErrorMessage] = useState({});
  const [isSetUpFeeWaived, setIsSetUpFeeWaived] = useState(false);
  const [formData, setFormData] = useState({
    user: {
      firstName: "",
      lastName: "",
      userType: "ClientUser",
      country: "",
      email: "",
      phone: "",
      password: "",
    },
    client: {
      organizationName: "",
      industry: "",
      subscriptionPlans: [subscriptionPlan],
      contents: [],
    },
  });

  ///---- Add User form handle  input change function ------------------

  const handleSubscriptionChanges = (e) => {
    const { name, value } = e.target;

    if (name === "setUpAmount" && isSetUpFeeWaived) {
      setSubscriptionPlan((prevPlan) => ({
        ...prevPlan,
        [name]: "0", // Set the value explicitly to "0"
      }));
    } else {
      setSubscriptionPlan((prevPlan) => ({
        ...prevPlan,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      client: {
        ...prevFormData.client,
        subscriptionPlans: [subscriptionPlan],
      },
    }));
  }, [subscriptionPlan]);

  const handleInputChange = (event, section, field, index = null) => {
    const { value } = event.target;

    setFormData((prevFormData) => {
      const updatedSection = { ...prevFormData[section] };
      if (index !== null && updatedSection.subscriptionPlans) {
        const updatedPlans = [...updatedSection.subscriptionPlans];
        updatedPlans[index] = {
          ...updatedPlans[index],
          [field]: value,
        };
        updatedSection.subscriptionPlans = updatedPlans;
      } else {
        updatedSection[field] = value;
      }

      return {
        ...prevFormData,
        [section]: updatedSection,
      };
    });
  };

  // ===================== check box =====================//
  const handleCheckboxChange = (event) => {
    setIsSetUpFeeWaived(event.target.checked);
    setSubscriptionPlan((prevPlan) => ({
      ...prevPlan,
      isSetUpAmountApplicable: !event.target.checked, // Invert the value
    }));
  };
  //---- Add User form handle  submit  ------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("formdata on submit ", formData);
      const errors = {};
      
      if (!formData.client.subscriptionPlans[0].setUpAmount) {
        errors.setUpAmount = " setUpAmount is required";
      }else if (formData.client.subscriptionPlans[0].setUpAmount <= 0) {
        errors.amount = "setUpAmount should be greater than 0";
      }

      if (!formData.client.subscriptionPlans[0].amount) {
        errors.amount = "Amount is required";
      }else if (formData.client.subscriptionPlans[0].amount <= 0) {
        errors.amount = "Amount should be greater than 0";
      }

      if (!formData.client.subscriptionPlans[0].frequency) {
        errors.frequency = "Time Period is required";
      }
      setErrorMessage(errors);

      if (Object.keys(errors).length === 0) {
        try {
          const newData = formData;
          const apiResponse = await userRegister({ newData });
          toast.success(apiResponse.message);
          console.log(apiResponse);
          //===== reset form data after submit ==========
          setFormData({
            user: {
              firstName: "",
              lastName: "",
              country: "",
              email: "",
              phone: "",
              password: "",
            },
            client: {
              organizationName: "",
              industry: "",
              subscriptionPlans: [subscriptionPlan],
            },
          });
          setSubscriptionPlan({
            frequency: "",
            amount: "",
            setUpAmount: "",
          });
          setErrorMessage({});
          data();
          onHide();
          setCurrentStep(0);
        } catch (error) {
          if (error.response.data.message) {
            toast.error(error.response.data.message);
          } else {
            toast.error("server error");
          }
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  ///------- Add User form handle  input focus function ------------------

  const handleInputFocus = (e) => {
    const { name } = e.target;

    setErrorMessage((prevMessage) => ({
      ...prevMessage,
      [name]: "",
    }));
  };

  ///===================== handle modal close =====================//
  const handleClose = () => {
    setFormData({
      user: {
        firstName: "",
        lastName: "",
        country: "",
        email: "",
        phone: "",
        password: "",
      },
      client: {
        organizationName: "",
        industry: "",
        subscriptionPlans: [subscriptionPlan],
      },
    });
    setSubscriptionPlan({
      frequency: "",
      amount: "",
      setUpAmount: "",
    });
    setErrorMessage({});
    setCurrentStep(0);
    onHide();
  }

  return (
    <Modal
      key={"AddShow"}
      show={show}
      onHide={handleClose}
      animation={true}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <button className="custom-close-button" onClick={handleClose}>
          &times;
        </button>
        <Modal.Title>
          <div className="modelhead">
            <div className="progressBar">
              {steps.map((step, index) => (
                <div className="progressBarStep" key={index}>
                  <div
                    className={`stepCircle ${
                      index < currentStep ? "active" : ""
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="setpmodel">{step}</div>
                  {index < currentStep && index < steps.length - 1 && (
                    <div className="progressBarFill" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {currentStep === 0 && (
          <div>
            <Row className="mt-4">
              <Col xs={6}>
                <div className="input-topposition">
                  <label className="toplabel">First Name </label>
                  <input
                    type="text"
                    placeholder=""
                    className="input-model"
                    onChange={(event) =>
                      handleInputChange(event, "user", "firstName")
                    }
                    value={formData.user.firstName}
                    name="firstName"
                    onFocus={handleInputFocus}
                  />

                  <div className="email-content-h ">
                    <span style={{ color: "red", textAlign: "center" }}>
                      {errorMessage.firstName}
                    </span>
                  </div>
                </div>
              </Col>

              <Col xs={6}>
                <div className="input-topposition">
                  <label className="toplabel">Last Name </label>
                  <input
                    type="text"
                    placeholder=""
                    className="input-model"
                    onChange={(event) =>
                      handleInputChange(event, "user", "lastName")
                    }
                    value={formData.user.lastName}
                    name="lastName"
                    onFocus={handleInputFocus}
                  />

                  <div className="email-content-h ">
                    <span style={{ color: "red", textAlign: "center" }}>
                      {errorMessage.lastName}
                    </span>
                  </div>
                </div>
              </Col>
            </Row>

            <Row className="">
              <Col xs={6}>
                <div className="input-topposition">
                  <label className="toplabel">Email ID</label>
                  <input
                    type="text"
                    placeholder=""
                    className="input-model"
                    onChange={(event) =>
                      handleInputChange(event, "user", "email")
                    }
                    value={formData.user.email}
                    name="email"
                    onFocus={handleInputFocus}
                  />

                  <div className="email-content-h ">
                    <span style={{ color: "red", textAlign: "center" }}>
                      {errorMessage.email}
                    </span>
                  </div>
                </div>
              </Col>

              <Col xs={6}>
                <div className="input-topposition">
                  <label className="toplabel">Phone No </label>
                  <input
                    type="tel"
                  
                    className="input-model"
                    onChange={(event) =>
                      handleInputChange(event, "user", "phone")
                    }
                    value={formData.user.phone}
                    name="phone"
                    onFocus={handleInputFocus}
                  />

                  <div className="email-content-h ">
                    <span style={{ color: "red", textAlign: "center" }}>
                      {errorMessage.phone}
                    </span>
                  </div>
                </div>
              </Col>
            </Row>

            <Row className="">
              <Col xs={6}>
                <div className="input-topposition">
                  <label className="toplabel">Organization name </label>
                  <input
                    type="text"
                    placeholder=""
                    className="input-model"
                    onChange={(event) =>
                      handleInputChange(event, "client", "organizationName")
                    }
                    value={formData.client.organizationName}
                    name="organizationName"
                    onFocus={handleInputFocus}
                  />

                  <div className="email-content-h ">
                    <span style={{ color: "red", textAlign: "center" }}>
                      {errorMessage.organizationName}
                    </span>
                  </div>
                </div>
              </Col>

              <Col xs={6}>
                <div className="input-topposition">
                  <label className="toplabel">Industry </label>
                  <input
                    type="text"
                    placeholder=""
                    className="input-model"
                    onChange={(event) =>
                      handleInputChange(event, "client", "industry")
                    }
                    value={formData.client.industry}
                    name="industry"
                    onFocus={handleInputFocus}
                  />

                  <div className="email-content-h ">
                    <span style={{ color: "red", textAlign: "center" }}>
                      {errorMessage.industry}
                    </span>
                  </div>
                </div>
              </Col>
            </Row>

            <Row className="">
              <Col xs={6}>
                <div className="input-topposition">
                  <label className="toplabel">Choose Password </label>
                  <input
                    type="password"
                    className="input-model"
                    onChange={(event) =>
                      handleInputChange(event, "user", "password")
                    }
                    value={formData.user.password}
                    name="password"
                    onFocus={handleInputFocus}
                  />

                  <div className="email-content-h ">
                    <span style={{ color: "red", textAlign: "center" }}>
                      {errorMessage.password}
                    </span>
                  </div>
                </div>
              </Col>

              <Col xs={6}>
                <div className="input-topposition">
                  <label className="toplabel">Rewrite Password </label>
                  <input
                    type="password"
                    placeholder=""
                    className="input-model"
                    onChange={(event) =>
                      handleInputChange(event, "user", "passwordrewrite")
                    }
                    value={formData.user.passwordrewrite}
                    name="passwordrewrite"
                    onFocus={handleInputFocus}
                  />

                  <div className="email-content-h ">
                    <span style={{ color: "red", textAlign: "center" }}>
                      {errorMessage.passwordrewrite}
                    </span>
                  </div>
                </div>
              </Col>
            </Row>

            <Row className="">
              <Col xs={6}>
                <div className="input-topposition">
                  <label className="toplabel">Country </label>
                  <input
                    type="text"
                    placeholder=""
                    className="input-model"
                    onChange={(event) =>
                      handleInputChange(event, "user", "country")
                    }
                    value={formData.user.country}
                    name="country"
                    onFocus={handleInputFocus}
                  />

                  <div className="email-content-h ">
                    <span style={{ color: "red", textAlign: "center" }}>
                      {errorMessage.country}
                    </span>
                  </div>
                </div>
              </Col>

              <Col xs={6}></Col>
            </Row>
          </div>
        )}

        {currentStep === 1 && (
          <div>
            <Row className="mt-4 mb-4">
              <Col xs={6}>
                <div className="input-topposition">
                  <label className="toplabel">Set Up Fee </label>
                  <input
                    type="number"
                    placeholder=""
                    className="input-model"
                    value={formData.client.subscriptionPlans[0].setUpAmount}
                    onChange={(event) => handleSubscriptionChanges(event)}
                    name="setUpAmount"
                    onFocus={handleInputFocus}
                    disabled={isSetUpFeeWaived}
                  />

                  <div className="email-content-h ">
                    <span style={{ color: "red", textAlign: "center" }}>
                      {errorMessage.setUpAmount}
                    </span>
                  </div>

                  <div>
                    <input
                      type="checkbox"
                      id="waveSetUpFeeCheckbox"
                      name="waveSetUpFee"
                      value="huey"
                      onChange={handleCheckboxChange}
                      checked={isSetUpFeeWaived}
                    />
                    {" "}Wave off set up fees for this user
                  </div>
                </div>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col xs={6}>
                <div className="input-topposition">
                  <label className="toplabel">Subscription Amount ($)</label>
                  <input
                    type="number"
                    className="input-model"
                    name="amount"
                    value={formData.client.subscriptionPlans[0].amount}
                    onChange={(event) => handleSubscriptionChanges(event)}
                    onFocus={handleInputFocus}
                  />

                  <div className="email-content-h ">
                    <span style={{ color: "red", textAlign: "center" }}>
                      {errorMessage.amount}
                    </span>
                  </div>
                </div>
              </Col>

              <Col xs={6}>
                <div className="input-topposition">
                  <label className="toplabel">Time Period </label>
                  <Form.Select
                    aria-label="Default select example"
                    className="input-model"
                    value={formData.client.subscriptionPlans[0].frequency}
                    onChange={(event) => handleSubscriptionChanges(event)}
                    onFocus={handleInputFocus}
                    name="frequency"
                  >
                    <option>Select Time Period</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                  </Form.Select>

                  <div className="email-content-h ">
                    <span style={{ color: "red", textAlign: "center" }}>
                      {errorMessage.frequency}
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        {currentStep > 0 && (
          <Button variant="secondary" onClick={handlePrevious}>
            Previous
          </Button>
        )}
        {currentStep < steps.length - 1 && (
          <Button variant="primary" onClick={handleNext}>
            Save & Next
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button variant="primary" onClick={(e) => handleSubmit(e)}>
            Finish
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default WizardModal;
