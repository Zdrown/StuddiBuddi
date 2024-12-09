// Utility function to safely access localStorage
const isBrowser = () => typeof window !== "undefined";

// Fetch all subjects from local storage
export const getSubjects = () => {
  if (!isBrowser()) {
    return []; // Return an empty array during server-side rendering
  }

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
  const newSubject = { id: Date.now().toString(), title, subcategories: [] };
  subjects.push(newSubject);
  localStorage.setItem("subjects", JSON.stringify(subjects));
};

// Add a new subcategory to a subject
export const addSubcategory = (subjectId, title) => {
  if (!isBrowser()) {
    console.warn("localStorage is not available on the server.");
    return;
  }

  const subjects = getSubjects();
  const subject = subjects.find((sub) => sub.id === subjectId);
  if (subject) {
    const newSubcategory = { id: Date.now().toString(), title, notes: [] };
    subject.subcategories.push(newSubcategory);
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }
};

// Add a new note to a specific subcategory
export const addNote = (subcategoryId, text) => {
  if (!isBrowser()) {
    console.warn("localStorage is not available on the server.");
    return;
  }

  const subjects = getSubjects();
  let updatedNotes = [];

  for (const subject of subjects) {
    const subcategory = subject.subcategories.find((sc) => sc.id === subcategoryId);
    if (subcategory) {
      const newNote = { id: Date.now().toString(), text };
      subcategory.notes = subcategory.notes || []; // Ensure notes array exists
      subcategory.notes.push(newNote); // Add the new note
      updatedNotes = subcategory.notes;
      break; // Exit loop once the correct subcategory is found
    }
  }

  localStorage.setItem("subjects", JSON.stringify(subjects));
  return updatedNotes;
};

// Update an existing note
export const updateNote = (subcategoryId, noteId, newText) => {
  if (!isBrowser()) {
    console.warn("localStorage is not available on the server.");
    return;
  }

  const subjects = getSubjects();
  let updatedNotes = [];

  for (const subject of subjects) {
    const subcategory = subject.subcategories.find((sc) => sc.id === subcategoryId);
    if (subcategory) {
      const note = subcategory.notes.find((n) => n.id === noteId);
      if (note) {
        note.text = newText; // Update the note's text
        updatedNotes = subcategory.notes;
      }
      break; // Exit loop once the correct subcategory is found
    }
  }

  localStorage.setItem("subjects", JSON.stringify(subjects));
  return updatedNotes;
};

// Delete a note
export const deleteNote = (subcategoryId, noteId) => {
  if (!isBrowser()) {
    console.warn("localStorage is not available on the server.");
    return;
  }

  const subjects = getSubjects();
  let updatedNotes = [];

  for (const subject of subjects) {
    const subcategory = subject.subcategories.find((sc) => sc.id === subcategoryId);
    if (subcategory) {
      subcategory.notes = subcategory.notes.filter((n) => n.id !== noteId); // Remove the note
      updatedNotes = subcategory.notes;
      break; // Exit loop once the correct subcategory is found
    }
  }

  localStorage.setItem("subjects", JSON.stringify(subjects));
  return updatedNotes;
};
