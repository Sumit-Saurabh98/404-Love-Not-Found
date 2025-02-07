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
    const { mood, user, partner, language } = body;

    if (!mood || !user || !partner || !language) {
      return NextResponse.json(
        { error: "All fields are required!" },
        { status: 400 }
      );
    }

    const generationConfig: GenerationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 200,
    };

    const prompt = `Write a short poem about ${partner} in ${language}, who is the partner of ${user}. The poem should include both their names. The mood of the poem should be ${mood}.`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });

    const poem =
      result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "No poem generated.";

      await dbConnect();
      await User.create({ user, partner, mood, language, poem });

    return NextResponse.json(
      { poem },
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate poem due to API error" },
      { status: 500 }
    );
  }
}
