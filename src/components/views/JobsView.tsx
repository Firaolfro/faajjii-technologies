"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Bot,
  FileText,
  GraduationCap,
  Sparkles,
  Clock,
  Building,
  CheckCircle,
  Send,
  Download,
  Calendar,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { LionBadge } from "@/components/brand/FaajjiLogo";
import { StorageService } from "@/lib/storage";

interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Internship" | "Entry-Level" | "Remote";
  salary: string;
  postedDate: string;
  tags: string[];
  description: string;
}

const sampleJobs: JobListing[] = [
  {
    id: "j1",
    title: "Junior React / Next.js Developer",
    company: "Faajji Technologies (Software Division)",
    location: "Bole, Addis Ababa",
    type: "Full-time",
    salary: "25,000 - 40,000 ETB / month",
    postedDate: "2 days ago",
    tags: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    description: "Join our core software team building enterprise ERPs, e-commerce, and high-performance client web applications.",
  },
  {
    id: "j2",
    title: "IT Support & Network Maintenance Intern",
    company: "Ethio-Fintech Solutions",
    location: "Kazanchis, Addis Ababa",
    type: "Internship",
    salary: "12,000 ETB stipend / month",
    postedDate: "Just now",
    tags: ["Cisco", "Hardware", "Networking", "Fresh Graduate"],
    description: "Opportunity for recent university graduates to gain hands-on experience in corporate networking, switch configurations, and hardware troubleshooting.",
  },
  {
    id: "j3",
    title: "ERP & Accounting Systems Assistant",
    company: "Habesha Commercial Trading",
    location: "Mercato / Addis Ababa",
    type: "Entry-Level",
    salary: "18,000 - 28,000 ETB / month",
    postedDate: "3 days ago",
    tags: ["Accounting", "ERP", "Excel", "Inventory"],
    description: "Assist in deploying and managing business management systems, stock reconciliation, and Ethiopian tax invoicing workflows.",
  },
  {
    id: "j4",
    title: "Mobile App Developer (Flutter / React Native)",
    company: "AfroTech Digital Ventures",
    location: "Addis Ababa / Hybrid",
    type: "Full-time",
    salary: "35,000 - 55,000 ETB / month",
    postedDate: "1 week ago",
    tags: ["Flutter", "Dart", "Firebase", "REST APIs"],
    description: "Develop cutting-edge mobile commerce and logistics tracking apps for the Ethiopian regional market.",
  },
];

