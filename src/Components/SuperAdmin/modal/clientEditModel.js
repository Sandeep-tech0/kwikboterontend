import React, { useEffect, useState } from "react";
import { Modal, Button, Container, Row, Col, CloseButton } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {
  updateClientData,
  blockClient,
} from "../../../Services/SuperAdmin/apiCall";
import { handleValidation } from "./validation";
import { toast } from "react-toastify";

const steps = [" Add User", "Create Plan"];

const ClientEditModel = ({
  show2,
  onHide2,
  editclientdata,
  clientId1,
  userId,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isBlocked, setIsBlocked] = useState(editclientdata.isActive);
  console.log("isBlocked", editclientdata);

  const [isSetUpFeeWaived, setIsSetUpFeeWaived] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // ---- handle next and previous button ----

  const handleNextButton = () => {
    try {
      const isValid = handleValidation(formData, setErrorMessage);
      if (isValid) {
        if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1);
        }
      }
    } catch (error) {
      toast.error("Error in validation"); // Fixed the typo here
    }
  };

  const handlePreviousButton = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  ///================== get client data by id================

  const getClientData = async () => {
    try {
      // Create a new copy of formData
      const newData = { ...formData };
      // Populate user data
      newData.user.firstName = editclientdata.users[0].firstName;
      newData.user.lastName = editclientdata.users[0].lastName;
      newData.user.email = editclientdata.users[0].email;
      newData.user.phone = editclientdata.users[0].phone;
      newData.user.country = editclientdata.users[0].country;
      newData.user.password = editclientdata.users[0].password;

      // Populate client data
      newData.client.organizationName = editclientdata.organizationName;
      newData.client.industry = editclientdata.industry;
      // Populate subscription plan data (assuming there's only one plan)
      newData.client.subscriptionPlans[0].setUpAmount =
        editclientdata.subscriptionPlans[0].setUpAmount;
      newData.client.subscriptionPlans[0].amount =
        editclientdata.subscriptionPlans[0].amount;
      newData.client.subscriptionPlans[0].frequency =
        editclientdata.subscriptionPlans[0].frequency;
      newData.client.subscriptionPlans[0].isSetUpAmountApplicable =
        editclientdata.subscriptionPlans[0].isSetUpAmountApplicable;
      setFormData(newData); // Update formData with the new copy
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getClientData();
  }, []);

  ///---- Edit User form handle ------------------
  const [subscriptionPlan, setSubscriptionPlan] = useState({
    frequency: "",
    amount: "",
    setUpAmount: "",
    isSetUpAmountApplicable: "",
    planName: "Basic Plan",
    currency: "USD",
    GST: 0,
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

  const [errorMessage, setErrorMessage] = useState({});
  const [formData, setFormData] = useState({
    user: {
      firstName: "",
      lastName: "",
      userType: "ClientUser",
      country: "",
      email: "",
      phone: "",
      password: "",
      passwordrewrite: "",
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
    setSubscriptionPlan((prevPlan) => ({
      ...prevPlan,
      [name]: value,
    }));
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

  //---- Edit  User form handle  submit  ------------------

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      console.log("formdata on submit ", formData);
      const errors = {};
      if (!formData.client.subscriptionPlans[0].setUpAmount) {
        errors.setUpAmount = " setUpAmount is required";
      }else if (formData.client.subscriptionPlans[0].setUpAmount <= 0) {
        errors.amount = " setUpAmount should be greater than 0";
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
          const apiResponse = await updateClientData({
            newData,
            clientId: clientId1,
          });
          toast.success(apiResponse.message);
          console.log(apiResponse);

          setErrorMessage({});

          onHide2();
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

  //============================== block user ==============================//

  const handleBlockUser = async (e) => {
    e.preventDefault();
    try {
      const blockdata = {
        is_active: "false",
      };
      const apiResponse = await blockClient({ clientId: userId, blockdata });
      if (apiResponse.success == true) {
        toast.success("User Blocked Successfully");
        onHide2();
      }
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("server error");
      }
    }
  };

///================== handle unblock user ===========================
  const handleUnBlockUser = async (e) => {
    e.preventDefault();
    try {
      const blockdata = {
        is_active: "true",
      };
      const apiResponse = await blockClient({ clientId: userId, blockdata });
      if (apiResponse.success == true) {
        toast.success("User Unblocked Successfully");
        onHide2();
      }
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("server error");
      }
    }
  };


  // ===================== check box =====================//
  const handleCheckboxChange = (event) => {
    setIsSetUpFeeWaived(event.target.checked);
    setSubscriptionPlan((prevPlan) => ({
      ...prevPlan,
      isSetUpAmountApplicable: !event.target.checked, // Invert the value
    }));
  };

  ///------- Add User form handle  input focus function ------------------

  const handleInputFocus = (e) => {
    const { name } = e.target;

    setErrorMessage((prevMessage) => ({
      ...prevMessage,
      [name]: "",
    }));
  };
  return (
    <>
      <Modal
        key={"EditShow"}
        show={show2}
        onHide={onHide2}
        animation={true}
        size="lg"
        centered
      >
        <Modal.Header>
        <button className="custom-close-button" onClick={onHide2}>
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
                      type="text"
                      placeholder=""
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
                      type="text"
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
              <Row className="mt-4">
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
                      {"   "} {  "   "} Wave off set up fees for this user
                    </div>
                  </div>
                </Col>
              </Row>

              <Row className="mt-4">
                <Col xs={6}>
                  <div className="input-topposition">
                    <label className="toplabel">Subscription Amount ($)</label>
                    <input
                      type="text"
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
            <Button variant="secondary" onClick={handlePreviousButton}>
              Previous
            </Button>
          )}
          {currentStep < steps.length - 1 && (
            <>
              {!isBlocked ? (
                <Button variant="secondary" onClick={handleUnBlockUser}>
                  Unblock User
                </Button>
              ) : (
                <Button variant="secondary" onClick={handleShow}>
                  Block User
                </Button>
              )}

              <Button variant="primary" onClick={handleNextButton}>
                Save & Next
              </Button>
            </>
          )}
          {currentStep === steps.length - 1 && (
            <Button variant="primary" onClick={handleSaveChanges}>
              Finish
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    


      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        className="modal-blur"
      >
        <Modal.Header closeButton>
          <Modal.Title>Block User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are You absolutely sure you want to do that?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleBlockUser}>
            Block
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ClientEditModel;
