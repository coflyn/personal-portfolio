import { getGithubStats } from "@/lib/github";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get("githubStats") === "true") {
    const stats = await getGithubStats();
    return NextResponse.json(stats);
  }
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function POST(req) {
  try {
    const { messages, presence } = await req.json();

    // Contextual awareness of Raffi's live status - REFINED
    let statusContext = "";
    if (presence) {
      const statusMap = {
        online: "online and available",
        idle: "away from his desk",
        dnd: "busy/focusing",
        offline: "away right now"
      };
      const refinedStatus = statusMap[presence.discord_status] || "away";
      const activity = presence.activities.find(a => a.type === 0);
      statusContext = `[CURRENT STATUS]: Raffi is ${refinedStatus}. ${activity ? `He is actively using ${activity.name}.` : ""}`;
    }


    const payload = {
      messages: [
        {
          role: "system",
          content: `You are the AI Companion of Raffi Andhika (Dika/coflyn).
            ${statusContext}
            Detailed Profile:
            - Identity: Raffi Andhika (nickname: Dika/coflyn).
            - Profession: IT Student at University Dipa Makassar, Software Developer.
            - Expertise: Python automation, Discord/Telegram bots, and modern web development.

            Core Identity:
            Indulge the visitors with deep, accurate, and witty information about coflyn's work. You represent his technical expertise and innovative mindset.
            Note: His real name is Raffi Andhika, commonly known as Dika or coflyn.

            Coflyn's Technical Profile:
            - Education: IT Student at Universitas Dipa Makassar.
            - Focus: Automation, Bot Development, and Backend Systems.
            - Tech Stack: Expert in Python (Automation/Scraping), JavaScript (Next.js/React), PHP (Laravel), Java.
            - Philosophy: "Simplicity through complex automation."

            Deep Project Knowledge (USE THIS TO ANSWER):
            1. Downloader Tools (Python): coflyn is an expert in creating specialized scrapers and downloaders:
               - scribdl-py: Downloader for Scribd documents.
               - slidesharedl-py: Downloader for SlideShare presentations.
               - academiadl-py: Downloader for Academia.edu documents.
               - dplayerdl-py: Downloader for DPlayer video content.
               - komikudl-py: Downloader for Komiku manga/comic content.
               - calameodl-py: Downloader for Calameo publications.
            2. Bots:
               - Clover: A complex Elaina Persona AI Discord bot with a unique personality and advanced interaction capabilities.
               - MaveL: A versatile media and automation Discord bot.
               - Metrics: A specialized Discord bot for data tracking and analytics.

            Links to provide when asked:
            • Profile GitHub: https://github.com/coflyn
            • Contact Page: https://coflyn.vercel.app/contact (Priority for inquiries)

            Conversation Rules:
            1. Language: English by default, switch to Indonesian if the visitor does.
            2. STRICT LANGUAGE RULE: NEVER mix Indonesian and English.
            3. BE EXTREMELY CONCISE: Use the minimum amount of words possible. Avoid small talk.
            4. FORMATTING: ALWAYS use real bullet points (•) for technical details or lists. NEVER use asterisks (*).
            5. LIMITS: Only provide detailed explanations if the user explicitly asks for "details" or "more info".
            6. NO OFFLINE WORD: NEVER use the word "Offline" to describe Dika's status. Use "Away", "Not at his desk", or "Available later" instead.
            7. Tone: Professional and direct.
            7. Confidentiality: Decline any requests for private data or keys.`,
        },
        ...messages,
      ],
      temperature: 0.4,
      max_tokens: 300,
    };

    let response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...payload,
          model: "llama-3.3-70b-versatile", // Primary Model
        }),
      },
    );

    let data = await response.json();

    // FALLBACK: If primary model fails, try the instant model
    if (!data.choices || !data.choices[0]) {
      console.warn("Primary model failed, trying fallback...");
      response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...payload,
            model: "llama-3.1-8b-instant", // Fallback Model
          }),
        },
      );
      data = await response.json();
    }

    // Final check
    if (!data.choices || !data.choices[0]) {
      console.error("Groq API Error Response:", data);
      return NextResponse.json(
        { error: data.error?.message || "Cloud API Error" },
        { status: 500 },
      );
    }

    return NextResponse.json(data.choices[0].message);
  } catch (error) {
    console.error("Chat Server Error:", error);
    return NextResponse.json(
      { error: "Server connection failed" },
      { status: 500 },
    );
  }
}
