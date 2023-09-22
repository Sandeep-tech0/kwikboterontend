import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginRequest } from '../../Services/Admin/authApiCall';
import { toast } from 'react-toastify';

const Home = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");  
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
    setError("");

  };


  const handleSubmit = async (e) => {
    e.preventDefault();
 
      const newErrors = {}
      if (!loginInfo.email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(loginInfo.email)) {
        newErrors.email = "Please enter valid Email ID";
      }
      if(!loginInfo.password){
        newErrors.password = "Password is required";
      }
      setError(newErrors);
      if (Object.keys(newErrors).length === 0) {

      try {
        const responseData =  await loginRequest(loginInfo);
      if (responseData.success === true) {
        const { token, user } = responseData.data;
        localStorage.setItem('token', token);
        localStorage.setItem('userid', user._id);
        localStorage.setItem("clientId", user.clientId);
       
        navigate('/admin/coversation');
      }else {
        toast.error(responseData.message);
      }
    
    } catch (error) {
     if (error.response) {
          toast.error(error.response.data.message);
        } else if (error.request) {
          toast.error("No response from server");
        } else {
          toast.error("Error: " + error.message);
        }
    }}
  };

  const handleInputFocus = (e) => {
    const { name } = e.target;

    setError((prevMessage) => ({
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
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
               
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section className="">
          <div className="container mt-5 pt-3">
            <div className="row justify-content-center">
              <div className="col-lg-9">
                <div className="loging-card">
                  <h1>Welcome back!</h1>
                  <p>Sign In to kwikbot</p>
                  <form  onSubmit={handleSubmit}>
                    <div className="text-center mb-4">
                      <input
                        type="email"
                        name="email"
                        value={loginInfo.email}
                        onChange={handleChange}
                        className="input-filed"
                        placeholder="Email ID"
                        onFocus={handleInputFocus}
                       
                      />
                       <div style={{ 
                        
                        textAlign: "center",
                         height:"30px",
                         paddingTop:"10px",
                          }}>
                         <span style={{ color: 'red',textAlign: 'center'}}>{error.email}</span>
                      </div>
                     
                    </div>
                   
                    <div className="text-center mb-4">
                      <input
                        type="password"
                        name="password"
                        value={loginInfo.password}
                        onChange={handleChange}
                        className="input-filed"
                        placeholder="Password"
                        onFocus={handleInputFocus}
                       
                      />
                       <div style={{ 
                        
                      textAlign: "center",
                       height:"30px",
                       paddingTop:"10px",
                        }}>
                       <span style={{ color: 'red',textAlign: 'center'}}>{error.password}</span>
                    </div>
                    </div>
                   
                    <div className="text-center">
                      <input
                        type="submit"
                        value="Sign in"
                        className="sign-in-btn mb-4"
                     
                      />
                      <p className="forget" style={{cursor:"pointer"}} onClick={ () =>navigate("/admin/forgotpassword")}>Forgot Password?</p>
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

export default Home;
