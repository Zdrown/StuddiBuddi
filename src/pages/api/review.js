import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY; // Use environment variables for security
const genAI = new GoogleGenerativeAI(apiKey); // Initialize the GoogleGenerativeAI client
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Set the Gemini model
 

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { questionAnswerPairs } = req.body;

      // Modify the prompt to instruct the model to limit responses to 4 sentences
      const contents = questionAnswerPairs.map((qa) => ({
        parts: [
          {
            text: `Please provide a concise explanation to the following question and answer pair in no more than 4 sentences:\n\n${qa.question}\nAnswer: ${qa.answer}`,
          },
        ],
      }));

      console.log("Sending request to Gemini API with contents:", contents);

      const response = await model.generateContent({ contents });

      console.log("Full response from Gemini API:", JSON.stringify(response, null, 2));

      const resultText =
        response.response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from model";

      res.status(200).json({ result: resultText });
    } catch (error) {
      console.error("Error processing review with Gemini:", error);
      res.status(500).json({ error: "Error processing the review." });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
