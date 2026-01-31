import React from 'react'
import { BsCheckCircleFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { MdTipsAndUpdates } from "react-icons/md";
import { GiBrain } from "react-icons/gi";
const AiResume = () => {
  return (
    <div  className='div-loading'>
      <div className='div-loader'>
        <div className='div-square'>
          <span></span>
          <span></span>
          <span></span>
          <span></span> 
        </div>
        <div className='div-lines'>
             <h5>Analyzing your resume…</h5>
         <p>One moment please</p>
        </div>
       
     
    </div>
    </div>
     
  )
}

export default AiResume