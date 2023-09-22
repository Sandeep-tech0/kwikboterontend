import React from 'react'
import { Link } from 'react-router-dom'


const PlanFooter = () => {
  return (
    <div>

<footer>
        <div class="container-fluid px-5">
          <div class="row fade-section align-items-end">
            <div class="col-lg">
              {/* <!--Social Medial Links--> */}
              <div class="social-media-links">
                <ul>
                  <li><Link to="/" ><img src="images/kwikbot-bran-logo.png"
                    alt class="logo-footer"/></Link></li>
                  <li><Link to="https://www.linkedin.com/company/kwikbot/"
                    target="_blank"><i class="fab fa-linkedin-in"></i></Link></li>
                  <li><a to="https://www.facebook.com/people/Kwikbot/100095262945411/"
                      target="_blank"><i class="fab fa-facebook-f"></i></a></li>
                  <li><Link to="https://twitter.com/KwikBot" target="_blank" class="twitterlink">
                    <img src="images/homev2/tube.png" alt=""/>
                  </Link></li>                
                  <li><Link to="https://www.instagram.com/kwikbot/"
                      target="_blank"><i class="fab fa-instagram"></i></Link></li>
                </ul>
              </div>
    
                   
            </div>
            <div class="col-lg">
              <div class="footer-ul text-end">
                <ul>
                  <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                  <li><Link to="/terms-of-use">Terms of Use</Link></li>
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

export default PlanFooter
