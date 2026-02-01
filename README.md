# ResumeFit-AI
## Inspiration
Have you ever wondered what causes your resume to be rejected? Sometimes, it is not even about your experience, but about little grammatical errors, unclear sentences, and missing keywords that cause your resume to fail ATS filters. <br/>
As a student, I faced a major problem while applying for jobs I did not know what caused my resume to be rejected, even though I thought I was suitable for the position. There was no feedback, no visibility, and no room for improvement. <br/>
To solve this problem, I created ResumeFit AI, an AI-based tool that allows you to compare your resume with the job description and get instant feedback on what you can improve on. It also includes an AI-powered resume review feature that helps you improve the grammar, clarity, and overall structure of your resume.<br/>
## What it does
ResumeFit AI provides two core features:<br/>
**Quick Resume Review**
Users upload their resume, and the AI analyzes it against ATS standards. It identifies grammar, clarity, and formatting issues and returns corrected versions along with brief explanations for each change.<br/>
The AI identifies:
* Grammar and spelling errors
* Clarity and readability issues
* Sentence structure and formatting inconsistencies
* Common mistakes that may cause ATS rejection
For every issue detected, the system provides:<br/>
* The original text
* A corrected version
* A brief explanation explaining why the correction was made<br/>
**AI Job Fit Analyzer**<br/>
Users upload their resume along with a job title and job description. The AI evaluates how well the resume matches the role and provides.<br/>
The system provides:<br/>
* Match score with a breakdown of matched skills and relevant experience
* Missing score highlighting skill gaps, missing keywords, and unmet requirements
* Improvement suggestions, with a strong focus on strengthening and reframing projects to better align with the role
* Tailoring tips customized to the specific job, helping users adapt their resume for higher ATS compatibility and recruiter relevance.
## How we built it
The frontend was built using React with functional components and hooks for state management and conditional rendering. The UI focuses on clarity and readability, using cards and icons to present AI feedback in a structured way.<br/>
The backend was developed using Python and FastAPI, which handles resume uploads, extracts text from PDFs, and sends structured prompts to the AI model. The AI responses are returned in strict JSON format and rendered dynamically on the frontend.<br/>
## Challenges we ran into
One of the biggest challenges was crafting effective AI prompts to ensure accurate, structured, and consistent responses. Another challenge was managing JSON responses between the backend and frontend, especially during deployment.<br/>
Deploying the backend and connecting it to the frontend hosted on Netlify was also challenging, as it required careful handling of CORS, API endpoints, and async state updates.<br/>
## Accomplishments that we're proud of
* Successfully integrating the Gemini API into a real-world application
* Using Python for the backend for the first time
* Implementing PDF text extraction from resumes
* Deploying a live backend service
* Building and deploying a complete AI-powered web application end-to-end
## What we learned
* Design effective AI prompts for structured output
* Build and deploy full-stack AI applications
* Handle PDF processing and text extraction
* Connect frontend and backend deployments reliably
* Design user-friendly interfaces for AI-generated insights
## What's next for ResumeFit Ai
* Resume rewriting and export functionality
* Resume version comparison for different job roles
* ATS score visualization and analytics
* User accounts and resume history
* Support for additional resume formats
