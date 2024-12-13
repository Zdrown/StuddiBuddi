import { useState, useEffect } from "react";
import { getSubjects } from "../localStorageHelpers";
import Link from "next/link"; // Import Link from Next.js
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
      <SidebarHeading>Your Subjects</SidebarHeading>
      <SubjectList>
        {subjects.map((subject) => (
          <li key={subject.id}>
            {/* Use Link for client-side navigation */}
            <Link href={`/subject/${subject.id}`} passHref>
              <SidebarLink>{subject.title}</SidebarLink>
            </Link>
            {subject.subcategories.length > 0 && (
              <SubList>
                {subject.subcategories.map((subcategory) => (
                  <li key={subcategory.id}>
                    <Link
                      href={`/subject/${subject.id}/subcategory/${subcategory.id}`}
                      passHref
                    >
                      <SidebarLink>{subcategory.title}</SidebarLink>
                    </Link>
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
