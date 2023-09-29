import React, { useEffect, useState } from "react";
import Header from "./components/header";
import PlanFooter from "./components/planfooter";
import { sendLeadMail } from "../../Services/Admin/leadApiCall";
import { Link } from "react-router-dom";

const BookAdemo = () => {
  const [isLeadSubmitted, setIsLeadSubmitted] = React.useState(false);
  const [newErrors, setNewErrors] = React.useState({});
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [leadData, setLeadData] = React.useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    console.log("e.target", e.target);
    const { name, value } = e.target;
    setLeadData({ ...leadData, [name]: value });
  };

  const onFoucus = (e) => {
    const { name } = e.target;
    setNewErrors({ ...newErrors, [name]: "" });
  };

  const handleIframeLoad = () => {
    //Add 1 seconds delay to make sure the iframe is fully loaded
    setTimeout(() => {
      setIframeLoaded(true);
    }, 1000);
  };

  const sendMail = async () => {
    try {
      const newErrors = {};
      if (!leadData.name) {
        newErrors.name = "Name is required";
      }
      if (!leadData.email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(leadData.email)) {
        newErrors.email = "Email address is invalid";
      }

      setNewErrors(newErrors);
      if (Object.keys(newErrors).length === 0) {
        const response = await sendLeadMail(leadData);
        if (response.status === 200) {
          setIsLeadSubmitted(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Header />
      <main>
        <section class="book-a-demo">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="book-a-demo-heading">
                  <h1 class="center">
                    Experience the <span>Future</span> of Customer Interactions
                  </h1>
                  <p class="center">
                    Book a demo today and see Kwikbot in action for yourself.
                    During the demo, we'll show you how Kwikbot can help your
                    business overcome common customer interaction challenges and
                    achieve your goals. Plus, you'll have the opportunity to ask
                    questions and get a sense of how easy it is to use and
                    implement.
                  </p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12 p-0">
                <div className="position-relative">
               
                  <iframe
                    src="https://calendly.com/acompworld/kwikbot-demo"
                    width="100%"
                    height="100%"
                    frameborder="0"
                    loading="lazy"
                    style={{ height: "730px" }}
                    onLoad={handleIframeLoad}
                  ></iframe>
                   {!iframeLoaded && <div className="loader">Loading...</div>}
                </div>

                {!isLeadSubmitted ? (
                  <div className="container px-lg-5 px-sm-3">
                    <div className="center-container-home">
                      <h1>Can't find a suitable time or need more info?</h1>
                      <p style={{ fontSize: "18px" }}>
                        Leave your contact details and we will reach out to you{" "}
                      </p>
                    </div>

                    <div className="col-lg-10 mx-auto mb-3">
                      <div className="row mt-5">
                        <div className="col-lg-4">
                          <div className="position-relative pt-20">
                            <input
                              type="text"
                              className="input-filed-profile"
                              name="name"
                              placeholder="Your Name*"
                              onChange={handleChange}
                              onFocus={onFoucus}
                            />
                          </div>
                          <div style={{ height: "50px", paddingTop: "5px" }}>
                            <span style={{ color: "red", textAlign: "center" }}>
                              {newErrors.name}
                            </span>
                          </div>
                        </div>

                        <div className="col-lg-4">
                          <div className="position-relative">
                            <input
                              type="email"
                              className="input-filed-profile"
                              name="email"
                              placeholder="Email ID*"
                              onChange={handleChange}
                              onFocus={onFoucus}
                            />
                            <div style={{ height: "50px", paddingTop: "5px" }}>
                              <span
                                style={{ color: "red", textAlign: "center" }}
                              >
                                {newErrors.email}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-4">
                          <div className="position-relative">
                            <input
                              type="text"
                              className="input-filed-profile"
                              name="phone"
                              placeholder="Phone Number"
                              onChange={handleChange}
                              onFocus={onFoucus}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="book-now-btn-homev2 text-center mt-lg-0-mt-sm-3">
                      <Link
                        type="submit"
                        className="save-changes "
                        onClick={sendMail}
                      >
                        Submit
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="mt-5">
                    <div className="center-container-home">
                      <h1>Your response has been submitted successfully.</h1>
                      <p style={{ fontSize: "18px" }}>
                        Our team will reach out to you soon{" "}
                      </p>
                    </div>
                    {/*  <div className="text-align-center submitpublicpage ">
                      <button type="submit" className="save-changes" onClick={(e)=>setIsLeadSubmitted(false)}>
                        Book Again
                      </button>
                    </div> */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <PlanFooter />
    </div>
  );
};

export default BookAdemo;
