import { useState, useEffect } from "react";
import { getSubjects } from "../localStorageHelpers";
import styled from "styled-components";

const SidebarWrapper = styled.div`
  width: 250px;
  background-color: #f8f9fa;
  padding: 20px;
  height: 100vh;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const SidebarHeading = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const SubjectList = styled.ul`
  list-style: none;
  padding: 0;
`;

const SubList = styled.ul`
  list-style: none;
  padding: 0 0 0 20px;
`;

const SidebarLink = styled.a`
  text-decoration: none;
  color: #007bff;
  cursor: pointer;
  display: block;
  margin-bottom: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

export default function Sidebar() {
  const [subjects, setSubjects] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const subjectsFromStorage = getSubjects();
    setSubjects(subjectsFromStorage);
  }, []);

  if (!subjects.length) {
    return <p>No subjects available. Add one to get started!</p>;
  }

  return (
    <SidebarWrapper>
      <SidebarHeading>Subjects</SidebarHeading>
      <SubjectList>
        {subjects.map((subject) => (
          <li key={subject.id}>
            <SidebarLink href={`/subject/${subject.id}`}>{subject.title}</SidebarLink>
            {subject.subcategories.length > 0 && (
              <SubList>
                {subject.subcategories.map((subcategory) => (
                  <li key={subcategory.id}>
                    <SidebarLink href={`/subject/${subject.id}/subcategory/${subcategory.id}`}>
                      {subcategory.title}
                    </SidebarLink>
                  </li>
                ))}
              </SubList>
            )}
          </li>
        ))}
      </SubjectList>
    </SidebarWrapper>
  );
}
