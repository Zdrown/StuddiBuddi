import { useState, useEffect } from "react";
import axios from "axios"; // Axios for backend API calls

export default function ReviewNotes({ subcategoryId, notes }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState("");
  const [isReviewing, setIsReviewing] = useState(false);

  // Generate questions from notes when review starts
  useEffect(() => {
    if (isReviewing) {
      const generatedQuestions = notes.map((note) => ({
        id: note.id,
        question: `What is important about: ${note.text}`,
      }));
      setQuestions(generatedQuestions);
    }
  }, [isReviewing, notes]);

  // Handle answer changes
  const handleAnswerChange = (noteId, text) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [noteId]: text,
    }));
  };

  // Submit review to the backend API
  const handleReviewSubmit = async () => {
    const questionAnswerPairs = questions.map((q) => ({
      question: q.question,
      answer: answers[q.id] || "", // Default to empty string if no answer
    }));

    try {
      const response = await axios.post("/api/review", {
        questionAnswerPairs,
      });

      setResult(response.data.result); // Display the response from the backend
    } catch (error) {
      console.error("Error submitting review:", error);
      setResult("Error submitting review. Check the console for details.");
    }
  };

  return (
    <div>
      <button type="button" onClick={() => setIsReviewing(!isReviewing)}>
        {isReviewing ? "Stop Review" : "Start Review"}
      </button>

      {isReviewing && (
        <div>
          <h2>Answer the Questions</h2>
          {questions.map((q) => (
            <div key={q.id}>
              <p>{q.question}</p>
              <textarea
                value={answers[q.id] || ""}
                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                placeholder="Your answer"
              />
            </div>
          ))}
          <button type="button" onClick={handleReviewSubmit}>
            Submit
          </button>
        </div>
      )}

      {result && (
        <div>
          <h2>LLM Response</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
