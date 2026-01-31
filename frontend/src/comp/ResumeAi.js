import React from 'react'
import { BsCheckCircleFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { MdTipsAndUpdates } from "react-icons/md";
import { GiBrain } from "react-icons/gi";
const ResumeAi = ({storeResult,setshow}) => {
  console.log("storeResult in jobchecker:",storeResult);
  return (
    <div className='div-resume-div'>
      <div className='div-header'>
            <h2>Resume Analysis</h2>
      </div>
     <div className='div-output'>
 <div className='div-matched'>
         <h3>Matched Score: {storeResult.matched_score}%</h3>
          <div className="score-bar">
    <div className="score-fill matched" style={{ width: `${storeResult.matched_score}%` }} />
  </div>
         <h4>Matched Points:</h4>
         <div className='div-list'>
         
            {storeResult.matched_details && storeResult.matched_details.length > 0 ? (
       <ul className="matched-list">
              {storeResult.matched_details.map((detail, index) => (
              <li key={index}>
                 <BsCheckCircleFill className="check-icon" />
                <p>{detail}</p>
                </li>
            ))}
            </ul> 
        ): null}
          
          
         </div>
        
      </div>
      <div className='div-missing'>
         <h3>Missing Score: {storeResult.missing_score}%</h3>
          <div className="score-bar">
  <div className="score-fill missing" style={{ width: `${storeResult.missing_score}%` }} />
</div>
         <h4>Missing Points:</h4>
         <div>
              {storeResult.missing_details && storeResult.missing_details.length > 0 ? (
            <ul className="matched-list">
              {storeResult.missing_details.map((detail, index) => (
              <li key={index}>
                 <MdCancel className="check-icon" />
                <p>{detail}</p>
                </li>
            ))}
            </ul>
           
        
        ) : null}
         </div>
       
      </div>
    <div className='div-matched' style={{borderLeft: '5px solid #e5bb46'}}>

         <h4>Improvement Suggestions:</h4>
        {storeResult.improvement_suggestions && storeResult.improvement_suggestions.length > 0 ? (
            <ul className="matched-list">
              {storeResult.improvement_suggestions.map((detail, index) => (
              <li key={index}>
                <GiBrain className="check-icon" />
                <p>{detail}</p>
              </li>
            ))}
            </ul>
           
        
        ) : null}
      </div>
      <div className='div-matched' style={{borderLeft: '5px solid #46cde5'}}>
         
         <h4>Tailoring Tips:</h4>
        {storeResult.tailoring_tips && storeResult.tailoring_tips.length > 0 ? (
            <ul className="matched-list">
              {storeResult.tailoring_tips.map((detail, index) => (
              <li key={index}>
                <MdTipsAndUpdates className="check-icon" />
                <p>{detail}</p>
              </li>
            ))}
            </ul>
        ) : null}
      </div>
     </div>
     <div className='navigation-div'>
        <button className='btn-nav' onClick={()=>setshow(false)}>Edit Form</button>
     </div>
    </div>
  )
}

export default ResumeAi