import React, { useEffect, useRef } from 'react';
import Header from './components/header'
import PlanFooter from './components/planfooter'

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css'; // Make sure to import the Owl Carousel CSS here as well
import { Link } from 'react-router-dom';


const Travelling = () => {

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
        <Header/>

        <section class="day-car-banner fade-section">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-6">
              <div class="hero-daycare-banner-text">
                <h1>Elevate Your  <span>Travel <br/> Business </span> with AI-Driven <br/> Always-On Customer </h1>
                <p>Navigate the complex world of travel planning effortlessly, ensuring your clients the trip of a lifetime—anytime, anywhere.</p>
                <div class="book-now-day-care">
                  <Link to="/book-a-demo">Book a Demo</Link>
                </div>
              </div>
            </div>
         
            <div class="col-lg-6 text-right" >
               <div class="position-relative mt-sm-4">
               <div class="homev2-banner-imagefit">
                <img src="/images/travelling/travelling-bg.png" alt class="bgimgfit"/>
                <img src="/images/travelling/travelling.png" alt class="chatimgfit"/>
              </div>
                <div class="ai-chat-box-homev2 daycarev2-banner">
                  <div class="icon-chat-mage-chat-homev2 ">
                   <p>Customer: Can you recommend a romantic destination for a honeymoon?  
                       Kwikbot: Of course! How about a luxurious escape to the Maldives? We have a 7-day package that you'll love. 💑✈️
                   </p>
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
                <p>In the fast-paced and competitive travel industry, agencies must juggle numerous tasks—flight bookings, hotel accommodations, itinerary planning, customer inquiries, and so much more. Achieving all of this while maintaining high levels of customer satisfaction is no small feat.</p>
              </div>
            </div>
            <div class="col-lg-1"></div>

            <div class="col-lg-4 col-md-6">
              <div class="generate-quality-leads-image ">
                <img src="images/travelling/card1.png" alt width="100%"/>
              </div>
            </div>
          </div>
          <div class="row justify-content-center mt-100">
            <div class="col-lg-4 col-md-6">
              <div class="generate-quality-leads-image">
                <img src="images/travelling/card2.png" alt width="100%"/>
              </div>
            </div>
            <div class="col-lg-1">

            </div>
            <div class="col-lg-5">
              <div class="generate-quality-leads-content px-3 pt-100">
                <h3>The Solution - <br />kwikbot</h3>
                <p>Say hello to kwikbot, your new AI-powered travel assistant. Available 24/7 and fluent in multiple languages, kwikbot takes over the time-consuming tasks of managing inquiries, making reservations, and offering travel advice, freeing you to focus on creating unforgettable experiences for your clients.</p>
              </div>
            </div>

          </div>
          <div class="row justify-content-center fade-section mt-100 reverse-mobile">

            <div class="col-lg-5">
              <div class="generate-quality-leads-content px-3">
                <h3>Key Benefits</h3>
                <p>Incorporating kwikbot into your travel agency offers:</p>
                <ul>
                  <li><img src="images/daycare/daycarev2-icon.png" alt/>
                    <p> <b>Enhanced Lead Generation:</b> Engage potential customers through intelligent conversations, offering personalized travel suggestions that increase bookings.</p>
                  </li>
                  <li><img src="images/daycare/daycarev2-icon.png" alt/>
                    <p> <b>Operational Efficiency:</b> Streamline mundane tasks such as fare queries, booking confirmations, and itinerary changes, allowing your human agents to focus on complex issues.</p>
                  </li>
                  <li>
                    <img src="images/daycare/daycarev2-icon.png" alt/>
                    <p> <b>Improved Customer Experience:</b> Provide real-time updates on flight delays, local tips, or last-minute changes, ensuring a smoother travel experience for your clients.</p>
                  </li>
                </ul>
                </div>
              </div>
              <div class="col-lg-1"></div>

              <div class="col-lg-4 col-md-6">
                <div class="generate-quality-leads-image mt-80">
                  <img src="images/travelling/card3.png" alt width="100%"/>
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
                  <p>Leveraging ChatGPT's state-of-the-art AI, kwikbot transforms your travel agency into an agile, customer-centric enterprise.</p>
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
                            "Our travel bookings have seen a 30% increase since implementing kwikbot. The AI handles initial queries, making the whole process more efficient."  
                            </h2>

                            <div class="col-lg-12">
                              <p class="card-tstimonial-text"> - Laura Chen, General Manager, GlobeTrek</p>
                            </div>
                          </div>

                        </div>
                      </div>
                  
                 
                      <div class="col-lg-12">
                        <div class="card-testimonial">
                          <div class="col-lg-11">
                            <h2 class="card-testomonial-heading">
                            "Kwikbot's 24/7 availability has significantly improved our global outreach. Clients from different time zones appreciate the instant service."  
                            </h2>

                            <div class="col-lg-12">
                              <p class="card-tstimonial-text"> - Mark Johnson, CEO, AdventureAwaits</p>
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


        <section class="faqs-section fade-section">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-8">
                <div class="faqs">
                  <h2>FAQs</h2>
                </div>
              </div>

              <div class="col-lg-10">
                <div class="accordion accordion-flush" id="accordionFlushExample">
                  <div class="accordion-item">
                    <div class="accordion-header" id="flush-headingOne">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                      What is an AI chatbot?
                      </button>
                    </div>
                    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                      <div class="accordion-body">An AI chatbot is a virtual assistant that uses Artificial Intelligence to simulate natural conversations and execute tasks.</div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <div class="accordion-header" id="flush-headingTwo">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                      How does kwikbot work with travel agencies? 
                      </button>
                    </div>
                    <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                      <div class="accordion-body">Kwikbot integrates seamlessly into your online platforms, managing tasks from customer inquiries to booking confirmations.</div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <div class="accordion-header" id="flush-headingThree">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                      How easy is it to integrate kwikbot into our current system?
                      </button>
                    </div>
                    <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                      <div class="accordion-body">With API support and a dedicated technical team, integration is quick and hassle-free.</div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <div class="accordion-header" id="flush-heading4">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse4" aria-expanded="false" aria-controls="flush-collapse4">
                         Can kwikbot handle multiple languages?
                      </button>
                    </div>
                    <div id="flush-collapse4" class="accordion-collapse collapse" aria-labelledby="flush-heading4" data-bs-parent="#accordionFlushExample">
                      <div class="accordion-body">Yes, kwikbot is multilingual, making it ideal for serving a global clientele.</div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <div class="accordion-header" id="flush-heading5">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse5" aria-expanded="false" aria-controls="flush-collapse5">
                      How does kwikbot improve our customer experience?
                      </button>
                    </div>
                    <div id="flush-collapse5" class="accordion-collapse collapse" aria-labelledby="flush-heading5" data-bs-parent="#accordionFlushExample">
                      <div class="accordion-body">By offering real-time assistance, travel recommendations, and updates, kwikbot ensures your clients have a seamless and enjoyable travel experience.</div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <div class="accordion-header" id="flush-heading6">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse6" aria-expanded="false" aria-controls="flush-collapse6">
                        How does kwikbot assist in lead generation and bookings?
                      </button>
                    </div>
                    <div id="flush-collapse6" class="accordion-collapse collapse" aria-labelledby="flush-heading6" data-bs-parent="#accordionFlushExample">
                      <div class="accordion-body">Kwikbot engages with potential clients, offering personalized travel options that can lead to increased bookings.</div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <div class="accordion-header" id="flush-heading7">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse7" aria-expanded="false" aria-controls="flush-collapse7">
                      How secure is kwikbot? Can it ensure the privacy of our data?
                      </button>
                    </div>
                    <div id="flush-collapse7" class="accordion-collapse collapse" aria-labelledby="flush-heading7" data-bs-parent="#accordionFlushExample">
                      <div class="accordion-body">Data security is paramount. Kwikbot uses encrypted channels to maintain confidentiality and compliance.</div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <div class="accordion-header" id="flush-heading8">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse8" aria-expanded="false" aria-controls="flush-collapse8">
                      What kind of support will we receive after kwikbot is installed?
                      </button>
                    </div>
                    <div id="flush-collapse8" class="accordion-collapse collapse" aria-labelledby="flush-heading8" data-bs-parent="#accordionFlushExample">
                      <div class="accordion-body">We offer 24/7 technical support along with regular updates to keep your chatbot performing optimally.</div>
                    </div>
                  </div>
                 
                 
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="be-were bag-traform fade-section">
          <div class="container">
            <div class="box-card text-center">
              <h2>Book a demo</h2>
              <p>Ready to take your travel agency to new heights? <b>Book a demo</b> and let kwikbot show you the way!</p>
              <div class="card-btn-book"><Link to="/book-a-demo">Book a Demo</Link></div>
            </div>
          </div>
        </section>


   <PlanFooter/>
    </div>
  )
}

export default Travelling
