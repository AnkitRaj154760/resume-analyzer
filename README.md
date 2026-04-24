# Resume Check Karo 🚀

 live demo -> https://resume-analyzer-gray-nine.vercel.app/
**Resume Check Karo** is an AI-powered resume analyzer and ATS (Applicant Tracking System) checker. It helps job seekers optimize their resumes for specific job descriptions by providing instant, actionable feedback on ATS compatibility, tone, structure, and skills.

## ✨ Features
- **AI Resume Analysis:** Uses Google's Gemini AI to scan your resume against a target job description.
- **ATS Scoring:** Get a concrete ATS compatibility score with detailed suggestions for improvement.
- **Category-based Feedback:** Insights broken down into ATS, Tone & Style, Content, Structure, and Skills.
- **Secure Authentication:** User login and management powered by Clerk.
- **Cloud Storage:** Fast and reliable resume file uploads handled by ImageKit.
- **Modern UI:** Built with Next.js 15, Tailwind CSS, and Framer Motion for a smooth, responsive experience.

## 🛠️ Tech Stack
- **Frontend Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **Authentication:** Clerk
- **Database:** PostgreSQL (Supabase)
- **ORM:** Prisma
- **AI Integration:** Google GenAI SDK (`gemini-2.5-flash`)
- **File Uploads:** ImageKit

## 🚀 Getting Started Locally

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AnkitRaj154760/resume-analyzer.git
   cd resume-analyzer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root of your project and configure your keys for Supabase, Clerk, Google AI, and ImageKit.

4. **Initialize Database:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.
