import React from 'react'
import style from "./Header.module.css"
import { useRecoilState } from 'recoil';
import {noteState} from "../Atoms/NoteAtom"

export default function Header() {
  const[noteLenght , setNoteLenght] = useRecoilState(noteState);
  return <>
  
  <div className ={`${style.headerColor} w-100 p-2 text-white text-center fixed-top`}>Notes App : <span className=' fw-medium ms-1'>{noteLenght}</span>    </div>
  
  </>
}
