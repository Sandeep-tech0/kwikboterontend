import React from 'react'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const SideBarAdmin = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
    
    const location = useLocation();
    
  return (
    <div>
    
   <button className="toggle-button" onClick={toggleSidebar}>
                          {isSidebarOpen ? <i class="fa-solid fa-bars-staggered"></i> : <i class="fa-solid fa-x"></i>}
                        </button>
<div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                    
                        <div >
                        <ul className='left-bar'>
                           
                             <li><Link to="/superadmin/users"
                             className={location.pathname === '/superadmin/users' ? 'actived' : 'inactive'}><i class="fa-solid fa-chart-bar"></i> User Management</Link></li>
                              <li><Link to="/superadmin/transactions"
                             className={location.pathname === '/superadmin/transactions' ? 'actived' : 'inactive'}><i class="fa-solid fa-money-bill-transfer"></i> Transactions</Link></li>
                        </ul>
                    </div>
             
                </div>
    </div>
  )
}

export default SideBarAdmin
