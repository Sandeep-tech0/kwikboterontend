import React from 'react'
import Header from '../header';
import { useNavigate } from 'react-router-dom';

const Confirm = () => {
const navigate = useNavigate();
const handlebackclick = (e) => {
  e.preventDefault();
  navigate("/admin/mysubscribption");
}

  return (
    <div>
      <Header />
     
        <section className="confirm-message-section"  >
          <div className="confirm-message">
            <h3>Congratulations!!</h3>
            <p>Your payment is Successful</p>

            <div class="go-back">
              <a href="" className="go-back" onClick={handlebackclick}>Go Back</a>
            </div>

          </div>

        </section>
     
    </div>
  )
}

export default Confirm
