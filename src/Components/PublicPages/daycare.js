import React, { useEffect, useRef } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css"; // Make sure to import the Owl Carousel CSS here as well
import { Link } from "react-router-dom";
import Faq from "./components/faq";
import Header from "./components/header";
import ComanFooter from "./components/comanfooter";
const DayCare = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const options = {
    items: 2, // Number of items to display in the carousel
    loop: true, // Infinite loop
    margin: 30, // Space between items
    autoplay: true, // Auto-play the carousel
    nav: false, // Disable default navigation,
    rtl: false,
    responsive: {
      // Define responsive breakpoints
      0: {
        items: 1, // Display 1 item on screens smaller than 768px
      },
      768: {
        items: 2, // Display 2 items on screens larger than or equal to 768px
      },
      992: {
        items: 2, // Display 3 items on screens larger than or equal to 992px
      },
    },

  };

  const handlePrevClick = (e) => {
    e.preventDefault();
    const carousel = carouselRef.current;
    console.log(carousel, "carousel");
    if (carousel) {
      carousel.prev();
    }
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.next();
    }
  };

  const carouselRef = useRef(null);
  return (
    <div>
      <Header />
      <section class="day-car-banner">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-6 col-md-6">
              <div class="hero-daycare-banner-text">
                <h1>
                  Empowering <span class="blue-daycarev2">Daycare Centers</span>{" "}
                  with Intelligent, Round-the-Clock Assistance
                </h1>
                <p>
                  Leveraging AI to streamline communication and operations,
                  letting you focus on what truly matters— the children
                </p>
                <div class="book-now-day-care">
                  <Link to="/book-a-demo">Book a Demo</Link>
                </div>
              </div>
            </div>
            <div className="col-md-1"></div>
            <div class="col-lg-5 col-md-5">
              <div class="position-relative">
                {/* <img src="images/daycare/daycarev2-banner.png" alt="" width="100%"/> */}
                <div class="homev2-banner-imagefit">
                  <img src="/images/daycare/imag02.png" alt class="bgimgfit" />
                  <img
                    src="/images/daycare/imag01.png"
                    alt
                    class="chatimgfit"
                  />
                </div>
                <div class="ai-chat-box-homev2 daycarev2-banner">
                  <div class="icon-chat-mage-chat-homev2 ">
                    <p>
                      Great news, Mrs. Johnson! Emily's enrollment for the Fall
                      session is confirmed. Welcome to our daycare family! 🎉
                    </p>
                    <img src="images/homev2/ai-icon-homev2.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="kwikbot-section2">
        <div class="container">
          {/* <!-- <div class="heading-kwikbot fade-section">
          <ul>
            <li class="active">The Challenges</li>
            <li>The Solution-kwikbot</li>
            <li>Key benefits</li>
          </ul>
        </div> --> */}
          <div class="row justify-content-center fade-section reverse-mobile">
            <div class="col-lg-5">
              <div class="generate-quality-leads-content px-3">
                <h3>The Challenges</h3>
                <p>
                  Daycare centers are bustling hubs of activity that juggle
                  diverse responsibilities, from managing inquiries and
                  communicating with parents, to booking appointments and
                  ensuring top-notch child care. Handling all these tasks
                  efficiently while delivering exceptional service can be a
                  formidable challenge.
                </p>
              </div>
            </div>
            <div class="col-lg-1"></div>

            <div class="col-lg-4 col-md-6">
              <div class="generate-quality-leads-image ">
                <img
                  src="images/daycare/daycarev2card01.png"
                  alt=""
                  width="100%"
                />
              </div>
            </div>
          </div>
          <div class="row justify-content-center mt-100">
            <div class="col-lg-4 col-md-6">
              <div class="generate-quality-leads-image">
                <img
                  src="images/daycare/daycarev2card02.png"
                  alt=""
                  width="100%"
                />
              </div>
            </div>
            <div class="col-lg-1"></div>
            <div class="col-lg-5">
              <div class="generate-quality-leads-content px-3">
                <h3>The Solution - kwikbot</h3>
                <p>
                  Our AI chatbot, designed with cutting-edge generative models,
                  steps in to shoulder these responsibilities. Available 24/7,
                  fluent in multiple languages, and capable of intelligently
                  interpreting and responding to queries, our chatbot helps
                  streamline your operations, facilitate timely communication,
                  and manage appointments effortlessly.
                </p>
              </div>
            </div>
          </div>
          <div class="row justify-content-center mt-100 fade-section reverse-mobile">
            <div class="col-lg-5">
              <div class="generate-quality-leads-content px-3">
                <h3>Key Benefits</h3>
                <p>With kwikbot, your daycare center stands to gain:</p>
                <ul>
                  <li>
                    <img src="images/daycare/daycarev2-icon.png" alt="" />
                    <p>
                      Increased Leads: Our chatbot can handle multiple inquiries
                      simultaneously, ensuring no potential client goes
                      unanswered.
                    </p>
                  </li>
                  <li>
                    <img src="images/daycare/daycarev2-icon.png" alt="" />
                    <p>
                      Operational Efficiency: Automate repetitive tasks like
                      answering FAQs and scheduling appointments, freeing up
                      your staff's time for more value-added activities.
                    </p>
                  </li>
                  <li>
                    <img src="images/daycare/daycarev2-icon.png" alt="" />
                    <p>
                      {" "}
                      Improved Parent Communication: Ensure parents receive
                      prompt, accurate responses to their queries any time of
                      the day or night.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-1"></div>

            <div class="col-lg-4 col-md-6">
              <div class="generate-quality-leads-image mt-80">
                <img
                  src="images/daycare/daycaev2card03.png"
                  alt=""
                  width="100%"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="success-story testimonial fade-section">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-7">
              <div class="success-story-cont-top  margin-bottom4">
                <h4>Testimonials</h4>
                <p>
                  Powered by ChatGPT's advanced AI technology Kwikbot transforms
                  your website into a dynamic and intelligent platform
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="container px-5">
          <div class="warrap mx-3 ">
            <OwlCarousel className="owl-theme" ref={carouselRef} {...options}>
              <div class="col-lg-12">
                <div class="card-testimonial">
                  <div class="col-lg-11">
                    <h2 class="card-testomonial-heading">
                      Our center has seen a 40% reduction in administrative time
                      since we implemented the AI chatbot.
                    </h2>

                    <div class="col-lg-12">
                      <p class="card-tstimonial-text">
                        {" "}
                        Jane Smith, Sunshine Daycare Center
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-12">
                <div class="card-testimonial">
                  <div class="col-lg-11">
                    <h2 class="card-testomonial-heading">
                      The chatbot has been a game-changer in our communication
                      with parents. They love the immediate response!
                    </h2>

                    <div class="col-lg-12">
                      <p class="card-tstimonial-text"> Little Stars Daycare</p>
                    </div>
                  </div>
                </div>
              </div>
            </OwlCarousel>
            {/* <!-- Navigation Buttons --> */}
            <div className="custom-nav position-relative">
              <button
                className="owl-prev daycarev2-prev"
                onClick={handlePrevClick}
              >
                <i class="fa-solid fa-angle-left"></i>
              </button>
              <button
                className="owl-next daycarev2-next disabled"
                onClick={handleNextClick}
              >
                <i class="fa-solid fa-angle-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
      <Faq />
      <ComanFooter />
    </div>
  );
};

export default DayCare;
