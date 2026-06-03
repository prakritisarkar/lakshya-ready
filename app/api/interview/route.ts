import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, role, questionNumber, totalQuestions, previousQA, currentAnswer, allQA } = body;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // ── Action: Generate next question ──
    if (action === "generate_question") {
      const context = previousQA?.length
        ? `Previous questions and answers:\n${previousQA.map((qa: { question: string; answer: string }, i: number) => `Q${i + 1}: ${qa.question}\nA${i + 1}: ${qa.answer}`).join("\n\n")}\n\n`
        : "";

      const prompt = `You are a senior technical interviewer at a top tech company conducting a ${role} interview.

${context}This is question ${questionNumber} of ${totalQuestions}.

Generate ONE interview question appropriate for a ${role} position.

Rules:
- Question ${questionNumber <= 2 ? "should be introductory (background, motivation)" : questionNumber <= 5 ? "should be technical but moderate" : "should be challenging and technical"}
- Keep it concise — one clear question only
- Do NOT include numbering, preamble, or explanation
- Do NOT repeat topics from previous questions
- Return ONLY the question text, nothing else`;

      const result = await model.generateContent(prompt);
      const question = result.response.text().trim();

      return NextResponse.json({ question });
    }

    // ── Action: Evaluate single answer ──
    if (action === "evaluate_answer") {
      const prompt = `You are a senior technical interviewer evaluating a candidate's answer.

Role being interviewed for: ${role}
Question: ${previousQA[previousQA.length - 1]?.question || ""}
Candidate's answer: ${currentAnswer}

Evaluate this answer and return a JSON object with exactly this structure:
{
  "technicalScore": <number 0-100>,
  "communicationScore": <number 0-100>,
  "confidenceScore": <number 0-100>,
  "keyPoints": ["point1", "point2"],
  "missing": ["missing1", "missing2"],
  "internalNote": "brief internal note for final report"
}

Scoring guide:
- technicalScore: accuracy, depth, correctness of technical content
- communicationScore: clarity, structure, articulation
- confidenceScore: based on completeness and directness of answer (not actual voice)
- keyPoints: what the candidate got right (max 3)
- missing: important things they missed (max 3, empty array if nothing missed)

Return ONLY the JSON object, no markdown, no explanation.`;

      const result = await model.generateContent(prompt);
      const text = result.response.text().trim();
      const cleaned = text.replace(/```json|```/g, "").trim();
      const evaluation = JSON.parse(cleaned);

      return NextResponse.json({ evaluation });
    }

    // ── Action: Generate final report ──
    if (action === "final_report") {
      const qaText = allQA.map((qa: { question: string; answer: string }, i: number) =>
        `Q${i + 1}: ${qa.question}\nAnswer: ${qa.answer}`
      ).join("\n\n");

      const prompt = `You are a senior technical interviewer writing a detailed post-interview report.

Role interviewed for: ${role}
Total questions: ${allQA.length}

Full interview transcript:
${qaText}

Generate a comprehensive report as a JSON object with exactly this structure:
{
  "overallScore": <number 0-100>,
  "technicalScore": <number 0-100>,
  "communicationScore": <number 0-100>,
  "confidenceScore": <number 0-100>,
  "summary": "2-3 sentence overall assessment",
  "strengths": ["strength1", "strength2", "strength3"],
  "weaknesses": ["weakness1", "weakness2", "weakness3"],
  "topicScores": {
    "topic1": <score 0-100>,
    "topic2": <score 0-100>,
    "topic3": <score 0-100>
  },
  "roadmap": [
    { "topic": "topic name", "priority": "high|medium|low", "reason": "why", "resources": ["resource1"] }
  ],
  "resumeTips": ["tip1", "tip2"],
  "verdict": "Strong Hire|Hire|Maybe|No Hire"
}

Be honest and specific. Base scores on actual answer quality.
Return ONLY the JSON object, no markdown, no explanation.`;

      const result = await model.generateContent(prompt);
      const text = result.response.text().trim();
      const cleaned = text.replace(/```json|```/g, "").trim();
      const report = JSON.parse(cleaned);

      return NextResponse.json({ report });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });

  } catch (error) {
    console.error("Interview API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}