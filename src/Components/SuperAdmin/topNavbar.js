import React from 'react';
import { Navbar, Nav, Form,Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const TopNavbar = () => {
 
  const userData = JSON.parse(localStorage.getItem('user'));
  if(!userData){
    window.location.href = "/superadmin/login";
  }
 
  
  ///=================Logout===================///
  const handleLogout = () => {
    localStorage.removeItem("kwikbot-superadmin-token");
    window.location.href = "/superadmin/login";
    
  };

  
  return (
    <div>
       
      <Navbar  expand="lg" className='px-5 bg-blue'>
      <Link to="/" >
            <Navbar.Brand className='text-white'>Kwikbot</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                
                <Form inline>
                 <Nav className='align-items-center justify-content-end'>
                        <Navbar.Brand href="#home" className='text-white'>{userData?.firstName}{""} {userData?.lastName} <br/> Super Admin</Navbar.Brand>                        
                        <Dropdown>
                <Dropdown.Toggle variant="link" id="dropdown-profile">
                  <img src="/images/superadminimages/avter.jpg"  className='avter-img  '  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleLogout} className="btn-logout" >Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
                 </Nav>
                </Form>
            </Navbar.Collapse>
            </Navbar>
   
    </div>
  )
}

export default TopNavbar;
