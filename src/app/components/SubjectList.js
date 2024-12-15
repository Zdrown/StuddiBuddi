import { useState, useEffect } from "react";
import { getSubjects } from "../localStorageHelpers";
import styled from "styled-components";


const SubjectListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
`;



const SubjectListItem = styled.li`
  padding: 12px 16px;
  margin-bottom: 8px;
  border-radius: 6px;
  background-color: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;


const StyledLink = styled.a`
  text-decoration: none;
  color: #0070f3;
  font-size: 520px;
  font-family: "Poppins", sans-serif;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

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
    <SubjectListContainer>
      {subjects.map((subject) => (
        <SubjectListItem key={subject.id}>
          <StyledLink href={`/subject/${subject.id}`}>{subject.title}</StyledLink>
        </SubjectListItem>
      ))}
    </SubjectListContainer>
  );
}
