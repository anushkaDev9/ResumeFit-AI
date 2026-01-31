import React,{useState} from 'react'
import InputResume from '../comp/InputResume'
import ResumeAi from '../comp/ResumeAi'
import { s } from 'motion/react-client';
import Loader from '../comp/Loader';
const JobChecker = ({}) => {
    const [storeResult,setstoreResult]=useState("");
    const [show,setshow]=useState(false);
    const[loading,setLoading]=useState(false);
    
  return (
    <div>
       {!show && <InputResume setshow={setshow} setstoreResult={setstoreResult}  setLoading={setLoading}/> } 
       {loading && <Loader />}
       {!loading && show && <ResumeAi storeResult={storeResult} setshow={setshow} loading={loading}  />} 
    </div>
  )
}

export default JobChecker