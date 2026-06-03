export type InterviewRole =
  | "SDE Intern"
  | "Frontend Developer"
  | "Python Developer"
  | "Data Analyst"
  | "ML Engineer";

export type InterviewStatus =
  | "setup"
  | "starting"
  | "speaking"
  | "listening"
  | "processing"
  | "complete";

export interface QAPair {
  question: string;
  answer: string;
  evaluation?: AnswerEvaluation;
}

export interface AnswerEvaluation {
  technicalScore: number;
  communicationScore: number;
  confidenceScore: number;
  keyPoints: string[];
  missing: string[];
  internalNote: string;
}

export interface InterviewReport {
  overallScore: number;
  technicalScore: number;
  communicationScore: number;
  confidenceScore: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  topicScores: Record<string, number>;
  roadmap: RoadmapItem[];
  resumeTips: string[];
  verdict: "Strong Hire" | "Hire" | "Maybe" | "No Hire";
}

export interface RoadmapItem {
  topic: string;
  priority: "high" | "medium" | "low";
  reason: string;
  resources: string[];
}

export interface InterviewSession {
  id: string;
  userId: string;
  role: InterviewRole;
  status: "completed";
  qaHistory: QAPair[];
  report: InterviewReport;
  createdAt: Date;
  duration: number;
}