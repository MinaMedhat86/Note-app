import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Sidebar() {

   function logOut (){
    localStorage.removeItem("userToken");
  

   }
    
  return  <>
        <div className=' position-fixed' >
                    
                        <div className='d-none d-md-inline'>
                        <div className="pe-5 pt-2 min-vh-100 bg-dark ">
                        
                        <ul className="text-light list-unstyled">

                            <li className="p-3 pe-lg-2 d-lg-flex d-none  ">
                            <i className="fa-regular fa-note-sticky text-info fs-2"></i>                           
                            <p className='ps-3 fs-4'>Notes</p>
                            </li>
                            
                            <li className="p-3 pe-lg-5 sidebar-element">
                                <Link to="/note-app" className="nav-link px-0 px-lg-2">
                                     <i className="bi-house"/><span className="px-lg-2 ms-1 d-lg-inline">Home</span> </Link>
                            </li>
                          
                            <li className="p-3 pe-lg-5 sidebar-element">
                                <Link to="/login" className="nav-link px-0 px-lg-2">
                                     <i className="bi bi-box-arrow-left" ></i><span onClick={()=>{logOut()}} className="px-lg-2 ms-1 d-lg-inline">Logout</span> </Link>
                            </li>

                        </ul>
                    </div>
                    </div>
            </div>
    </>
 
}
