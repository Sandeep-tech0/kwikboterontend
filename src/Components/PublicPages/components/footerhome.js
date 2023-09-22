import React from 'react'
import { Link } from 'react-router-dom'


const FooterHome = () => {
  return (
    <div>
      
      <section class="be-were fade-section">
          <div class="container-fluid mt-5">
            <div class="row justify-content-center">
              <div class="col-lg-7">
                <div class="circle-first">
                  <img src="images/home/icon01.png" alt class="circle-icon01"/>
                  <img src="images/home/icon02.png" alt class="circle-icon02"/>
                  <img src="images/home/icon03.png" alt class="circle-icon03"/>
                  <img src="images/home/icon04.png" alt class="circle-icon04"/>
                  <img src="images/home/icon05.png" alt class="circle-icon05"/>

                  <div class="circle-second bg-blue-ligth-homev2">
                    <h2>Be where your <br/>
                      customers are</h2>
                    <p>Integrate kwikbot to your website and popular <br/>
                      messaging
                      platforms</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bag-traform">
            <div class="container-fluid px-5">
              <div class="box-card-homev2 text-center">
                <h2>Book a demo and start seeing the ROI</h2>
                <p>Generate More Leads, Increase Conversions, and Delight
                  Customers!</p>
                <div class="card-btn-book"><Link to="/book-a-demo">Book a
                    Demo</Link></div>
              </div>
            </div>
          </div>
        </section>

      <footer>
        <div class="container-fluid px-5">
          <div class="row fade-section align-items-end">
            <div class="col-lg">
              {/* <!--Social Medial Links--> */}
              <div class="social-media-links">
                <ul>
                  <li><Link to="/"><img src="images/kwikbot-bran-logo.png"
                        alt class="logo-footer"/></Link></li>
                  <li><Link to="https://www.linkedin.com/company/kwikbot/"
                      target="_blank"><i class="fab fa-linkedin-in"></i></Link></li>
                  <li><Link
                      to="https://www.facebook.com/people/Kwikbot/100095262945411/"
                      target="_blank"><i class="fab fa-facebook-f"></i></Link></li>
                  <li><Link to="https://twitter.com/KwikBot" target="_blank"
                      class="twitterlink">
                      <img src="images/homev2/tube.png" alt />
                    </Link></li>
                  <li><Link to="https://www.instagram.com/kwikbot/"
                      target="_blank"><i class="fab fa-instagram"></i></Link></li>
                </ul>
              </div>

            </div>
            <div class="col-lg">
              <div class="footer-ul text-end">
                <ul>
                  <li><Link to="privacy-policy.html">Privacy Policy</Link></li>
                  <li><Link to="terms-of-use.html">Terms of Use</Link></li>
                </ul>
                <div class="text-end kwikbot-text">
                  <Link to="https://acompworld.com" target="_blank">©2023
                    acompworld.com</Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </footer>

    </div>
  )
}

export default FooterHome
