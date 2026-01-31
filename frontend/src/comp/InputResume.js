import React,{useState} from 'react'
import { toast } from "react-toastify";
const InputResume = ({setshow,setstoreResult,setLoading}) => {

    const [resumeFile, setResumeFile] = useState(null);
    const [jobTitle, setJobTitle] = useState('');
    
    const [jobDescription, setJobDescription] = useState(' ');
    
    //function to handle file upload
    const handleFileUpload = (event) => {
       setResumeFile(event.target.files[0]);
    }

    //function to handle submit button
    const submitBtn =async (e) => {
       if (!resumeFile) {
    toast.error("Please upload your resume 📄");
    return;
  }

  if (!jobTitle.trim()) {
    toast.warning("Please enter a job title 🧑‍💼");
    return;
  }

  if (!jobDescription.trim()) {
    toast.warning("Please enter a job description 📝");
    return;
  }
      setshow(true);
      e.preventDefault();
      setLoading(true);
      const formData = new FormData();
  formData.append("resumeFile", resumeFile);
  formData.append("jobTitle", jobTitle);

  formData.append("job_description", jobDescription);
        console.log("Resume file:", resumeFile);
        console.log("Job title:", jobTitle);
       
        console.log("Job description:", jobDescription);
        //connect to backend API here
        const connectData=await fetch("https://resumefit-ai.onrender.com/submitForm",{
         method:"POST",
         body:formData
        })
        const result=await connectData.json();
       
        try{
          const analysis=JSON.parse(result.analysis);
          setstoreResult(analysis);
          console.log("Parsed analysis:", analysis);
        }catch(err){
          console.error("Error parsing analysis:", err);  

        }finally{
          setLoading(false);
        }
      }
  return (
    <div className='div-jobChecker'>
          <div className='div-resume'>
       <p className='header'>Upload Resume and job description here</p>
       <div className='div-uploadresume'> 
        <label className='label-resume'>Upload Resume <span>*</span></label>
          <input type="file" className='input-resume' onChange={handleFileUpload} />
       </div>
         <div className='div-job'>
            <label className='label-resume'> Job title <span>*</span></label>
            <input type="text" className='label-text' onChange={(e) => setJobTitle(e.target.value)} value={jobTitle} />
           
            <label className='label-resume'> Job description <span>*</span></label>
            <textarea type="text"  rows="6" onChange={(e) => setJobDescription(e.target.value)} value={jobDescription} />
         </div>
         <div className='div-btn'>
           
            <button className='btn-generate' onClick={submitBtn}>Generate Anaylsis</button>
         </div>
    </div>
    </div>
    
  )
}

export default InputResume
