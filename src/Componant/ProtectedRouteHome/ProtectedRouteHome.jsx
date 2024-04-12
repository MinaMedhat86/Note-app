import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProtectedRouteHome(props) {
    let navigate =useNavigate()
 useEffect(()=>{
    if(localStorage.getItem("userToken")){
        navigate("/note-app")
    }
 },[])
 return props.children
}
