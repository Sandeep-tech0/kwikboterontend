import React, { useEffect, useRef } from 'react';
import PlanFooter from './components/planfooter'
import Header from './components/header'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css'; // Make sure to import the Owl Carousel CSS here as well
import { Link } from 'react-router-dom';




const Ecomerce = ({ items }) => {
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

 /*  useEffect(() => {
    const carousel = carouselRef.current;

    if (carousel) {
      $(carousel).owlCarousel(options);
    }

    return () => {
      if (carousel) {
        $(carousel).trigger('destroy.owl.carousel');
      }
    };
  }, [options]); */

  return (
    <div>
        <Header/>
        <section class="day-car-banner fade-section">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-6">
              <div class="hero-daycare-banner-text">
                <h1>Revolutionizing <span>E-Commerce <br/> Through </span> AI-Powered Customer <br/>  Interactions  </h1>
                <p>Turn browsers into buyers and elevate your online shopping experience—24/7, no downtime.</p>
                <div class="book-now-day-care">
                  <Link to="/book-a-demo">Book a Demo</Link>
                </div>
              </div>
            </div>
         
            <div class="col-lg-6 text-right" >
               <div class="position-relative mt-sm-4">
               <div class="homev2-banner-imagefit">
                <img src="/images/e-commeres/ecomer-bg.png" alt class="bgimgfit"/>
                <img src="/images/e-commeres/ecomerce.png" alt class="chatimgfit"/>
              </div>
                <div class="ai-chat-box-homev2 daycarev2-banner">
                  <div class="icon-chat-mage-chat-homev2 ">
                   <p>Customer: Is this dress available in size M?  
                    Kwikbot: Absolutely! The dress is available in size M and in three colors: Red, Black, and Blue. Would you like to proceed to checkout? 🛒
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
                <p>The E-Commerce landscape is highly competitive, with businesses striving to capture customers' attention, convert visitors into buyers, and maintain a robust customer service mechanism—all while managing inventory, logistics, and payments. Achieving all these efficiently without compromising the customer experience is a daunting task.</p>
              </div>
            </div>
            <div class="col-lg-1"></div>

            <div class="col-lg-4 col-md-6">
              <div class="generate-quality-leads-image ">
                <img src="images/e-commeres/card1.png" alt width="100%"/>
              </div>
            </div>
          </div>
          <div class="row justify-content-center mt-100">
            <div class="col-lg-4 col-md-6">
              <div class="generate-quality-leads-image">
                <img src="images/e-commeres/card2.png" alt width="100%"/>
              </div>
            </div>
            <div class="col-lg-1">

            </div>
            <div class="col-lg-5">
              <div class="generate-quality-leads-content px-3 pt-100">
                <h3>The Solution - <br />kwikbot</h3>
                <p>Our cutting-edge AI chatbot, kwikbot, is designed to seamlessly integrate with your E-Commerce platform. It works round the clock, understands multiple languages, and intelligently engages with your customers to address their queries, guide them through the sales funnel, and offer post-sales support.</p>
              </div>
            </div>

          </div>
          <div class="row justify-content-center fade-section mt-100 reverse-mobile">

            <div class="col-lg-5">
              <div class="generate-quality-leads-content px-3">
                <h3>Key Benefits</h3>
                <p>By employing kwikbot, your E-Commerce business can enjoy:</p>
                <ul>
                  <li><img src="images/daycare/daycarev2-icon.png" alt/>
                    <p> <b>Boosted Sales:</b> Utilize the chatbot's ability to engage customers in real-time, make product suggestions, and upsell items, thus increasing conversion rates.</p>
                  </li>
                  <li><img src="images/daycare/daycarev2-icon.png" alt/>
                    <p> <b>Operational Efficiency:</b> Automate routine tasks such as inventory queries, order tracking, and handling returns, enabling your team to focus on more complex issues.</p>
                  </li>
                  <li>
                    <img src="images/daycare/daycarev2-icon.png" alt/>
                    <p><b>Enhanced Customer Experience:</b> Deliver instant, personalized customer service, ensuring quick resolutions and high satisfaction levels.</p>
                  </li>
                </ul>
                </div>
              </div>
              <div class="col-lg-1"></div>

              <div class="col-lg-4 col-md-6">
                <div class="generate-quality-leads-image mt-80">
                  <img src="images/e-commeres/card3.png" alt width="100%"/>
                </div>
              </div>
            </div>
          </div>
        </section>
        

         <section  class="success-story testimonial fade-section">
         <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-7">
                <div class="success-story-cont-top  margin-bottom4">
                  <h4>Testimonials</h4>
                  <p>Harnessing the power of ChatGPT's advanced AI, kwikbot turns your online store into a sales and customer service powerhouse.</p>
                </div>

              </div>
            </div>
          </div>
               <div className='container px-5'>
               <OwlCarousel className="owl-theme" ref={carouselRef} {...options}>
                      <div class="col-lg-12">
                        <div class="card-testimonial">
                          <div class="col-lg-11">
                            <h2 class="card-testomonial-heading">
                            "Our conversion rate has improved by 25% since we integrated kwikbot into our operations."  
                            </h2>

                            <div class="col-lg-12">
                              <p class="card-tstimonial-text"> John Doe, CEO, TrendyWear</p>
                            </div>
                          </div>

                        </div>
                      </div>

                      <div class="col-lg-12">
                        <div class="card-testimonial">
                          <div class="col-lg-11">
                            <h2 class="card-testomonial-heading">
                            " Kwikbot has significantly reduced our customer service queue, and customers are loving the instant support!"    
                            </h2>

                            <div class="col-lg-12">
                              <p class="card-tstimonial-text"> John Doe, CEO, TrendyWear</p>
                            </div>
                          </div>

                        </div>
                      </div>
                      
    </OwlCarousel>
    <div className="custom-nav position-relative">
        <button className="owl-prev daycarev2-prev" onClick={handlePrevClick}>
        <i class="fa-solid fa-angle-left"></i>
        </button>
        <button className="owl-next daycarev2-next disabled" onClick={handleNextClick}>
        <i class="fa-solid fa-angle-right"></i>
        </button>
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
                      <div class="accordion-body">An AI chatbot is a virtual assistant powered by Artificial Intelligence that can engage in human-like conversations and perform tasks.</div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <div class="accordion-header" id="flush-headingTwo">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                      How does kwikbot work with E-Commerce platforms?
                      </button>
                    </div>
                    <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                      <div class="accordion-body">Kwikbot can be integrated into your E-Commerce website or app to handle customer queries, assist in sales, and offer post-purchase support.</div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <div class="accordion-header" id="flush-headingThree">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                      How easy is it to integrate kwikbot into our current system?
                      </button>
                    </div>
                    <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                      <div class="accordion-body">The integration process is straightforward and requires minimal effort, thanks to our API support and dedicated technical team.</div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <div class="accordion-header" id="flush-heading4">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse4" aria-expanded="false" aria-controls="flush-collapse4">
                      Can kwikbot handle multiple languages?
                      </button>
                    </div>
                    <div id="flush-collapse4" class="accordion-collapse collapse" aria-labelledby="flush-heading4" data-bs-parent="#accordionFlushExample">
                      <div class="accordion-body">Yes, kwikbot is fluent in multiple languages to cater to a global customer base.</div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <div class="accordion-header" id="flush-heading5">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse5" aria-expanded="false" aria-controls="flush-collapse5">
                      How does kwikbot improve customer experience?
                      </button>
                    </div>
                    <div id="flush-collapse5" class="accordion-collapse collapse" aria-labelledby="flush-heading5" data-bs-parent="#accordionFlushExample">
                      <div class="accordion-body">Kwikbot provides instant, accurate responses to customer queries, assists in navigating the online store, and offers personalized recommendations.</div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <div class="accordion-header" id="flush-heading6">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse6" aria-expanded="false" aria-controls="flush-collapse6">
                      How does kwikbot help with sales and lead generation?
                      </button>
                    </div>
                    <div id="flush-collapse6" class="accordion-collapse collapse" aria-labelledby="flush-heading6" data-bs-parent="#accordionFlushExample">
                      <div class="accordion-body">By engaging customers in real-time, kwikbot can direct them through the sales funnel and even initiate targeted marketing campaigns.</div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <div class="accordion-header" id="flush-heading7">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse7" aria-expanded="false" aria-controls="flush-collapse7">
                      How secure is kwikbot? Can it ensure the privacy of our data?
                      </button>
                    </div>
                    <div id="flush-collapse7" class="accordion-collapse collapse" aria-labelledby="flush-heading7" data-bs-parent="#accordionFlushExample">
                      <div class="accordion-body">Security is a top priority. Kwikbot uses encrypted channels to ensure data privacy and compliance with regulations.</div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <div class="accordion-header" id="flush-heading8">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse8" aria-expanded="false" aria-controls="flush-collapse8">
                      What kind of support will we receive after kwikbot is installed?
                      </button>
                    </div>
                    <div id="flush-collapse8" class="accordion-collapse collapse" aria-labelledby="flush-heading8" data-bs-parent="#accordionFlushExample">
                      <div class="accordion-body">We offer 24/7 technical support and periodic updates to ensure optimal performance.</div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <div class="accordion-header" id="flush-heading9">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse9" aria-expanded="false" aria-controls="flush-collapse9">
                      How can we train kwikbot to suit our specific needs?
                      </button>
                    </div>
                    <div id="flush-collapse9" class="accordion-collapse collapse" aria-labelledby="flush-heading9" data-bs-parent="#accordionFlushExample">
                      <div class="accordion-body">Kwikbot is highly customizable. We offer training modules to adapt the bot to your business requirements.</div>
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
              <p>Ready to transform your E-Commerce experience? <b>Book a demo</b> with us today and see kwikbot in action!</p>
              <div class="card-btn-book"><Link to="/book-a-demo">Book a Demo</Link></div>
            </div>
          </div>
        </section>

        <PlanFooter/>
    </div>
  )
}

export default Ecomerce
