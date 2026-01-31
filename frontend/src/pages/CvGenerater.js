
import React, { useState } from "react";
import Loader from "../comp/Loader";
import { toast } from "react-toastify";
const CvGenerater = () => {
    const [resumeFile, setResumeFile] = useState(null);
      const [loading, setLoading] = useState(false);
      const [storeResult, setStoreResult] = useState(null);
      const [show, setShow] = useState(false);
      const [jobDescription, setJobDescription] = useState("");
      const [companyName, setCompanyName] = useState("");
      const [additionalInfo, setAdditionalInfo] = useState("");
      const handleFileUpload = (e) => {
        setResumeFile(e.target.files[0]);
      };
const checkResume = async () => {
    if (!resumeFile) {
      toast.error("Please upload your resume file.");
      return;
    }   
    setLoading(true);
     setShow(true);
      const formData = new FormData();
    formData.append("resumeFile", resumeFile);
    formData.append("jobDescription", jobDescription);
    formData.append("companyName", companyName);
    formData.append("additionalInfo", additionalInfo);
     try {
      const res = await fetch("http://localhost:8000/cv-generator", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setStoreResult(data);
      console.log("CV Generated:", data);
    } catch (err) {
      
    } finally {
      setLoading(false);
    }
}
  return (
     <div className="checker-container">
           {!show&& <div className="upload-card">
    <h2>📄 CV Generator</h2>
    <form>
      
    </form>
    <p className="subtitle">Upload your resume and JOB Description TO  get instant cv</p>

    <input type="file" onChange={handleFileUpload} required />
    <input type="text" className="label-text job-input"
  placeholder="Company Name" value={companyName||""} onChange={(e) => setCompanyName(e.target.value)}/>
   <textarea
  type="text"
  className="label-text job-input"
  placeholder="Enter Job Description"
  required
  value={jobDescription}
  onChange={(e) => setJobDescription(e.target.value)}
/>
<textarea
  type="text"
  className="label-text job-input"
  placeholder="Additional Information"
  
  value={additionalInfo||""}  
  onChange={(e) => setAdditionalInfo(e.target.value)}
/>
    <button className="primary-btn" onClick={checkResume}>
     Generate CV
    </button>
  </div>}  
   {loading && <Loader />}
    
     </div>
    
  )
}

export default CvGenerater