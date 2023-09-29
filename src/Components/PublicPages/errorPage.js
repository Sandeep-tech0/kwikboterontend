import React from 'react'
import Header from './components/header'
import PlanFooter from './components/planfooter';
import { Link } from 'react-router-dom';

const errorPage = () => {
  return (
    <div> 
    <Header/>
    <main>
    
    <div class="container errorpage">
      <div class="error-code">404</div>
      <div class="error-message">Oops! Page not found.</div>
      <p>The page you are looking for might have been removed or is
        temporarily unavailable.</p>
      <Link to="/" class="back-home">Back to Home</Link>
    </div>
  </main>
  <PlanFooter/>
  </div>
  )
}

export default errorPage