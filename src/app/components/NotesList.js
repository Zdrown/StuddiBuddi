"use client"; // For Next.js 13+ App Router if using client-side features

import styled from "styled-components";
import { deleteNote, updateNote, addNote } from "../localStorageHelpers";

// Styled Components for Elegant UI
const NotesContainer = styled.div`
  margin: 20px 0;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  
`;

const NotesHeader = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 16px;
`;

const NotesListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NoteItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const NoteText = styled.span`
  flex: 1;
  font-size: 16px;
  color: #555;
`;

const NoteActions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  background-color: ${(props) => (props.type === "edit" ? "#0070f3" : "#f44336")};
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.type === "edit" ? "#005bbd" : "#d32f2f")};
  }
`;

const AddNoteButton = styled.button`
  display: block;
  margin: 20px auto 0;
  background-color: #0070f3;
   width: 20%;
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

export default function NotesList({ subcategoryId, notes = [], onNotesChange }) {
  const handleAddNote = () => {
    const text = prompt("Enter your note:");
    if (text) {
      try {
        const updatedNotes = addNote(subcategoryId, text);
        onNotesChange(updatedNotes);
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
    <NotesContainer>
      <NotesHeader>Notes</NotesHeader>
      {notes.length === 0 ? (
        <p>No notes available for this subcategory.</p>
      ) : (
        <NotesListContainer>
          {notes.map((note) => (
            <NoteItem key={note.id}>
              <NoteText>{note.text}</NoteText>
              <NoteActions>
                <ActionButton type="edit" onClick={() => handleEditNote(note.id)}>
                  Edit
                </ActionButton>
                <ActionButton type="delete" onClick={() => handleDeleteNote(note.id)}>
                  Delete
                </ActionButton>
              </NoteActions>
            </NoteItem>
          ))}
        </NotesListContainer>
      )}
      <AddNoteButton onClick={handleAddNote}>Add Note</AddNoteButton>
    </NotesContainer>
  );
}
