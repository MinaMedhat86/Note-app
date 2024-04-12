import notesImg from "../../Assests/images/notes1.png";
import {useFormik} from "formik"
import * as yup from "yup"
import axios from "axios"
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import {Helmet} from "react-helmet";

export default function Login() {

  const navigate = useNavigate();

  
  let regexPass = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  const[errorMsg , setErorrMsg] = useState("")
  const[isLoading ,setIsLoading] = useState(false)


 async function submitLogIn(values){
  // console.log(values);
  setIsLoading(true)
  let {data} = await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signIn`, values)
  .catch((error)=>{
    setErorrMsg(error.response.data.msg)
    setIsLoading(false)
  } )
 if(data.msg === "done"){
  console.log(data);
  localStorage.setItem("userToken" , data.token)
  setIsLoading(false)
  navigate('/note-app');
 }

 }

  let validationSchema = yup.object({
    email : yup.string().email("Must End with @example.com").required("This Field is Required"),
    password : yup.string().matches(regexPass , "Password must have 8 char and min 1 num and 1 special char").required("This Field is Required"),
  
  })



  let formik =  useFormik({
    initialValues:{
      email : "",
      password : "", 
    },
    validationSchema,
    onSubmit: submitLogIn,
  })


  return <>

<Helmet>
                <meta charSet="utf-8" />
                <title>LogIn </title>
            </Helmet>
      <li className="fixed-top p-3 pe-lg-5 d-lg-flex d-none mt-5 ">
        <i className="fa-regular fa-note-sticky text-info fs-2"></i>
        <p className="ps-2 fs-4 fw-bold">Notes</p>
      </li>
      <div className="container">
        <div className="row">
          <div className="col-lg-5 d-none d-lg-flex justify-content-center align-items-center">
            <img className="w-100 p-5" src={notesImg} alt="" />
          </div>

          <div className="col-lg-7">
            <div className="min-vh-100 d-flex justify-content-center align-items-center text-center signup-container">
              <div className="bg-light bg-opacity-25 shadow w-100 mx-auto  p-5 rounded-2">
                <h1 className="fw-bold">Sign In Now</h1>
                <div className="pt-3">
                <form onSubmit={formik.handleSubmit}>
                  {errorMsg?<div className="alert alert-danger py-1">
                  {errorMsg}
                    </div> : null}
                  <input
                    value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                      className="form-control my-2"
                      type="email" name="email" id="email"
                      placeholder="Enter Your Email"
                    />
                    {(formik.errors.email && formik.touched.email)?<div className="alert alert-danger py-1">
                      {formik.errors.email}
                    </div> : null}
                    <input
                    value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
                      className="form-control my-2"
                      type="password" name="password" id="password"
                      placeholder="Enter Your Password"
                    />
                    {(formik.errors.password && formik.touched.password)?<div className="alert alert-danger py-1">
                      {formik.errors.password}
                    </div> : null}

                    <button
                      type="submit"
                      className="btn btn-info text-light w-100 rounded-2 mt-2"
                    >
                      {isLoading?<i className="fa fa-spinner fa-spin"></i>: "Sign In"}
                    </button>
                  </form>
                  <p>Don't Have Account ? <Link to="/" className=" text-primary ms-2 text-decoration-none fw-medium">Register Now</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

}
