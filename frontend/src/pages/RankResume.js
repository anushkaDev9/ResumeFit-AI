import React, { useState, useEffect } from "react";
import Loader from "../comp/Loader";
import { toast } from "react-toastify";

const RankResume = () => {
  const [loading, setLoading] = useState(false);
  const [resumeFiles, setResumeFiles] = useState([]);
  const [jobDesc, setJobDesc] = useState("");
  const [storeResult, setStoreResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // Debug helper (safe to remove later)
  useEffect(() => {
    if (resumeFiles.length > 0) {
      console.log("Selected resumes:", resumeFiles);
    }
  }, [resumeFiles]);

  const handleFileChange = (e) => {
  const newFiles = Array.from(e.target.files);

  setResumeFiles((prev) => {
    const existingNames = prev.map(f => f.name);
    const filtered = newFiles.filter(
      f => !existingNames.includes(f.name)
    );
    return [...prev, ...filtered];
  });

  e.target.value = null; // 🔥 IMPORTANT: allows re-selecting
};
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ VALIDATION FIRST
    if (resumeFiles.length < 2) {
      toast.error("Please select at least 2 resumes");
      return;
    }

    if (!jobDesc.trim()) {
      toast.error("Please enter the job description");
      return;
    }

    setLoading(true);
    setShowResult(true);

    const formData = new FormData();
    resumeFiles.forEach((file) => {
      formData.append("resumeFile", file); // must match backend
    });
    formData.append("jobDescription", jobDesc);

    try {
      const res = await fetch("http://localhost:8000/rank-resume", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setStoreResult(data);

      if (data.error) {
        toast.error(data.error);
        setShowResult(false);
      } else {
        toast.success("Resumes ranked successfully!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
      setShowResult(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checker-container">
      {/* ===== Upload Card ===== */}
      {!showResult && (
        <div className="upload-card">
          <h2>📄 Resume Ranker</h2>
          <p className="subtitle">
            Upload multiple resumes and find the best one for the job
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              required
            />

            <p className="hint">
              Hold <b>Ctrl</b> (Windows) or <b>Cmd</b> (Mac) to select multiple
              resumes
            </p>

            {resumeFiles.length > 0 && (
              <p className="file-count">
                {resumeFiles.length} resumes selected
              </p>
            )}

            <textarea
              className="label-text job-input"
              placeholder="Paste job description here"
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              required
            />

            <button className="primary-btn" type="submit" disabled={loading}>
              {loading ? "Ranking..." : "Rank the Best Resume"}
            </button>
          </form>
        </div>
      )}

      {/* ===== Loader ===== */}
      {loading && <Loader />}

      {/* ===== Result (temporary JSON view) ===== */}
      {!loading && showResult && storeResult && (
        <div className="result-card">
          <h3>🏆 Best Resume</h3>
          <p>
            <b>{storeResult.best_resume}</b>
          </p>

          <h4>Ranked Resumes</h4>
          <ul>
            {storeResult.ranked_resumes?.map((item, index) => (
              <li key={index}>
                <b>{item.file_name}</b> — {item.matching_score}%
                <br />
                <small>{item.reason}</small>
              </li>
            ))}
          </ul>

          {storeResult.improvement_suggestions?.length > 0 && (
            <>
              <h4>Suggestions to Improve Best Resume</h4>
              <ul>
                {storeResult.improvement_suggestions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </>
          )}

          <button
            className="secondary-btn"
            onClick={() => {
              setShowResult(false);
              setStoreResult(null);
              setResumeFiles([]);
              setJobDesc("");
            }}
          >
            Rank Again
          </button>
        </div>
      )}
    </div>
  );
};

export default RankResume;
