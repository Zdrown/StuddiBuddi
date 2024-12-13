import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { questionAnswerPairs } = req.body;

    if (!questionAnswerPairs || !Array.isArray(questionAnswerPairs)) {
      return res.status(400).json({ error: "Invalid request payload." });
    }

    console.log("Received QA Pairs:", questionAnswerPairs);

    const responses = await Promise.allSettled(
      questionAnswerPairs.map(async (qa) => {
        const contents = [
          {
            parts: [
              {
                text: `Provide a concise explanation for the question-answer pair:\n\n${qa.question}\nAnswer: ${qa.answer}`,
              },
            ],
          },
        ];

        try {
          const response = await model.generateContent({ contents });
          const resultText =
            response.response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from model";

          return { id: qa.id, result: resultText };
        } catch (error) {
          console.error(`Error processing QA Pair ID ${qa.id}:`, error);
          return { id: qa.id, result: "Error processing this QA pair." };
        }
      })
    );

    const results = responses.map((r) =>
      r.status === "fulfilled" ? r.value : { id: null, result: "Error occurred." }
    );

    console.log("Final API Responses:", results);

    res.status(200).json({ results });
  } catch (error) {
    console.error("Unexpected server error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
