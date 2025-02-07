import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import User from "@/model/user.model";
import { GoogleGenerativeAI, GenerationConfig } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("❌ Missing GEMINI_API_KEY in environment variables!");
}

const genAI = new GoogleGenerativeAI(apiKey!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mood, relationship, partner, language } = body;

    if (!mood || !relationship || !partner || !language) {
      return NextResponse.json(
        { error: "All fields are required!" },
        { status: 400 }
      );
    }

    const generationConfig: GenerationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 100,
    };

    const prompt = `Generate a lovely proposal for my partner. The relationship between me and my partner is ${relationship} and my partner is ${partner}. The proposal should be in ${language}. The proposal should include my partner's name. The mood of the proposal should be ${mood}.`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });

    const proposal =
      result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "No proposal generated.";

      await dbConnect();
      await User.create({ relationship, partner, mood, language, proposal });

    return NextResponse.json(
      { proposal },
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate proposal due to API error" },
      { status: 500 }
    );
  }
}