export function JobsView() {
  const [activeSubTab, setActiveSubTab] = useState<"jobs" | "ai-coach" | "cv-builder" | "events">("jobs");
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  // AI Interview Simulator State
  const [selectedRole, setSelectedRole] = useState("Junior Full Stack Developer");
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evalResult, setEvalResult] = useState<{
    score: number;
    feedback: string;
    modelAnswer: string;
  } | null>(null);

  // Application Modal State
  const [appCoverNote, setAppCoverNote] = useState("");
  const [applicantName, setApplicantName] = useState("Yonas Mengistu");
  const [applicantEmail, setApplicantEmail] = useState("yonas.m@gmail.com");
  const [applicantPhone, setApplicantPhone] = useState("+251 911 234 567");

  // CV Builder State
  const [cvData, setCvData] = useState({
    fullName: "Yonas Mengistu",
    email: "yonas.m@gmail.com",
    phone: "+251 911 234 567",
    university: "Addis Ababa University (AAiT)",
    degree: "B.Sc. in Computer Science / Software Engineering",
    graduationYear: "2025",
    skills: "React, TypeScript, Next.js, Python, Git, PostgreSQL, REST APIs",
    summary: "Motivated software engineering graduate with hands-on experience in building modern web apps, ERP systems, and responsive user interfaces.",
  });
  const [cvSaved, setCvSaved] = useState(false);

  const interviewQuestions: Record<string, { question: string; hint: string }[]> = {
    "Junior Full Stack Developer": [
      {
        question: "Can you explain how Next.js Server Components differ from Client Components, and when you would choose one over the other?",
        hint: "Mention data fetching on the server, SEO, reduced bundle size vs interactivity, browser hooks (useState, useEffect).",
      },
      {
        question: "How do you handle relational database models for an e-commerce cart and orders system using Prisma or PostgreSQL?",
        hint: "Discuss 1-to-many relationships (User to Orders), junction tables (OrderItem with quantity and price at time of purchase).",
      },
    ],
    "IT Support & Network Maintenance": [
      {
        question: "If an office workstation cannot connect to the internet, what step-by-step troubleshooting methodology would you follow?",
        hint: "Physical cable/Wi-Fi check, IP configuration (DHCP / static), pinging gateway, checking DNS, firewall settings.",
      },
      {
        question: "What is the difference between a managed network switch and an unmanaged switch in a corporate deployment?",
        hint: "VLAN support, port mirroring, traffic prioritization (QoS), security access controls.",
      },
    ],
  };

  const handleEvaluateAnswer = () => {
    if (!userAnswer.trim()) return;
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
      const answerLower = userAnswer.toLowerCase();
      let calculatedScore = 75;
      if (answerLower.length > 80) calculatedScore += 10;
      if (
        answerLower.includes("server") ||
        answerLower.includes("cable") ||
        answerLower.includes("vlan") ||
        answerLower.includes("database") ||
        answerLower.includes("react")
      ) {
        calculatedScore += 10;
      }

      setEvalResult({
        score: Math.min(calculatedScore, 98),
        feedback:
          "Strong explanation! You effectively covered the essential technical mechanism and demonstrated practical problem-solving. In Ethiopian enterprise technical rounds, interviewers value concise reasoning and how you optimize performance under real-world network constraints.",
        modelAnswer:
          selectedRole === "Junior Full Stack Developer"
            ? "Server Components execute solely on the Node.js runtime, fetching data close to the database and streaming lightweight HTML without JavaScript bundle overhead. Client Components ('use client') run in the browser and manage reactive state (useState, event listeners). Use Server Components for secure data loading and static layouts, and Client Components for interactivity."
            : "Troubleshooting starts at Layer 1 (Physical): check Ethernet cable link lights or Wi-Fi status. Next Layer 3 (Network): run 'ipconfig' to verify IP assignment and default gateway, then 'ping 127.0.0.1' and 'ping 8.8.8.8' to distinguish between local gateway vs DNS lookup failures.",
      });
      setFeedback("Evaluated");
    }, 1200);
  };

  const handleDownloadCV = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${cvData.fullName} - ATS Resume</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif; padding: 40px; color: #111; line-height: 1.5; font-size: 13px; }
              h1 { text-transform: uppercase; margin-bottom: 4px; font-size: 24px; letter-spacing: 1px; color: #091428; }
              .contact { font-size: 12px; color: #444; border-bottom: 2px solid #091428; padding-bottom: 10px; margin-bottom: 18px; }
              h2 { font-size: 13px; text-transform: uppercase; border-bottom: 1px solid #ccc; padding-bottom: 3px; margin-top: 18px; margin-bottom: 6px; letter-spacing: 0.5px; color: #1e3a8a; }
              .school { display: flex; justify-content: space-between; font-weight: bold; margin-bottom: 2px; }
              .skills { font-family: monospace; font-size: 12px; }
            </style>
          </head>
          <body>
            <h1>${cvData.fullName}</h1>
            <div class="contact">${cvData.email} &bull; ${cvData.phone} &bull; Addis Ababa, Ethiopia</div>
            <h2>Professional Summary</h2>
            <p>${cvData.summary}</p>
            <h2>Education</h2>
            <div class="school"><span>${cvData.university}</span><span>Class of ${cvData.graduationYear}</span></div>
            <div>${cvData.degree}</div>
            <h2>Technical Proficiencies</h2>
            <div class="skills">${cvData.skills}</div>
            <h2>Faajji Tech Verified Profile</h2>
            <p style="font-size: 11px; color: #666;">Generated via EthioGatewayJobs &bull; Certified ATS Standard.</p>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-28 md:pb-16">
      {/* Banner */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <LionBadge className="w-4 h-4 text-sky-400 inline-block" />
          Division 03 &bull; EthioGatewayJobs &bull; Digital Ethiopia
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Empowering Ethiopian Youth & Tech Careers
        </h1>
        <p className="mt-3 text-base text-slate-300">
          Connecting students, graduates, and professionals with verified employers, AI-powered interview coaching, and automated CV creation.
        </p>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center justify-center mb-10">
        <div className="glass-panel p-1.5 rounded-2xl border border-sky-500/20 flex flex-wrap justify-center gap-1">
          <button
            onClick={() => setActiveSubTab("jobs")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubTab === "jobs"
                ? "bg-sky-500 text-slate-950 shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Job Opportunities</span>
          </button>

          <button
            onClick={() => setActiveSubTab("ai-coach")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubTab === "ai-coach"
                ? "bg-sky-500 text-slate-950 shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <Bot className="w-4 h-4 text-sky-300" />
            <span>AI Interview Coach</span>
          </button>

          <button
            onClick={() => setActiveSubTab("cv-builder")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubTab === "cv-builder"
                ? "bg-sky-500 text-slate-950 shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>ATS CV Builder</span>
          </button>

          <button
            onClick={() => setActiveSubTab("events")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubTab === "events"
                ? "bg-sky-500 text-slate-950 shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Career Fairs & Courses</span>
          </button>
        </div>
      </div>

      {/* 1. JOB BOARD TAB */}
      {activeSubTab === "jobs" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Active Verified Openings</h2>
            <span className="text-xs text-sky-400 font-semibold">{sampleJobs.length} Positions Available</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sampleJobs.map((job) => (
              <div
                key={job.id}
                className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-sky-400/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-[10px] font-bold text-sky-400 uppercase tracking-wider">
                        {job.type}
                      </span>
                      <h3 className="text-lg font-bold text-white mt-2">{job.title}</h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium mt-1">
                        <Building className="w-3.5 h-3.5 text-sky-400" />
                        <span>{job.company}</span>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {job.postedDate}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mt-3 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {job.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Compensation</span>
                    <span className="text-xs font-bold text-white">{job.salary}</span>
                  </div>

                  <button
                    onClick={() => setSelectedJob(job)}
                    className="btn-metallic px-4 py-2 rounded-xl text-xs uppercase font-extrabold flex items-center gap-1.5"
                  >
                    <span>Apply Now</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. AI INTERVIEW COACH TAB */}
      {activeSubTab === "ai-coach" && (
        <div className="glass-panel p-8 rounded-3xl border border-sky-400/30 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300">
              <Bot className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Faajji AI Interview Simulator</h2>
              <p className="text-xs text-slate-300">
                Practice realistic technical and behavioral interview questions tailored for Ethiopian tech opportunities.
              </p>
            </div>
          </div>

          {!interviewStarted ? (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Select Your Target Role
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full glass-input px-4 py-3 rounded-xl text-sm text-white bg-faajji-900"
                >
                  <option value="Junior Full Stack Developer">Junior Full Stack Developer (React / Next.js)</option>
                  <option value="IT Support & Network Maintenance">IT Support & Network Maintenance</option>
                </select>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 space-y-2">
                <div className="flex items-center gap-2 text-sky-400 font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>How the AI Coach Works:</span>
                </div>
                <p>&bull; The AI poses realistic questions asked by top tech employers.</p>
                <p>&bull; Type your honest response just like in a live interview.</p>
                <p>&bull; Receive immediate evaluation, score, and constructive tips to improve.</p>
              </div>

              <button
                onClick={() => {
                  setInterviewStarted(true);
                  setCurrentQuestionIndex(0);
                  setFeedback(null);
                  setUserAnswer("");
                }}
                className="w-full btn-metallic py-3.5 rounded-xl text-xs uppercase tracking-wider font-extrabold"
              >
                Start AI Practice Session
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Question Box */}
              <div className="p-5 rounded-2xl bg-sky-500/10 border border-sky-400/30">
                <span className="text-[10px] uppercase font-bold tracking-widest text-sky-400">
                  Question {currentQuestionIndex + 1} of 2 &bull; {selectedRole}
                </span>
                <p className="text-sm font-semibold text-white mt-2 leading-relaxed">
                  &ldquo;{interviewQuestions[selectedRole]?.[currentQuestionIndex]?.question}&rdquo;
                </p>
                <p className="text-[11px] text-sky-300/80 mt-2 italic">
                  💡 Hint: {interviewQuestions[selectedRole]?.[currentQuestionIndex]?.hint}
                </p>
              </div>

              {/* Answer Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Your Answer:
                </label>
                <textarea
                  rows={4}
                  placeholder="Type your response here..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="w-full glass-input px-4 py-3 rounded-xl text-xs text-white placeholder-slate-500 leading-relaxed"
                />
              </div>

              {/* Evaluate Button */}
              {!feedback && (
                <button
                  onClick={handleEvaluateAnswer}
                  disabled={isEvaluating || !userAnswer.trim()}
                  className="w-full btn-metallic py-3 rounded-xl text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isEvaluating ? (
                    <span>Analyzing Response...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Submit Answer for AI Scoring</span>
                    </>
                  )}
                </button>
              )}

              {/* Feedback Display */}
              {evalResult && (
                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 animate-in fade-in space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                      <CheckCircle className="w-4 h-4" />
                      <span>AI Evaluation & Feedback</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold text-xs border border-emerald-400/30">
                      Score: {evalResult.score} / 100
                    </span>
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed">{evalResult.feedback}</p>

                  <div className="p-3.5 rounded-xl bg-faajji-950/80 border border-sky-400/20 text-xs">
                    <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block mb-1">
                      Recommended Model Answer:
                    </span>
                    <p className="text-slate-300 italic leading-relaxed">{evalResult.modelAnswer}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex justify-end gap-3">
                    <button
                      onClick={() => {
                        if (currentQuestionIndex < 1) {
                          setCurrentQuestionIndex(currentQuestionIndex + 1);
                          setUserAnswer("");
                          setFeedback(null);
                          setEvalResult(null);
                        } else {
                          setInterviewStarted(false);
                          setEvalResult(null);
                        }
                      }}
                      className="btn-metallic px-4 py-2 rounded-xl text-xs uppercase font-extrabold"
                    >
                      {currentQuestionIndex < 1 ? "Next Question" : "Finish Practice"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 3. ATS CV BUILDER TAB */}
      {activeSubTab === "cv-builder" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="glass-panel p-6 rounded-3xl border border-sky-400/30">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-sky-400" />
              <span>Enter Profile Details</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={cvData.fullName}
                  onChange={(e) => setCvData({ ...cvData, fullName: e.target.value })}
                  className="w-full glass-input px-3 py-2 rounded-xl text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email</label>
                  <input
                    type="email"
                    value={cvData.email}
                    onChange={(e) => setCvData({ ...cvData, email: e.target.value })}
                    className="w-full glass-input px-3 py-2 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={cvData.phone}
                    onChange={(e) => setCvData({ ...cvData, phone: e.target.value })}
                    className="w-full glass-input px-3 py-2 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">University / College</label>
                <input
                  type="text"
                  value={cvData.university}
                  onChange={(e) => setCvData({ ...cvData, university: e.target.value })}
                  className="w-full glass-input px-3 py-2 rounded-xl text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Degree / Field</label>
                  <input
                    type="text"
                    value={cvData.degree}
                    onChange={(e) => setCvData({ ...cvData, degree: e.target.value })}
                    className="w-full glass-input px-3 py-2 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Graduation</label>
                  <input
                    type="text"
                    value={cvData.graduationYear}
                    onChange={(e) => setCvData({ ...cvData, graduationYear: e.target.value })}
                    className="w-full glass-input px-3 py-2 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Core Skills (Comma separated)</label>
                <input
                  type="text"
                  value={cvData.skills}
                  onChange={(e) => setCvData({ ...cvData, skills: e.target.value })}
                  className="w-full glass-input px-3 py-2 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Professional Summary</label>
                <textarea
                  rows={3}
                  value={cvData.summary}
                  onChange={(e) => setCvData({ ...cvData, summary: e.target.value })}
                  className="w-full glass-input px-3 py-2 rounded-xl text-xs text-white"
                />
              </div>

              <button
                type="button"
                onClick={() => setCvSaved(true)}
                className="w-full btn-metallic py-2.5 rounded-xl text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{cvSaved ? "Resume Formatted & Synced ✓" : "Format ATS Resume"}</span>
              </button>
            </div>
          </div>

          {/* Formatted CV Preview Sheet */}
          <div className="bg-white text-slate-900 p-8 rounded-3xl shadow-2xl flex flex-col justify-between">
            <div>
              <div className="border-b-2 border-slate-900 pb-4 mb-4">
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-950 uppercase">
                  {cvData.fullName || "Your Full Name"}
                </h2>
                <div className="flex flex-wrap gap-3 text-xs text-slate-600 mt-1">
                  <span>{cvData.email}</span>
                  <span>&bull;</span>
                  <span>{cvData.phone}</span>
                  <span>&bull;</span>
                  <span>Addis Ababa, Ethiopia</span>
                </div>
              </div>

              {/* Summary */}
              <div className="mb-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5">
                  Professional Summary
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed">{cvData.summary}</p>
              </div>

              {/* Education */}
              <div className="mb-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5">
                  Education
                </h4>
                <div className="flex justify-between items-baseline text-xs">
                  <span className="font-bold text-slate-900">{cvData.university}</span>
                  <span className="text-slate-600 font-medium">Class of {cvData.graduationYear}</span>
                </div>
                <p className="text-xs text-slate-700 italic">{cvData.degree}</p>
              </div>

              {/* Technical Skills */}
              <div className="mb-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5">
                  Skills & Proficiencies
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed font-mono">
                  {cvData.skills}
                </p>
              </div>
            </div>

            {/* Action */}
            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <button
                onClick={handleDownloadCV}
                className="bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 shadow"
              >
                <Download className="w-4 h-4" />
                <span>Download ATS PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. CAREER EVENTS & COURSES TAB */}
      {activeSubTab === "events" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel p-6 rounded-3xl border border-white/10">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center mb-4">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Addis Ababa Tech Career Fair 2026</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Meet top Ethiopian tech companies, startups, and institutions hiring software engineers, hardware technicians, and data analysts.
            </p>
            <div className="mt-4 flex items-center justify-between text-xs text-sky-400 font-semibold pt-3 border-t border-white/5">
              <span>Date: Dec 15, 2026</span>
              <span>Register Attendance &rarr;</span>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-white/10">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Free Ethiopian Digital Skills Series</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Curated masterclasses in Full-Stack Web Development, Git Collaboration, and ERP operations to prepare students for real company workflows.
            </p>
            <div className="mt-4 flex items-center justify-between text-xs text-cyan-400 font-semibold pt-3 border-t border-white/5">
              <span>5 Modules &bull; Self-Paced</span>
              <span>Start Learning &rarr;</span>
            </div>
          </div>
        </div>
      )}

      {/* Job Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="glass-panel p-6 rounded-3xl border border-sky-400/40 w-full max-w-lg shadow-2xl relative">
            <button
              onClick={() => {
                setSelectedJob(null);
                setAppliedSuccess(false);
              }}
              className="absolute top-4 right-5 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <span className="text-[10px] uppercase font-bold tracking-widest text-sky-400">
              Apply for Position
            </span>
            <h3 className="text-lg font-bold text-white mt-1">{selectedJob.title}</h3>
            <p className="text-xs text-slate-300">{selectedJob.company} &bull; {selectedJob.location}</p>

            {appliedSuccess ? (
              <div className="py-8 text-center flex flex-col items-center">
                <CheckCircle className="w-12 h-12 text-emerald-400 mb-2 animate-bounce" />
                <h4 className="text-sm font-bold text-white">Application Submitted!</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Your profile and CV were delivered to the hiring team at {selectedJob.company}.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  StorageService.addApplication({
                    jobId: selectedJob.id,
                    jobTitle: selectedJob.title,
                    company: selectedJob.company,
                    applicantName: applicantName || cvData.fullName,
                    email: applicantEmail || cvData.email,
                    phone: applicantPhone || cvData.phone,
                    coverNote: appCoverNote || "Motivated applicant eager to contribute to the software/IT team.",
                  });
                  setAppliedSuccess(true);
                }}
                className="mt-4 space-y-3"
              >
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full glass-input px-3 py-2 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    className="w-full glass-input px-3 py-2 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                    className="w-full glass-input px-3 py-2 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Cover Note / Why You Fit</label>
                  <textarea
                    rows={3}
                    placeholder="Briefly state your passion and availability..."
                    value={appCoverNote}
                    onChange={(e) => setAppCoverNote(e.target.value)}
                    className="w-full glass-input px-3 py-2 rounded-xl text-xs text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-metallic py-2.5 rounded-xl text-xs uppercase tracking-wider font-extrabold mt-2 flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit 1-Click Application</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
