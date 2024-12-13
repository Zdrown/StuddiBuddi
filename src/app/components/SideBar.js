"use client"; // If you're using Next.js 13+ app router with client-side logic

import { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import { getSubjects, deleteSubject } from "../localStorageHelpers";

const SidebarWrapper = styled.div`
  width: 250px;
  background-color: #f8f9fa;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 100vh

`;

const SidebarHeading = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const SubjectList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SubjectItem = styled.li`
  position: relative; 
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const SubjectTitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SubList = styled.ul`
  list-style: none;
  padding: 0 0 0 20px;
  margin-top: 5px;
`;

const SidebarLink = styled.a`
  text-decoration: none;
  color: #007bff;
  cursor: pointer;
  display: block;

  &:hover {
    text-decoration: underline;
  }
`;

/* Kebab menu icon (three vertical dots) */
const KebabMenuIcon = styled.span`
  font-size: 20px;
  cursor: pointer;
  padding: 0 6px;
  user-select: none;
  color: #555;

  &:hover {
    color: #000;
  }
`;

/* Dropdown container that appears on kebab menu click/hover */
const Dropdown = styled.div`
  position: absolute;
  top: 26px;   /* Just below the kebab icon */
  right: 0;    /* Align dropdown to the right edge */
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  z-index: 10;
  min-width: 120px;
  display: flex;
  flex-direction: column;
`;

const DropdownItem = styled.div`
  padding: 8px 12px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  text-align: left;
  white-space: nowrap;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export default function Sidebar() {
  const [subjects, setSubjects] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null); 
  // openDropdown stores the subject ID for which the dropdown is open, or null if none is open

  useEffect(() => {
    setSubjects(getSubjects());
  }, []);

  const handleOpenDropdown = (subjectId) => {
    setOpenDropdown((prev) => (prev === subjectId ? null : subjectId));
  };

  const handleDeleteSubject = (subjectId) => {
    deleteSubject(subjectId);
    setSubjects((prev) => prev.filter((subject) => subject.id !== subjectId));
    setOpenDropdown(null);
  };

  if (!subjects.length) {
    return <p>No subjects available. Add one to get started!</p>;
  }

  return (
    <SidebarWrapper>
      <SidebarHeading>Your Subjects</SidebarHeading>
      <SubjectList>
        {subjects.map((subject) => (
          <SubjectItem key={subject.id}>
            <SubjectTitleRow>
              <Link href={`/subject/${subject.id}`} passHref>
                <SidebarLink>{subject.title}</SidebarLink>
              </Link>
              <KebabMenuIcon onClick={() => handleOpenDropdown(subject.id)}>
                ⋮
              </KebabMenuIcon>

              {openDropdown === subject.id && (
                <Dropdown>
                  <DropdownItem onClick={() => handleDeleteSubject(subject.id)}>
                    Delete Subject
                  </DropdownItem>
                  {/* Add more actions here if needed */}
                </Dropdown>
              )}
            </SubjectTitleRow>

            {subject.subcategories?.length > 0 && (
              <SubList>
                {subject.subcategories.map((subcategory) => (
                  <li key={subcategory.id}>
                    <Link href={`/subject/subcategory/${subcategory.id}`} passHref>
  <SidebarLink>{subcategory.title}</SidebarLink>
</Link>
                  </li>
                ))}
              </SubList>
            )}
          </SubjectItem>
        ))}
      </SubjectList>
    </SidebarWrapper>
  );
}

