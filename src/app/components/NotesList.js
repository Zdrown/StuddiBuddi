import { deleteNote, updateNote, addNote } from "../localStorageHelpers";

export default function NotesList({ subcategoryId, notes = [], onNotesChange }) {
  const handleAddNote = () => {
    const text = prompt("Enter the note:");
    if (text) {
      try {
        const updatedNotes = addNote(subcategoryId, text); // Returns updated notes
        onNotesChange(updatedNotes); // Pass the updated notes back to the parent
      } catch (error) {
        console.error("Error adding note:", error);
        alert("Failed to add the note. Please try again.");
      }
    }
  };

  const handleEditNote = (noteId) => {
    const updatedText = prompt("Edit your note:");
    if (updatedText) {
      try {
        const updatedNotes = updateNote(subcategoryId, noteId, updatedText);
        onNotesChange(updatedNotes);
      } catch (error) {
        console.error("Error updating note:", error);
        alert("Failed to update the note. Please try again.");
      }
    }
  };

  const handleDeleteNote = (noteId) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        const updatedNotes = deleteNote(subcategoryId, noteId);
        onNotesChange(updatedNotes);
      } catch (error) {
        console.error("Error deleting note:", error);
        alert("Failed to delete the note. Please try again.");
      }
    }
  };

  return (
    <div>
      <h2>Notes</h2>
      {notes.length === 0 ? (
        <p>No notes available for this subcategory.</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <span>{note.text}</span>
              <button type="button" onClick={() => handleEditNote(note.id)}>
                Edit
              </button>
              <button type="button" onClick={() => handleDeleteNote(note.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      <button type="button" onClick={handleAddNote}>
        Add Note
      </button>
    </div>
  );
}
