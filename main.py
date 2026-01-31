from fastapi import FastAPI, UploadFile, File, Form
from pypdf import PdfReader
from google import genai
import os
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # frontend URL later if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
print("API KEY FOUND:", bool(os.getenv("GOOGLE_API_KEY")))
def extract_text_from_pdf(file):
    reader = PdfReader(file)
    text = ""
    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text
    return text

def get_ai_response(prompt):
  
    response = client.models.generate_content(
        model="gemini-3-pro-preview",
        contents=prompt,
    )
    
    return response.text
@app.get("/")
def root():
    return {"status": "Backend running"}
@app.post("/submitForm")
def submit_form(
    resumeFile: UploadFile = File(...),
    jobTitle: str = Form(...),
    job_description: str = Form(...)
):
    resume_text = extract_text_from_pdf(resumeFile.file)

    prompt = f"""
You are an expert ATS resume evaluator and career coach.

Resume:
{resume_text}

Job Title:
{jobTitle}

Job Description:
{job_description}

TASKS:
1. Evaluate how well the resume matches the job description from an ATS perspective.
2. Identify strengths already aligned with the role.
3. Identify missing or weak areas compared to the job description.
4. Suggest PROFILE-BUILDING improvements through:
   - practical project ideas
   - hands-on experience suggestions
   - portfolio or GitHub improvements
   (NOT resume wording fixes)
5. Provide GENERAL resume tailoring advice that applies broadly across roles.
   - Do NOT include technical skills
   - Do NOT summarize the resume
   - Focus on structure, clarity, and alignment strategy

STRICT OUTPUT RULES:
- Return ONLY valid JSON.
- No markdown, no backticks, no explanations.
- Each field must be an array of short strings.
- Each string must be under 20 words.
- Be specific, actionable, and ATS-focused.
- Do NOT invent experience or skills.

JSON format (keys must match exactly):
{
  "matched_score": 0,
  "matched_details": [],
  "missing_score": 0,
  "missing_details": [],
  "improvement_suggestions": [],
  "tailoring_tips": []
}

FIELD-SPECIFIC RULES:
- matched_details: existing skills or experiences that match the job description
- missing_details: important requirements not clearly shown in the resume
- improvement_suggestions: project ideas, learning paths, or experience-building actions to strengthen the profile
- tailoring_tips: general resume optimization advice (format, emphasis, clarity, ATS strategy only)
"""

    ai_response = get_ai_response(prompt)

    return {
        "analysis": ai_response,
        "file_name": resumeFile.filename,
        "jobTitle": jobTitle,
      
    }
# RESUME CHECKER BACKEND
import json

@app.post("/resume-checker")
def resume_checker(resumeFile: UploadFile = File(...)):
    resume_text = extract_text_from_pdf(resumeFile.file)

    prompt = f"""
You are a professional resume editor and ATS optimization expert.

Return ONLY valid JSON. No markdown. No explanations.

JSON format:
{{
  "errors": [
    {{
      "original": "text",
      "corrected": "text",
      "reason": "text"
    }}
  ],
  
}}

Resume text:
\"\"\"
{resume_text}
\"\"\"
"""

    ai_response = get_ai_response(prompt)

    # 🔥 CRITICAL FIX: parse JSON HERE, not frontend
    try:
        parsed_json = json.loads(ai_response)
    except json.JSONDecodeError:
        return {"error": "Invalid AI JSON"}

    return parsed_json

@app.post("/cv-generator")
def cv_generator(
    resumeFile: UploadFile = File(...),
    companyName: str = Form(None),
    jobDescription: str = Form(...),
    additionalInfo: str = Form(None)
):
    resume_text = extract_text_from_pdf(resumeFile.file)

    prompt = f"""
You are an expert CV generator and career coach.
given the resume and job description, generate a tailored CV.
Resume:
{resume_text}   
Company Name: {companyName}
Job Description: 
{jobDescription}
"""
    ai_response = get_ai_response(prompt)
    print("AI Response:", ai_response)
    return {
        "generated_cv": ai_response,
       
    }
