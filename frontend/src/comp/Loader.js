import React from "react";


const Loader = () => {
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
  );
};

export default Loader;
