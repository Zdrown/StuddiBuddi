"use client"; // If you're using Next.js 13+ app router with client-side logic

import { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import { getSubjects, deleteSubject } from "../localStorageHelpers";

const SidebarWrapper = styled.div`
  width: 300px; /* Slightly wider for modern design */
  background: linear-gradient(135deg, #0070f3 0%, #57a0ff 100%);
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const SidebarHeading = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  color: #fff;
`;

const SubjectList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
  overflow-y: auto;
  scrollbar-width: thin;
`;

const SubjectItem = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  }
`;

const SubjectTitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SidebarLink = styled.a`
  text-decoration: none;
  font-size: 16px;
  color: #fff;
  font-weight: 500;
  flex-grow: 1;
  display: block;

  &:hover {
    text-decoration: underline;
  }
`;

const KebabMenuIcon = styled.span`
  font-size: 18px;
  cursor: pointer;
  color: #ddd;
  padding-left: 10px;

  &:hover {
    color: #fff;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  min-width: 140px;
  display: flex;
  flex-direction: column;
  padding: 8px 0;
`;

const DropdownItem = styled.div`
  padding: 8px 16px;
  font-size: 14px;
  color: #333;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const SubList = styled.ul`
  list-style: none;
  padding: 8px 0 0 20px;
  margin: 5px 0;
`;

const SubListItem = styled.li`
  font-size: 14px;
  color: #ddd;

  &:hover {
    color: #fff;
  }
`;

const AddSubjectButton = styled.button`
  margin-top: 20px;
  background-color: #ffffff;
  color: #0070f3;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
    color: #005bbd;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.5);
  }
`;

export default function Sidebar() {
  const [subjects, setSubjects] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

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
                </Dropdown>
              )}
            </SubjectTitleRow>

            {subject.subcategories?.length > 0 && (
              <SubList>
                {subject.subcategories.map((subcategory) => (
                  <SubListItem key={subcategory.id}>
                    <Link href={`/subject/subcategory/${subcategory.id}`} passHref>
                      <SidebarLink>{subcategory.title}</SidebarLink>
                    </Link>
                  </SubListItem>
                ))}
              </SubList>
            )}
          </SubjectItem>
        ))}
      </SubjectList>
      <AddSubjectButton>Add New Subject</AddSubjectButton>
    </SidebarWrapper>
  );
}
