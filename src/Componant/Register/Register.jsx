import notesImg from "../../Assests/images/notes1.png";
import {useFormik} from "formik"
import * as yup from "yup"
import axios from "axios"
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import {Helmet} from "react-helmet";


export default function Register() {
  const navigate = useNavigate();

  let regexPhone = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
  let regexPass = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  const[errorMsg , setErorrMsg] = useState("")
  const[isLoading ,setIsLoading] = useState(false)


 async function submitRegister(values){
  // console.log(values);
  setIsLoading(true)
  let {data} = await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signUp`, values)
  .catch((error)=>{
    setErorrMsg(error.response.data.msg)
    setIsLoading(false)
  } )
 if(data.msg === "done"){
  // console.log("done");
  navigate('/login');
 }

 }

  let validationSchema = yup.object({
    name : yup.string().min(3, "Min Char is 3").max(40 , "Max Char is 40").required("This Field is Required"),
    email : yup.string().email("Must End with @example.com").required("This Field is Required"),
    password : yup.string().matches(regexPass , "Password must have 8 char and min 1 num and 1 special char").required("This Field is Required"),
    age : yup.number().min(10, "Min age is 10 years").max(90 , "Unreal age").required("This Field is Required"),
    phone : yup.string().matches(regexPhone , "Phone num is Invalid").required("This Field is Required"),
  })



  let formik =  useFormik({
    initialValues:{
      name : "",
      email : "",
      password : "", 
      age: "", 
      phone: ""
    },
    validationSchema,
    onSubmit: submitRegister,
  })

  return <>
  <Helmet>
                <meta charSet="utf-8" />
                <title>Register </title>
            </Helmet>

      <li className="fixed-top p-3 pe-lg-5 mt-5 d-lg-flex d-none  ">
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
                <h1 className="fw-bold">Sign Up Now</h1>
                <div className="pt-3">
                  <form onSubmit={formik.handleSubmit}>
                  {errorMsg?<div className="alert alert-danger py-1">
                  Account Already Exists
                    </div> : null}
                    <input
                      value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}
                      className="form-control my-2"
                      type="text" name="name" id="name"
                      placeholder="Enter Your Name"
                    />
                    {(formik.errors.name && formik.touched.name)?<div className="alert alert-danger py-1">
                      {formik.errors.name}
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
                    <input
                    value={formik.values.age} onChange={formik.handleChange} onBlur={formik.handleBlur}
                      className="form-control my-2"
                      type="number" name="age" id="age"
                      placeholder="Enter Your Age"
                    />
                    {(formik.errors.age && formik.touched.age)?<div className="alert alert-danger py-1">
                      {formik.errors.age}
                    </div> : null}
                    <input
                    value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}
                      className="form-control my-2"
                      type=" tel" name="phone" id="phone"
                      placeholder="Enter Your Phone Number"
                    />
                      {(formik.errors.phone && formik.touched.phone)?<div className="alert alert-danger py-1">
                      {formik.errors.phone}
                    </div> : null}
                    <button
                    disabled={!(formik.isValid && formik.dirty)}
                      type="submit"
                      className="btn btn-info text-light w-100 rounded-2 mt-2"
                    >
                      {isLoading?<i className="fa fa-spinner fa-spin"></i>: "Sign Up"}
                    </button>
                  </form>
                  <p>Already Have Account ? <Link to="/login" className=" text-primary ms-2 text-decoration-none fw-medium">Login</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  
}
