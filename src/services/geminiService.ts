import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface SalesStrategy {
  analysis: {
    painPoints: string[];
    opportunities: string[];
  };
  pitch: {
    hook: string;
  };
  proposal: {
    subject: string;
    body: string;
  };
  objections: {
    objection: string;
    rebuttal: string;
  }[];
}

export async function generateSalesStrategy(businessInfo: string): Promise<SalesStrategy> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `You are an expert B2B Sales Consultant and Agency Growth Hacker. 
    Analyze the following business lead and provide a high-conversion sales strategy.
    
    Business Info: ${businessInfo}
    
    Provide the response in JSON format with the following structure:
    {
      "analysis": {
        "painPoints": ["string"],
        "opportunities": ["string"]
      },
      "pitch": {
        "hook": "3-sentence cold call hook focusing on VALUE"
      },
      "proposal": {
        "subject": "Email subject line",
        "body": "Professional email template mentioning specific features like Firebase or AI chatbots"
      },
      "objections": [
        {
          "objection": "Common 'No' response",
          "rebuttal": "Persuasive rebuttal"
        }
      ]
    }`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          analysis: {
            type: Type.OBJECT,
            properties: {
              painPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
              opportunities: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["painPoints", "opportunities"],
          },
          pitch: {
            type: Type.OBJECT,
            properties: {
              hook: { type: Type.STRING },
            },
            required: ["hook"],
          },
          proposal: {
            type: Type.OBJECT,
            properties: {
              subject: { type: Type.STRING },
              body: { type: Type.STRING },
            },
            required: ["subject", "body"],
          },
          objections: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                objection: { type: Type.STRING },
                rebuttal: { type: Type.STRING },
              },
              required: ["objection", "rebuttal"],
            },
          },
        },
        required: ["analysis", "pitch", "proposal", "objections"],
      },
    },
  });

  return JSON.parse(response.text || "{}");
}
