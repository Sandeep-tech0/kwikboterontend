import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import { updateUserProfile, userData } from "../../Services/Admin/userApiCall";
import { toast } from "react-toastify";

const ProfileAdmin = () => {
  const navigate = useNavigate();
  const userid = localStorage.getItem("userid");
 const [errormessage, setErrorMessage] = useState("");

  const [data, setData] = useState({
    Name:'',
    lastName: "",
    firstName: "",
    email: "",
    organizationName: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
    const apidata = await userData(userid);

  
    setData({
      ...data,
      Name: apidata.data.firstName  + " " + apidata.data.lastName,
      email: apidata.data.email,
      organizationName: apidata.data.organizationName,
    });
    } catch (err) {
      console.log(err.response.data.message);
    }

  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
   const newErrors = {};
    if (!data.Name) {
      newErrors.Name = "Name is required";
    } 
    if (!data.organizationName) {
      newErrors.organizationName = "Organization name is required";
    } 
    setErrorMessage(newErrors);
    
    const name = data.Name.split(" ");
    const firstName = name[0];
    const lastName = name.slice(1).join(" ");


if (Object.keys(newErrors).length === 0) {
    try {
      const api = await updateUserProfile({ userid, data: { firstName, lastName, organizationName: data.organizationName }  });

      if (api.success) {
        toast.success(api.message);
      }
    } catch (err) {
      toast.error(err.response.message);
    }}
  };

  const navigateToChangePassword = () => {
    navigate(`/admin/changepassword`, {
      state: { email: data.email },
    });
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
        <section className="profile-page  heightcontrol">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5">
                <div className="heading-profile">
                  <h1>Profile Settings</h1>
                </div>

                <div className="profile-card">
                  <img
                    src="/images/profile-icon.png"
                    className="prifle-icon-top"
                  />
                  <form
                    action=""
                    className="from-admin-pr"
                    onSubmit={handleSave}
                  >
                    <div className=" position-relative">
                      <input
                        type="text"
                        className="input-filed-profile"
                        name="Name"
                        value={data.Name}
                        onChange={handleChange}
                        onFocus={handleInputFocus}
                      />
                      <label  className="po-ab-label">
                        Your name
                      </label>
                      
                      
                    </div>
                    <div style={{height:"50px", paddingTop:"5px"}}>
                      <span style={{ color: "red", textAlign: "center"}}>
                        {errormessage.Name}
                      </span>
                      </div>

                    <div className="mb-5 position-relative">
                      <input
                        type="email"
                        className="input-filed-profile"
                        value={data.email}
                        disabled
                      />
                      <label htmlFor="" className="po-ab-label">
                        Email ID
                      </label>
                    </div>
                    <div className="position-relative">
                      <input
                        type="text"
                        className="input-filed-profile"
                        name="organizationName"
                        value={data.organizationName}
                        onChange={handleChange}
                        onFocus={handleInputFocus}
                      />
                      <label htmlFor="" className="po-ab-label">
                        Organization name{" "}
                      </label>
                      
                    </div>
                    <div style={{height:"50px", paddingTop:"5px"}}>
                      <span style={{ color: "red", textAlign: "center"}}>
                        {errormessage.organizationName}
                      </span>
                      </div>

                    <div className="set-power">
                      <a
                        className="po-ab-label"
                        style={{ cursor: "pointer" }}
                        onClick={navigateToChangePassword}
                      >
                        Set new password <span>{">>"}</span>
                      </a>
                    </div>

                    <div className="text-right mt-5">
                      <button type="submit" className="save-changes">
                        Save Changes
                      </button>
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

export default ProfileAdmin;
