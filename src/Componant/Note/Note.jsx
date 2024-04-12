import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import {useFormik} from "formik"
import * as yup from "yup"
import axios from "axios"
import { Slide } from "react-awesome-reveal";


import { useState } from 'react';

import toast, { Toaster } from 'react-hot-toast';


export default function Note({note , getNotes} ) {
   
    const[isLoading , setIsLoading] = useState(false)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // console.log(note.note.title);

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
        onSubmit: updateNote,
      })
    
      async function updateNote(values){
        setIsLoading(true)
        // console.log(note._id);
        let response = await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${note._id}` , values , {
            headers:{
                token : `3b8ny__${localStorage.getItem("userToken")}`
              }
        }).catch((erorr)=>{console.log(erorr);})
        .finally(()=>{handleClose()})
        
        if(response.status === 200){  
            toast.success('Successfully Update Note' , {
              duration: 4000,
              position: 'top-center',
      
              className: ' bg-warning mt-2 text-white',
            
            })
            getNotes()
            setIsLoading(false)
        }
      }

async function deleteNote(){
    let response = await axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`,{
        headers:{
            token : `3b8ny__${localStorage.getItem("userToken")}`
          }
    }).catch((erorr)=>{console.log(erorr);})
    .finally(()=>{handleClose()})

    if(response.status === 200){  
        toast.error('Successfully Delete Note' , {
          duration: 4000,
          position: 'top-center',
  
          className: ' bg-danger mt-2 text-white',
        
        })
        getNotes()
        setIsLoading(false)
    }
}
  return <>
  <Toaster />
<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Note
          <i className="fa-regular fa-note-sticky ms-2 "></i>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form  >
          <input
          value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur}
           className=' form-control mb-3'
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
           {(formik.errors.content && formik.touched.content)?<div className="alert alert-danger py-1 mt-3">
                      {formik.errors.content}
                    </div> : null}
          </form>
          
        </Modal.Body>
        <Modal.Footer>
        
          <Button variant="primary" disabled={!(formik.isValid&&formik.dirty)} onClick={formik.handleSubmit} className=' btn-warning text-white fw-semibold py-2 px-5'>
            {isLoading?<i className="fa fa-spinner fa-spin"></i>:"Update Note"}
          </Button>
        </Modal.Footer>
      </Modal>
  <div className=' col-md-6 p-3' >
                <div >
                    <Slide direction='up'>
                    <Card >
      <Card.Body>
        <Card.Title className=' border-bottom pb-2 fw-bolder ms-2'>
        <i class="fa-solid fa-map-pin me-2"></i>
            {note.title}</Card.Title>
       
        <Card.Text className="my-4 ms-3"> {note.content}</Card.Text>
        <i class="fa-solid fa-pen-to-square fs-3 mx-4 cursor-pointer text-warning" variant="primary" onClick={handleShow}></i>
        <i class="fa-solid fa-trash fs-3 cursor-pointer text-danger" onClick={deleteNote}></i>
      </Card.Body>
    </Card>
                    </Slide>
 
                  
                </div>

              </div>
  
  </>
}
