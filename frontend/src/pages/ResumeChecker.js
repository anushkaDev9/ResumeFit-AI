import React, { useState } from "react";
import Loader from "../comp/Loader";
import { toast } from "react-toastify";
const ResumeChecker = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [storeResult, setStoreResult] = useState(null);
  const [show, setShow] = useState(false);

  const handleFileUpload = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const checkResume = async () => {
     if (!resumeFile) {
    toast.error("Please upload a resume first 📄");
    return;
  }

    setLoading(true);
    setShow(true);

    const formData = new FormData();
    formData.append("resumeFile", resumeFile);

    try {
      const res = await fetch("https://resumefit-ai.onrender.com/resume-checker", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setStoreResult(data);
    } catch (err) {
      console.error("Error checking resume:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checker-container">
      {!show && <div className="upload-card">
    <h2>📄 Resume Checker</h2>
    <form>
      
    </form>
    <p className="subtitle">Upload your resume and get instant AI feedback</p>

    <input type="file" onChange={handleFileUpload} required />

    <button className="primary-btn" onClick={checkResume}>
      Check Resume
    </button>
  </div>}
  

  {loading && <Loader />}

  {!loading && show && storeResult && (
    <div className="result-card">
      <h3>🧠 Resume Analysis</h3>

     {storeResult.errors?.length > 0 && (
  <div className="error-grid-section">
    <h4>❌ Issues Found</h4>

    <div className="error-grid">
      {storeResult.errors.map((item, index) => (
        <div key={index} className="error-grid-card">
          <p className="label">Original</p>
          <p className="text">{item.original}</p>

          <p className="label">Corrected</p>
          <p className="text corrected">{item.corrected}</p>

          <p className="label">Reason</p>
          <p className="reason">{item.reason}</p>
        </div>
      ))}
    </div>
  </div>
)}
    </div>
  )}
</div>

  );
};

export default ResumeChecker;
