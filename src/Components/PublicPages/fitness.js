import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import Header from './components/header'
import ComanFooter from './components/comanfooter'
import Faq from './components/faq'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css'; // Make sure to import the Owl Carousel CSS here as well

const FitNess = () => {

  const options = {
    items: 2, // Number of items to display in the carousel
    loop: true, // Infinite loop
    margin: 30, // Space between items
    autoplay: true, // Auto-play the carousel
        nav: false, // Disable default navigation
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
 

  const handlePrevClick = () => {
    const carousel = carouselRef.current;
    console.log(carousel,"carousel")
    if (carousel) {
      carousel.prev();
    }
  };

  const handleNextClick = () => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.next();
    }
  };

  const carouselRef = useRef(null);

  return (
    <div>
      <Header />
       <section class="day-car-banner fade-section">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-6 col-md-6">
              <div class="hero-daycare-banner-text">
                <h1>Empower <span>Your Fitness <br/> Business</span> With Our 
                  AI-Powered <br/> Chatbot</h1>
                <p>Streamline operations, boost member engagement, and
                  supercharge your lead generation—24/7.</p>
                <div class="book-now-day-care">
                  <Link to="/book-a-demo">Book a Demo</Link>
                </div>
              </div>
            </div>
         
            <div class="col-lg-6 col-md-6 text-right" >
               <div class="position-relative">
                {/* <img src="images/fitness/fitnesv2-banner.png" alt width="100%" class=""/> */}
                <div class="homev2-banner-imagefit">
                <img src="/images/fitness/image01.png" alt class="bgimgfit"/>
                <img src="/images/fitness/img02.png" alt class="chatimgfit"/>
              </div>
                <div class="ai-chat-box-homev2 daycarev2-banner">
                  <div class="icon-chat-mage-chat-homev2 ">
                   <p>Congrats Mr. Sam! You have successfully subscribed the monthly plan. Welcome to our
                    fitness club! 🎉</p>
                   <img src="images/homev2/ai-icon-homev2.png" alt=""/>
                  </div>
             </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section class="kwikbot-section2">
        <div class="container">
          {/* <!-- <div class="heading-kwikbot">
          <ul class="fade-section">
            <li class="active">The Challenges</li>
            <li>The Solution-kwikbot</li>
            <li>Key benefits</li>
          </ul>
        </div> --> */}
          <div class="row justify-content-center fade-section reverse-mobile">
            <div class="col-lg-5">
              <div class="generate-quality-leads-content px-3 pt-120">
                <h3>The Challenges</h3>
                <p>Managing a fitness business, whether it's a gym, yoga studio,
                  or fitness center, involves a multitude of responsibilities.
                  From answering member queries and booking classes, to managing
                  memberships and driving new leads—doing it all efficiently can
                  be a real challenge</p>
              </div>
            </div>
            <div class="col-lg-1"></div>

            <div class="col-lg-4 col-md-6">
              <div class="generate-quality-leads-image ">
                <img src="images/fitness/card1.png" alt width="100%"/>
              </div>
            </div>
          </div>
          <div class="row justify-content-center mt-100">
            <div class="col-lg-4 col-md-6">
              <div class="generate-quality-leads-image">
                <img src="images/fitness/card2.png" alt width="100%"/>
              </div>
            </div>
            <div class="col-lg-1">

            </div>
            <div class="col-lg-5">
              <div class="generate-quality-leads-content px-3 pt-100">
                <h3>The Solution - <br />kwikbot</h3>
                <p>Enter our AI-powered chatbot, designed to take the weight off
                  your shoulders. It handles member queries, schedules classes,
                  provides crucial workout information, and interacts
                  effectively with potential leads. Plus, with 24/7
                  availability, it's like having a highly efficient assistant
                  working round the clock for your fitness business.</p>
              </div>
            </div>

          </div>
          <div class="row justify-content-center fade-section mt-100 reverse-mobile">

            <div class="col-lg-5">
              <div class="generate-quality-leads-content px-3">
                <h3>Key Benefits</h3>
                <p>Integrating our AI chatbot into your fitness business, you'll
                  benefit from:</p>
                <ul>
                  <li><img src="images/daycare/daycarev2-icon.png" alt/>
                    <p>Operational Efficiency: Automate routine tasks like
                      answering FAQs, booking classes, and managing memberships.</p>
                  </li>
                  <li><img src="images/daycare/daycarev2-icon.png" alt/>
                    <p>Improved Member Communication: Ensure members always have
                      access to essential information, even outside business
                      hours.</p>
                  </li>
                  <li>
                    <img src="images/daycare/daycarev2-icon.png" alt/>
                    <p>Increased Leads: Intelligent response to inquiries can
                      help turn potential leads into memberships.</p>
                  </li>
                </ul>
                </div>
              </div>
              <div class="col-lg-1"></div>

              <div class="col-lg-4 col-md-6">
                <div class="generate-quality-leads-image mt-80">
                  <img src="images/fitness/card3.png" alt width="100%"/>
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
                  <p>Powered by ChatGPT's advanced AI technology Kwikbot
                    transforms your website into a dynamic and
                    intelligent platform</p>
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
                              Implementing the AI chatbot has supercharged our gym operations. It's like having an extra staff member on hand 24/7!
                            </h2>

                            <div class="col-lg-12">
                              <p class="card-tstimonial-text"> PowerPump Gym</p>
                            </div>
                          </div>

                        </div>
                      </div>
                   
                    
                      <div class="col-lg-12">
                        <div class="card-testimonial">
                          <div class="col-lg-11">
                            <h2 class="card-testomonial-heading">
                              Our yoga studio has seen a rise in new members since we started using the AI chatbot. It's been great for lead generation!"
                            </h2>

                            <div class="col-lg-12">
                              <p class="card-tstimonial-text"> Serenity Yoga Studio</p>
                            </div>
                          </div>

                        </div>
                      </div>
                      </OwlCarousel>
                    
                  
               

                {/* <!-- Navigation Buttons --> */}
                <div className="custom-nav position-relative">
                      <button className="owl-prev daycarev2-prev" onClick={handlePrevClick}>
                      <i class="fa-solid fa-angle-left"></i>
                      </button>
                      <button className="owl-next daycarev2-next disabled" onClick={handleNextClick}>
                      <i class="fa-solid fa-angle-right"></i>
                      </button>
               </div>

              
            </div>
          </div>

        </section>
        <Faq/>
        <ComanFooter />
    </div>
  )
}

export default FitNess
