import React from 'react'
import { Link } from 'react-router-dom'
import FooterHome from './components/footerhome'
import Header from './components/header'



const Home = () => {
  return (
    <div>
      <Header/>
      {/* <!-- HOME V2 BANNER START --> */}
      <section class="fade-section">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-6 col-md-6">
              <div class="homev2-banner-heading">
                <h1>Level-up your Customer Interactions with <span>GPT Powered
                    Chatbots</span></h1>
                <p>Generate More Leads, Increase Conversions, and Delight
                  Customers!</p>
                <div class="book-now-btn-homev2">
                  <Link to="/book-a-demo">Book a Demo</Link>
                </div>
              </div>
            </div>

            <div class="col-lg-6 col-md-6 p-0">
              <div class="homev2-banner-image">
                <img src="/images/Ellipse.png" alt class="bgimg"/>
                <img src="/images/smartphone.png" alt class="chatimg"/>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* <!-- HOME V2 BANNER END --> */}

        {/* <!-- CHAT SECTION HOME PAGE  START --> */}

        <section class="homev2_chat_section" id="why-kwikbot">
          <div class="container-fluid">
            <div class="heading-kwikbot-homev2 fade-section">
              <h2>Wow your online audience <br/>
                with your 24X7 Sales and Support Champion - kwikbot</h2>
            </div>
            <div class="row mb-200 fade-section">
              <div class="col-lg-4 mobilecontent">
                <div class="generate-quality-leads-content-homev2">
                  <h3>Generate Quality Leads</h3>
                  <p>Qualify visitors through natural language conversation.
                    Answer questions and provide information about
                    brand and product offering. Handle complex product enquiries
                    with real time speed and accuracy.</p>
                </div>
              </div>

              <div class="col-lg-5 col-md-6">
                <div class="generate-quality-leads-image">
                  <img src="images/homev2/chat-img01.png" alt
                    class="chatboxbigimg img1"/>
                  <div class="ai-bot-text-img display-none">
                    <div class="ai-bot-box">
                      <p>Hi, I'm Kiwkbot.
                        <br/>Need help?</p>
                      <img src="images/homev2/ai-icon-homev2.png" alt/>
                    </div>
                  </div>

                  <div class="user-bot-text-img  display-none"
                    style={{backgroundColor:"#000"}}>
                    <div class="di-bot-box-pink">
                      <p  className='ordernumb'>Looking for a daycare for my 2-year-old.</p>
                      <img src="images/homev2/icon-img-chat01.png" alt/>
                    </div>
                  </div>

                  <div class="ai-bot-text2-img display-none">
                    <div class="ai-bot-box">
                      <p>We have a spot! Want to schedule a tour?</p>
                      <img src="images/homev2/ai-icon-homev2.png" alt/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3"></div>
              <div class="col-lg-4 desktopcontent">
                <div class="generate-quality-leads-content-homev2">
                  <h3>Generate Quality Leads</h3>
                  <p>Qualify visitors through natural language conversation.
                    Answer questions and provide information about
                    brand and product offering. Handle complex product enquiries
                    with real time speed and accuracy.</p>
                </div>
              </div>
            </div>

            <div class="row mb-200 fade-section">
              <div class="col-lg-4">
                <div class="generate-quality-leads-content-homev2">
                  <h3>Convert Visitors to Customers</h3>
                  <p>With personalized conversation flow and proactive goal
                    seeking dialog. Turn every visitor into a buyer.
                    Provide customized offers and steer the conversation towards
                    the sales goals. Increase conversion rates
                    and reduce churn.</p>
                </div>
              </div>
              <div class="col-lg-4">

              </div>
              <div class="col-lg-4 col-md-12">
                <div class="generate-quality-leads-image">
                  <img src="images/homev2/chat-img02.png" alt width="100%"
                    class="chatboxbigimg"/>
                  <div class="ai-bot-box-card-convert-homev2 display-none">
                    <div class="ai-bot-box">
                      <p>Based on your likes, try our "Elegant Lace Dress" and
                        "Floral Print Maxi Dress". Both on sale. Add any?</p>
                      <img src="images/homev2/ai-icon-homev2.png" alt/>
                    </div>
                  </div>
                  <div class="ai-bot-box-card-convert-blue-homev2 display-none"
                    style={{backgroundColor:"#000"}}>
                    <div class="ai-bot-box">
                      <p  className='ordernumb'>Sure! Add
                        both to the cart</p>
                      <img src="images/homev2/ICON-CHAT-IMG02.png " alt/>
                    </div>
                  </div>

                  <div class="ai-bot-box-card3-homev2 display-none">
                    <div class="ai-bot-box">
                      <p>Done! Both are in your cart. Anything else?</p>
                      <img src="images/homev2/ai-icon-homev2.png" alt/>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            <div class="row mb-100 fade-section">

              <div class="col-lg-4 p-0 mobilecontent">
                <div class="generate-quality-leads-content-homev2">
                  <h3>Automate Support Enquiries</h3>
                  <p>Our advanced artificial intelligence capabilities resolve
                    any
                    question or issue. Our system
                    continuously learns and quickly adopts to handle new
                    inquiries. Take the customer support to the next
                    level with a consistent and professional, fully automated
                    support agent.</p>
                </div>
              </div>

              <div class="col-lg-4 col-md-12">
                <div class="generate-quality-leads-image">
                  <img src="images/homev2/chat-img03.png" alt width="100%"
                    class="chatboxbigimg"/>
                  <div class="ai-bot-text-img-automate-homev2 display-none">
                    <div class="ai-bot-box">
                      <p class="all-padding-ptag">Sorry about the delay. Please
                        give your order number or associated email.</p>
                      <img src="images/homev2/ai-icon-homev2.png" alt/>
                    </div>
                  </div>

                  <div
                    class="ai-bot-text-img-automate-yellow-homev2 display-none"
                   style={{backgroundColor:"#000"}}>
                    <div class="ai-bot-box">
                      <p className='ordernumb'>Order #123456789.</p>
                      <img src="images/homev2/icon-chat-img03.png" alt/>
                    </div>
                  </div>

                  <div class="ai-bot-text-img-automate2-homev2 display-none">
                    <div class="ai-bot-box">
                      <p class="all-padding-ptag">There's a weather delay. We're
                        on it. Here's 10% off next time. Want shipping updates?.</p>
                      <img src="images/homev2/ai-icon-homev2.png" alt/>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-4"></div>
              <div class="col-lg-4 p-0 desktopcontent">
                <div class="generate-quality-leads-content-homev2">
                  <h3>Automate Support Enquiries</h3>
                  <p>Our advanced artificial intelligence capabilities resolve
                    any
                    question or issue. Our system
                    continuously learns and quickly adopts to handle new
                    inquiries. Take the customer support to the next
                    level with a consistent and professional, fully automated
                    support agent.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- CHAT SECTION HOME PAGE  END --> */}

        {/* <!-- SUCCESS STORY SECTION START --> */}
        <section class="success-story-homev2 fade-section" id="success-stories">
          <div class="container-fluid">
            <div class="row justify-content-center">
              <div class="col-lg-8">
                <div class="success-story-cont-top-homev2  margin-bottom4">
                  <h2>Discover How KwikBot Can Transform Your Business</h2>
                  <p>Our AI-powered chatbots are designed to help businesses
                    like yours streamline operations, enhance customer
                    engagement, and drive growth. </p>
                </div>
              </div>
            </div>
          </div>
          <div class="container">

            <div class="warrap">
              <div class="owl-carousel owl-theme owl-loaded">
                <div class="owl-stage-outer">
                  <div class="owl-stage">
                    <div class="owl-item">
                      <div class="row">
                        <div class="col-lg-6">

                          <div class="card-success-homev2">
                            <h3>The Future of Daycare Management</h3>
                            <p> <a href="day-care.html">Discover the Magic of AI Chatbot in Daycare
                              <span><i class="fa-solid fa-chevron-right"></i></span></a></p>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="image-mobile-homev2">
                            <img src="images/homev2/daycare-mobile.png" class="ssimg"/>

                            <div class="ai-chat-box-homev2">
                              <div class="icon-chat-mage-chat-homev2">
                                <p>Great news, Mrs. Johnson! Emily's enrollment
                                  for the
                                  Fall session is confirmed. Welcome to our
                                  daycare
                                  family! 🎉</p>
                                <img src="images/homev2/ai-icon-homev2.png" alt="" class="chatimg"/>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="owl-item">
                      <div class="row">
                        <div class="col-lg-6">

                          <div class="card-success-homev2">
                            <h3>Empower Your Fitness Business</h3>
                            <p> <a href="fitness.html">Discover the Magic of AI Chatbot
                              in Fitness
                              <span><i class="fa-solid fa-chevron-right"></i></span></a></p>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="image-mobile-homev2">
                            <img src="images/homev2/fitness-mobile.png" class="ssimg"/>

                            <div class="ai-chat-box-homev2">
                              <div class="icon-chat-mage-chat-homev2">
                                <p>Congrats Mr. Sam! You have successfully subscribed the monthly plan. <br/>Welcome to our
                                  fitness club! 🎉</p>
                                <img src="images/homev2/ai-icon-homev2.png" alt="" class="chatimg"/>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- Navigation Buttons --> */}
                <div class="owl-nav homev2">
                  <button class="owl-prev homev2"><i
                      class="fa-solid fa-chevron-left"></i> </button>
                  <button class="owl-next homev2"> <i
                      class="fa-solid fa-chevron-right"></i></button>
                </div>
              </div>

            </div>
          </div>

        </section>

        {/* <!-- APPROACH SECTION START --> */}
        <section class="our-approach-homev2 fade-section" id="our-approach">
          <div class="container-fluid">
            <div class="row justify-content-center">
              <div class="col-lg-7">
                <div class="success-story-cont-top our-approach-card-homev2">
                  <h2>Our Approach</h2>
                  <p class="home">Powered by ChatGPT's advanced AI technology Kwikbot
                    transforms your website into a dynamic and
                    intelligent platform</p>
                </div>

              </div>
            </div>
          </div>

          <div class="container-fluid PX-5">
            <div class="row">
              <div class="col-lg-4">
                <div class="our-approach-heading white-g-homev2">
                  <h3>Data Collection & Training</h3>
                  <p>We'll collect relevant data, FAQs, and knowledge base of
                    your
                    business and make the bot learn all of
                    it.</p>
                </div>
              </div>

              <div class="col-lg-4">
                <div class="our-approach-heading02 white-g-homev2">
                  <h3>Integration & Testing</h3>
                  <p>We integrate the both with your business systems, such as
                    customer databases, and ticketing systems.
                  </p>
                </div>
              </div>

              <div class="col-lg-4">
                <div class="our-approach-heading03 white-g-homev2">
                  <h3>Go Live & Enhance</h3>
                  <p>Make live and Continuously enhance the chatbot's
                    capabilities
                    and adapt it to changing customer needs..
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <FooterHome/>
    </div>
  )
}

export default Home
