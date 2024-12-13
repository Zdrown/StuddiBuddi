import { v4 as uuidv4 } from "uuid"; // Ensure UUID for unique IDs

const isBrowser = () => typeof window !== "undefined";

// Fetch all subjects from local storage
export const getSubjects = () => {
  if (!isBrowser()) return [];
  const data = localStorage.getItem("subjects");
  return data ? JSON.parse(data) : [];
};

// Add a new subject
export const addSubject = (title) => {
  if (!isBrowser()) {
    console.warn("localStorage is not available on the server.");
    return;
  }
  const subjects = getSubjects();
  const newSubject = { id: uuidv4(), title, subcategories: [] };
  subjects.push(newSubject);
  localStorage.setItem("subjects", JSON.stringify(subjects));
};

// Add a new subcategory to a subject
export const addSubcategory = (subjectId, title) => {
  if (!isBrowser()) return;
  const subjects = getSubjects();
  const subject = subjects.find((sub) => sub.id === subjectId);
  if (subject) {
    const newSubcategory = { id: uuidv4(), title, notes: [] };
    subject.subcategories.push(newSubcategory);
    localStorage.setItem("subjects", JSON.stringify(subjects));
  } else {
    console.error(`Subject with ID ${subjectId} not found.`);
  }
};

// Add a new note to a specific subcategory
export const addNote = (subcategoryId, text) => {
  if (!isBrowser()) return [];
  const subjects = getSubjects();
  let updatedNotes = [];
  for (const subject of subjects) {
    const subcategory = subject.subcategories.find((sc) => sc.id === subcategoryId);
    if (subcategory) {
      const newNote = { id: uuidv4(), text };
      subcategory.notes = subcategory.notes || [];
      subcategory.notes.push(newNote);
      updatedNotes = subcategory.notes;
      break;
    }
  }
  localStorage.setItem("subjects", JSON.stringify(subjects));
  return updatedNotes;
};

// Update an existing note
export const updateNote = (subcategoryId, noteId, newText) => {
  if (!isBrowser()) return [];
  const subjects = getSubjects();
  let updatedNotes = [];
  for (const subject of subjects) {
    const subcategory = subject.subcategories.find((sc) => sc.id === subcategoryId);
    if (subcategory) {
      const note = subcategory.notes.find((n) => n.id === noteId);
      if (note) {
        note.text = newText;
        updatedNotes = subcategory.notes;
      }
      break;
    }
  }
  localStorage.setItem("subjects", JSON.stringify(subjects));
  return updatedNotes;
};

// Delete a note
export const deleteNote = (subcategoryId, noteId) => {
  if (!isBrowser()) return [];
  const subjects = getSubjects();
  let updatedNotes = [];
  for (const subject of subjects) {
    const subcategory = subject.subcategories.find((sc) => sc.id === subcategoryId);
    if (subcategory) {
      subcategory.notes = subcategory.notes.filter((n) => n.id !== noteId);
      updatedNotes = subcategory.notes;
      break;
    }
  }
  localStorage.setItem("subjects", JSON.stringify(subjects));
  return updatedNotes;
};

// **NEW**: Delete an entire subject (and all of its subcategories/notes)
export const deleteSubject = (subjectId) => {
  if (!isBrowser()) return;
  const subjects = getSubjects();
  const updatedSubjects = subjects.filter((subject) => subject.id !== subjectId);
  localStorage.setItem("subjects", JSON.stringify(updatedSubjects));
};
