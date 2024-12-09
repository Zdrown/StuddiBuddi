import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSubjects } from "../../../app/localStorageHelpers";
import NotesList from "../../../app/components/NotesList";
import axios from "axios"; // Assuming you're using axios to make API calls

export default function SubcategoryPage() {
  const router = useRouter();
  const { subcategoryId } = router.query; // Extract subcategoryId from the URL
  const [subcategory, setSubcategory] = useState(null); // State for the current subcategory
  const [loading, setLoading] = useState(true); // Loading state
  const [isReviewing, setIsReviewing] = useState(false); // Review mode state
  const [questions, setQuestions] = useState([]); // Store questions for review
  const [answers, setAnswers] = useState({}); // Store answers from user
  const [result, setResult] = useState(""); // Store API result after submission

  // Fetch subcategory details from localStorage
  useEffect(() => {
    if (!subcategoryId) return; // Avoid running if subcategoryId is not yet available

    const subjects = getSubjects();
    let foundSubcategory = null;

    // Loop through subjects to find the matching subcategory
    for (const subject of subjects) {
      const subcategory = subject.subcategories.find(
        (sc) => sc.id === subcategoryId
      );
      if (subcategory) {
        foundSubcategory = subcategory;
        break;
      }
    }

    // Ensure `notes` exists and default to an empty array if not
    setSubcategory(foundSubcategory ? { ...foundSubcategory, notes: foundSubcategory.notes || [] } : null);
    setLoading(false); // Mark loading complete
  }, [subcategoryId]);

  // Handler for notes update
  const handleNotesChange = (updatedNotes) => {
    setSubcategory((prev) => (prev ? { ...prev, notes: updatedNotes } : null)); // Update notes in state
  };

  // Handle review mode
  const startReview = () => {
    setIsReviewing(true);

    // Create questions from notes
    const generatedQuestions = subcategory.notes.map((note) => ({
      id: note.id,
      question: `What is important about: ${note.text}?`,
    }));
    setQuestions(generatedQuestions);
  };

  // Handle answer change for each note
  const handleAnswerChange = (noteId, text) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [noteId]: text,
    }));
  };

  // Handle review submission
  const handleReviewSubmit = async () => {
    try {
      const questionAnswerPairs = questions.map((q) => ({
        question: q.question,
        answer: answers[q.id] || "",
      }));

      // Send questions and answers to the Gemini API (assuming you are using axios)
      const response = await axios.post("/api/review", {
        questionAnswerPairs,
      });

      setResult(response.data.result); // Display the response from the API
    } catch (error) {
      console.error("Error submitting review:", error);
      setResult("Error processing the review.");
    }
  };

  if (loading) {
    return <p>Loading subcategory...</p>;
  }

  if (!subcategory) {
    return <p>Subcategory not found. Please go back and select a valid subcategory.</p>;
  }

  return (
    <div>
      <h1>{subcategory.title || "Subcategory"}</h1>
      <h2>Notes</h2>

      {subcategory.notes.length > 0 ? (
        <ul>
          {subcategory.notes.map((note) => (
            <li key={note.id}>
              <span>{note.text}</span>
              {isReviewing && (
                <div>
                  <input
                    type="text"
                    placeholder="Your answer"
                    value={answers[note.id] || ""}
                    onChange={(e) => handleAnswerChange(note.id, e.target.value)}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No notes available for this subcategory.</p>
      )}

      <div>
        {!isReviewing ? (
          <button type="button" onClick={startReview}>Start Review</button>
        ) : (
          <>
            <button type="button" onClick={handleReviewSubmit}>Submit Review</button>
            {result && <p>{result}</p>} {/* Display the result from the LLM */}
          </>
        )}
      </div>

      {/* Add Note Button */}
      <NotesList
        subcategoryId={subcategoryId}
        notes={subcategory.notes} // Pass notes to the NotesList component
        onNotesChange={handleNotesChange} // Pass handler to update notes
      />
    </div>
  );
}
