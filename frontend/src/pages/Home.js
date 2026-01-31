import React from 'react'
import Card from '../comp/Card'

const Home = () => {
   
  return (
    <div className='div-home'>
        <Card link="/resume-checker" title="Quick Resume Review" subTitle="Fix errors & improve clarity" des="Instantly review your resume using AI to identify grammatical errors, formatting issues, and missing or weak sections.
        This mode provides actionable suggestions to improve clarity, structure, and ATS compatibility helping you present a clean, professional resume." />
        <Card link="/job-checker" title="AI Job Fit Analyzer" subTitle="See how well your resume matches a role" des="Upload your resume and a job description to receive an AI-driven compatibility analysis.
The system compares skills, experience, and qualifications to calculate a match percentage, highlight gaps, and provide targeted improvement recommendations." />

        
           
    </div>
  )
}

export default Home