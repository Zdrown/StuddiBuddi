import { useState, useEffect } from "react";
import { getSubjects } from "../localStorageHelpers";

export default function SubjectList() {
  const [subjects, setSubjects] = useState([]); // Start with an empty state

  useEffect(() => {
    // Fetch data from localStorage on the client
    const subjectsFromStorage = getSubjects();
    setSubjects(subjectsFromStorage);
  }, []); // Run only on mount

  if (!subjects.length) {
    return <p>No subjects available. Add one to get started!</p>;
  }

  return (
    <ul>
      {subjects.map((subject) => (
        <li key={subject.id}>
          <a href={`/subject/${subject.id}`}>{subject.title}</a>
        </li>
      ))}
    </ul>
  );
}
