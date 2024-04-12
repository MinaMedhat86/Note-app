import React from 'react'
import notFound from "../../Assests/images/notFound.png"
import { Link } from 'react-router-dom'

export default function Notfound() {
  return  <>
  <section >
  
          <div className=' mt-5 pt-5 d-flex align-items-center justify-content-center'>
            <img src={notFound} className='w-50' alt="notFound" />
            
          </div>
          <Link to={"/note-app"}>
              <button className=' position-relative start-50 translate-middle-x mt-3 btn btn-primary px-4 px-2'> Back To Home</button>
            </Link>
  </section>
</>
}
