import { useState, useEffect } from "react";
import Header from "../header";
import { useNavigate } from "react-router-dom";
import SubscribptionHeader from "./subscribptionHeader";
import { toast } from "react-toastify";
import { BillingInfoUpdate, billingInfo } from "../../../Services/Admin/userApiCall";
const BillingInformation = () => {
  const navigate = useNavigate();

  const [updateBillingInfo, setUpdateBillingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    state: "",
    city: "",
    zipcode: "",
    companyName: "",
    GSTIN: "",
    isCompany: false,
  });

  //====== get  billing info ======//
  const clientId = localStorage.getItem("clientId");
  useEffect(() => {
    getBillingInfo();
  }, []);

  const getBillingInfo = async () => {
    try {
      const apidata = await billingInfo({ clientId });

      setUpdateBillingInfo({
        ...updateBillingInfo,
        firstName: apidata.data.firstName,
        email: apidata.data.email,
        lastName: apidata.data.lastName,
        address: apidata.data.address,
        state: apidata.data.state,
        city: apidata.data.city,
        zipcode: apidata.data.zipcode,
        companyName: apidata.data.companyName,
        GSTIN: apidata.data.GSTIN,
        isCompany: apidata.data.isCompany,
      });
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked == false) {
      setUpdateBillingInfo((prevInfo) => ({
        ...prevInfo,
        [name]: checked,
        companyName: "",
        GSTIN: "",
      }));
    }
    setUpdateBillingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: checked,
    }));
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateBillingInfo({ ...updateBillingInfo, [name]: value });
  };

  const [errorMessage, setErrorMessage] = useState({});

  //===== handle  update billing info =====//
  const handleUpdateBillingInfo = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!updateBillingInfo.firstName) {
      errors.firstName = "First Name is required";
    }
 

    if (!updateBillingInfo.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(updateBillingInfo.email)) {
      errors.email = "please enter valid email";
    }
    if (!updateBillingInfo.address) {
      errors.address = "Address is required";
    }
    if (!updateBillingInfo.state) {
      errors.state = "State is required";
    }
    if (!updateBillingInfo.city) {
      errors.city = "City is required";
    }

    if (!updateBillingInfo.zipcode) {
      errors.zipcode = "Zipcode is required";
    } 
    if (updateBillingInfo.isCompany) {
      if (!updateBillingInfo.companyName) {
        errors.companyName = "Company Name is required";
      }
     
    }
    setErrorMessage(errors);

    if (updateBillingInfo.isCompany == false) {
      delete updateBillingInfo.companyName;
      delete updateBillingInfo.GSTIN;
    }

    if (Object.keys(errors).length === 0) {
      try {
        const response = await BillingInfoUpdate({clientId, updateBillingInfo });
        toast.success(response.data.message);
      } catch (error) {
        console.error("Error", error);
        toast.error(error.response.data.message);
      }
    }
  };

  const handleInputFocus = (e) => {
    const { name } = e.target;

    setErrorMessage((prevMessage) => ({
      ...prevMessage,
      [name]: "",
    }));
  };

  return (
    <div>
      <Header />
      <main>
        <section class="profile-page">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-6">
                <SubscribptionHeader />

                <div class="profile-card ">
                  <h5 class="">Billing Information</h5>
                  <form action="" class="from-admin-pr">
                    <div class=" position-relative">
                      <input
                        type="text"
                        onFocus={handleInputFocus}
                        name="firstName"
                        value={updateBillingInfo.firstName}
                        onChange={handleChange}
                        class="input-filed-profile"
                      />

                      <label for="" class="po-ab-label top12admin">
                        Customer first name
                      </label>

                        <div className="email-content-h2">
                        <span style={{ color: "red", textAlign: "center" }}>
                        {errorMessage.firstName}
                      </span>
                        </div>
                    </div>

                    <div class=" position-relative">
                      <input
                        type="text"
                        name="lastName"
                        value={updateBillingInfo.lastName}
                        onChange={handleChange}
                        class="input-filed-profile"
                        onFocus={handleInputFocus}
                      />
                      <label for="" class="po-ab-label top12admin">
                        {" "}
                        Last Name
                      </label>
                      <div className="email-content-h2"> 
                      <span style={{ color: "red", textAlign: "center" }}>
                        {errorMessage.lastName}
                      </span></div>
                      
                    </div>
                    <div class=" position-relative">
                      <input
                        type="email"
                        name="email"
                        value={updateBillingInfo.email}
                        onChange={handleChange}
                        class="input-filed-profile"
                        onFocus={handleInputFocus}
                      />
                      <label for="" class="po-ab-label top12admin">
                        {" "}
                        Email
                      </label>
                        <div className="email-content-h2">
                        <span style={{ color: "red", textAlign: "center" }}>
                        {errorMessage.email}
                      </span>  
                        </div>
                      
                    </div>
                    <div class="position-relative">
                      <input
                        type="text"
                        name="address"
                        value={updateBillingInfo.address}
                        onChange={handleChange}
                        onFocus={handleInputFocus}
                        class="input-filed-profile"
                      />
                      <label for="" class="po-ab-label top12admin">
                        {" "}
                        Address
                      </label>
                       <div className="email-content-h2">
                       <span style={{ color: "red", textAlign: "center" }}>
                        {errorMessage.address}
                      </span>
                       </div>
                     
                    </div>

                    <div class="position-relative">
                      <input
                        type="text"
                        name="state"
                        value={updateBillingInfo.state}
                        onChange={handleChange}
                        onFocus={handleInputFocus}
                        class="input-filed-profile"
                      />
                      <label for="" class="po-ab-label top12admin">
                        {" "}
                        State
                      </label>
                      <div className="email-content-h2">
                      <span style={{ color: "red", textAlign: "center" }}>
                        {errorMessage.state}
                      </span>
                      </div>
                      
                    </div>

                    <div class="position-relative">
                      <input
                        type="text"
                        name="city"
                        value={updateBillingInfo.city}
                        onChange={handleChange}
                        onFocus={handleInputFocus}
                        class="input-filed-profile"
                      />
                      <label for="" class="po-ab-label top12admin">
                        {" "}
                        City
                      </label>
                       <div className="email-content-h2">
                       <span style={{ color: "red", textAlign: "center" }}>
                        {errorMessage.city}
                      </span> 
                       </div>
                      
                    </div>
                    <div class="position-relative">
                      <input
                        type="number"
                        name="zipcode"
                        value={updateBillingInfo.zipcode}
                        onChange={handleChange}
                        onFocus={handleInputFocus}
                        class="input-filed-profile"
                      />
                      <label for="" class="po-ab-label top12admin">
                        {" "}
                        Zip Code
                      </label>
                       <div className="email-content-h2">
                       <span style={{ color: "red", textAlign: "center" }}>
                        {errorMessage.zipcode}
                      </span>
                       </div>
                      
                    </div>

                    <div class="mb-5">
                      <p class="blue-andbldtext">
                        <input
                          type="checkbox"
                          name="isCompany"
                          checked={updateBillingInfo.isCompany}
                          onChange={handleCheckboxChange}
                        />
                        Are you a company
                      </p>
                    </div>
                    {updateBillingInfo.isCompany && (
                      <>
                        <div class=" position-relative">
                          <input
                            type="text"
                            name="companyName"
                            value={updateBillingInfo.companyName}
                            onChange={handleChange}
                            onFocus={handleInputFocus}
                            class="input-filed-profile"                          
                          />
                          <label class="po-ab-label top12admin"> Company name</label>
                           <div className="email-content-h2">
                           <span style={{ color: "red", textAlign: "center" }}>
                            {errorMessage.companyName}
                          </span> 
                           </div>
                        
                        </div>

                        <div class="position-relative">
                          <input
                            type="text"
                            name="GSTIN"
                            value={updateBillingInfo.GSTIN}
                            onChange={handleChange}
                            onFocus={handleInputFocus}
                            class="input-filed-profile"
                         
                          />
                          <label class="po-ab-label top12admin"> GSTIN</label>
                           <div className="email-content-h2">
                           <span style={{ color: "red", textAlign: "center" }}>
                            {errorMessage.GSTIN}
                          </span> 
                           </div>
                         
                        </div>
                      </>
                    )}
                  </form>
                  <div class="text-right" style={{cursor:"pointer"}}>
                    <a class="cancel" onClick={() => navigate(-1)}>
                      Cancel
                    </a>{" "}
                    <a onClick={handleUpdateBillingInfo} class="save-changes">
                      Save Changes
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BillingInformation;
