
import { addNote, updateNote, deleteNote } from "../localStorageHelpers";

export default function NotesList({ subcategoryId, notes, onNotesChange }) {
  const handleAddNote = () => {
    const text = prompt("Enter the note:");
    if (text) {
      const updatedSubcategory = addNote(subcategoryId, text);
      onNotesChange(updatedSubcategory.notes); // Update parent state
    }
  };

  const handleEditNote = (noteId) => {
    const updatedText = prompt("Edit your note:");
    if (updatedText) {
      const updatedNotes = updateNote(subcategoryId, noteId, updatedText);
      onNotesChange(updatedNotes); // Update parent state
    }
  };

  const handleDeleteNote = (noteId) => {
    const updatedNotes = deleteNote(subcategoryId, noteId);
    onNotesChange(updatedNotes); // Update parent state
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
              <button type="button"onClick={() => handleEditNote(note.id)}>Edit</button>
              <button type="button" onClick={() => handleDeleteNote(note.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      <button type="button" onClick={handleAddNote}>Chad Note</button>
    </div>
  );
}
