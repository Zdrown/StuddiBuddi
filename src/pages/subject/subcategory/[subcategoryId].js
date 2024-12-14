import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSubjects } from "../../../app/localStorageHelpers";
import NotesList from "../../../app/components/NotesList";
import axios from "axios";
import styled from "styled-components";

// Styled Components
const ReviewSection = styled.div`
  margin-top: 20px;
`;

const NoteWrapper = styled.div`
  margin-bottom: 15px;

`;
const ReviewButton = styled.button`
  display: block;
  width: 20%; /* Correctly added semicolon */
  margin: 20px auto 0;
  background-color: #0070f3;
  color: #fff;
  font-size: 16px;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #005bbd;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 112, 243, 0.3);
  }
`;
const StyledTextarea = styled.textarea`
  width: 100%;
  height: 150px; // Adjust height
  font-size: 16px; // Adjust font size
  padding: 10px; // Add padding
  border: 1px solid #ccc; // Optional: border styling
  border-radius: 5px; // Optional: rounded corners
  box-sizing: border-box; // Ensures padding doesn't affect overall size
  resize: vertical; // Allow vertical resizing by the user if needed
`;


const ResultBox = styled.div`
  background-color: #f0f8ff;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  border: 1px solid #007bff;
`;

const ErrorBox = styled.div`
  background-color: #ffe6e6;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  border: 1px solid #ff0000;
`;

export default function SubcategoryPage() {
  const router = useRouter();
  const { subcategoryId } = router.query; // Extract subcategoryId from the URL
  const [subcategory, setSubcategory] = useState(null); // State for the current subcategory
  const [loading, setLoading] = useState(true); // Loading state
  const [questions, setQuestions] = useState([]); // Store questions for review
  const [answers, setAnswers] = useState({}); // Store answers from user
  const [reviewResults, setReviewResults] = useState({}); // Store API results per note
  const [reviewLoading, setReviewLoading] = useState({}); // Manage loading state for each note
  const [errorMessages, setErrorMessages] = useState({}); // Store errors for each note
  const [isReviewing, setIsReviewing] = useState(false); // Review mode state

  // Fetch subcategory details from localStorage
  useEffect(() => {
    if (!subcategoryId) return;

    const subjects = getSubjects();
    const subcategory = subjects
      .flatMap((subject) => subject.subcategories)
      .find((sc) => sc.id === subcategoryId);

    setSubcategory(subcategory || { notes: [] });
    setLoading(false);
  }, [subcategoryId]);

  // Handler for notes update
  const handleNotesChange = (updatedNotes) => {
    setSubcategory((prev) => (prev ? { ...prev, notes: updatedNotes } : null));
  };

  // Handle answer change for each note
  const handleAnswerChange = (noteId, text) => {
    setAnswers((prev) => ({
      ...prev,
      [noteId]: text,
    }));
  };

  // Start review mode
  const startReview = () => {
    setIsReviewing(true);

    const generatedQuestions = subcategory.notes.map((note) => ({
      id: note.id,
      question: `What is important about: ${note.text}?`,
    }));

    setQuestions(generatedQuestions);
  };

  // Submit individual note review
  const handleReviewSubmit = async (note) => {
    setReviewLoading((prev) => ({ ...prev, [note.id]: true }));
    setErrorMessages((prev) => ({ ...prev, [note.id]: "" }));

    try {
      const response = await axios.post("/api/review", {
        questionAnswerPairs: [
          {
            id: note.id,
            question: `What is important about: ${note.text}`,
            answer: answers[note.id] || "",
          },
        ],
      });

      const result = response.data.results[0]?.result || "No response received.";

      setReviewResults((prev) => ({
        ...prev,
        [note.id]: result,
      }));
    } catch (error) {
      console.error(`Error processing note ID ${note.id}:`, error);
      setErrorMessages((prev) => ({
        ...prev,
        [note.id]: "Error processing this note.",
      }));
    } finally {
      setReviewLoading((prev) => ({ ...prev, [note.id]: false }));
    }
  };

  if (loading) return <p>Loading subcategory...</p>;
  if (!subcategory) return <p>Subcategory not found.</p>;

  return (
    <div>
      <h1>{subcategory.title || "Subcategory"}</h1>
      <h2>Review Notes</h2>
      <ReviewSection>
        {subcategory.notes.map((note) => (
          <NoteWrapper key={note.id}>
            <p>{note.text}</p>
            <StyledTextarea
  placeholder="Write your answer here..."
  onChange={(e) => handleAnswerChange(note.id, e.target.value)}
/>
            <ReviewButton 
              type="button"
              onClick={() => handleReviewSubmit(note)}
              disabled={reviewLoading[note.id]}
            >
              {reviewLoading[note.id] ? "Submitting..." : "Submit Review"}
            </ReviewButton >
            {reviewResults[note.id] && (
              <ResultBox>
                <strong>Result:</strong> {reviewResults[note.id]}
              </ResultBox>
            )}
            {errorMessages[note.id] && (
              <ErrorBox>{errorMessages[note.id]}</ErrorBox>
            )}
          </NoteWrapper>
        ))}
      </ReviewSection>
      <NotesList
        subcategoryId={subcategoryId}
        notes={subcategory.notes}
        onNotesChange={handleNotesChange}
      />
    </div>
  );
}
