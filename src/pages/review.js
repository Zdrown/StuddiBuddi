/*import { useState } from "react";
import Layout from "../app/components/Layout";
import { getSubjects, saveData } from "../app/localStorageHelpers";

export default function ReviewPage() {
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [reviewNotes, setReviewNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const subjects = getSubjects();

  const toggleSubcategory = (subcategoryId) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategoryId)
        ? prev.filter((id) => id !== subcategoryId)
        : [...prev, subcategoryId]
    );
  };

  const startReview = async () => {
    const notesToReview = subjects
      .flatMap((subject) =>
        subject.subcategories.filter((sc) =>
          selectedSubcategories.includes(sc.id)
        )
      )
      .flatMap((subcategory) => subcategory.notes);

    setReviewNotes(notesToReview);

    setLoading(true);
    const updatedNotes = await Promise.all(
      notesToReview.map(async (note) => {
        if (!note.answer) {
          const response = await fetch("/api/generateQuestion", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ note: note.text }),
          });
          const data = await response.json();
          return { ...note, answer: data.result };
        }
        return note;
      })
    );

    const updatedSubjects = subjects.map((subject) => ({
      ...subject,
      subcategories: subject.subcategories.map((subcategory) => ({
        ...subcategory,
        notes: subcategory.notes.map((note) =>
          updatedNotes.find((n) => n.id === note.id) || note
        ),
      })),
    }));

    saveData(updatedSubjects);
    setLoading(false);
  };

  return (
    <Layout>
      <h1>Review</h1>

      <h2>Select Subcategories</h2>
      {subjects.flatMap((subject) => subject.subcategories).map((subcategory) => (
        <div key={subcategory.id}>
          <input
            type="checkbox"
            checked={selectedSubcategories.includes(subcategory.id)}
            onChange={() => toggleSubcategory(subcategory.id)}
          />
          {subcategory.title}
        </div>
      ))}

<button type="button" onClick={startReview} disabled={loading}>
  {loading ? "Generating Questions..." : "Start Review"}
</button>


      <h2>Review Notes</h2>
      <ul>
        {reviewNotes.map((note) => (
          <li key={note.id}>
            <p>Note: {note.text}</p>
            <p>Question/Answer: {note.answer || "Pending..."}</p>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
*/