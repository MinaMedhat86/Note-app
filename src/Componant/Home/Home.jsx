import React, { useEffect } from 'react'
import style from  "./Home.module.css"
import Sidebar from '../Sidebar/Sidebar'

import {useFormik} from "formik"
import * as yup from "yup"
import axios from "axios"

import {Helmet} from "react-helmet";

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {noteState} from "../Atoms/NoteAtom"
import Note from "../Note/Note"

import toast, { Toaster } from 'react-hot-toast';

import { Circles } from 'react-loader-spinner'

// import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil'



export default function Home() {
 const[noteLenght , setNoteLenght] = useRecoilState(noteState);
 const[isHugeLoading , setIsHugwloading] = useState(true)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

const[isLoading , setIsLoading] = useState(false)

 async function addNote(values){
  setIsLoading(true)
  let {data} = await axios.post(`https://note-sigma-black.vercel.app/api/v1/notes`,values, {
    headers:{
      token : `3b8ny__${localStorage.getItem("userToken")}`
    }
  }).then((response)=>{console.log(response);
    getNotes()
    setIsLoading(false);
 
  })
  .catch((erorr)=>{console.log(erorr);
    setIsLoading(false);
  })
  .finally(()=>{handleClose()})
  }

  let validationSchema = yup.object({
    title : yup.string().min(3, "Min Char is 3").max(40 , "Max Char is 40").required("This Field is Required"),
    content : yup.string().min(5, "Min Char is 5").required("This Field is Required"),
    
  })

  let formik = useFormik({
    initialValues:{
      title: "", 
      content : ""
    },
    validationSchema,
    onSubmit: addNote,
  })


  const[getUserNotes , setGetUserNotes] = useState([])
  async function getNotes(){
    let response = await axios.get (`https://note-sigma-black.vercel.app/api/v1/notes` ,{
      headers:{
        token : `3b8ny__${localStorage.getItem("userToken")}`
      }
    }).then((response)=>{console.log(response);
      setNoteLenght(response.data.notes.length);
      setGetUserNotes(response.data.notes)
      setIsHugwloading(false);
 
    })
    .catch((erorr)=>{console.log(erorr);})
   
  }
useEffect(()=>{
  getNotes()
 
} ,[])

  return <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Notes</title>
            </Helmet>
  
  <Toaster />
<div className=' overflow-hidden'>
<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Note
          <i className="fa-regular fa-note-sticky ms-2"></i>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form  >
          <input
          value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur}
           className=' form-control mb-3 '
           type="text" name='title' id='title'
           placeholder='Enter Note Title '
           />
          {(formik.errors.title && formik.touched.title)?<div className="alert alert-danger py-1">
                      {formik.errors.title}
                    </div> : null}
          <textarea
          value={formik.values.content} onChange={formik.handleChange} onBlur={formik.handleBlur}
          className=' form-control'
           name="content" id="content" 
           placeholder='Enter Note Content'
           ></textarea>
           {(formik.errors.content && formik.touched.content)?<div className="alert alert-danger py-1">
                      {formik.errors.content}
                    </div> : null}
          </form>
          
        </Modal.Body>
        <Modal.Footer>
        
          <Button variant="primary" disabled={!(formik.isValid&&formik.dirty)} onClick={formik.handleSubmit} className='py-2 px-5'>
            {isLoading?<i className="fa fa-spinner fa-spin"></i>:"Add Note"}
          </Button>
        </Modal.Footer>
      </Modal>
 

    <div className='row '>
        <div className=' col-md-2'>
        <Sidebar/>
        </div>

        <div className="col-md-10 px-lg-5 px-2 py-5 ">
            <div className="text-end me-2 mb-3">
              <button className="btn btn-info text-white" variant="primary" onClick={handleShow}>
                <i className="fa-solid fa-plus"></i> Add Note
              </button>
            </div>
            <div className="row ">
              {isHugeLoading? <div className='d-flex small-h'>
      <Circles
    visible={true}
    height="100"
    width="100"
    color="#89CFF0"
    ariaLabel="three-circles-loading"
    wrapperStyle={{}}
    wrapperClass="align-items-center w-100 justify-content-center "
    />
      </div>
              : (getUserNotes? getUserNotes.map((note)=>{
                return <Note key={note._id} note={note} getNotes={getNotes}/>
              }  
              ) : "")
              
              
              }
            </div>
          </div>
    </div>
</div>





  
  </>
}
