"use client"; // Ensure client-side rendering in Next.js 13+

import styled from "styled-components";
import { addSubcategory, getSubjects } from "../localStorageHelpers";

const AddButton = styled.button`
  background-color: #0070f3;
  color: #fff;
  font-size: 16px;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
  margin-top: 10px;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #005bbd;
  }

  &:active {
    background-color: #004a9c;
    transform: scale(0.98);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(0, 112, 243, 0.4);
  }
`;

const PlusIcon = styled.span`
  font-size: 20px;
  font-weight: bold;
  display: inline-block;
  transform: scale(1.2);
`;

export default function AddSubcategoryButton({ subjectId, onSubcategoryAdded }) {
  const handleClick = () => {
    const title = prompt("Enter subcategory title:");
    if (title) {
      try {
        addSubcategory(subjectId, title); // Save the subcategory to localStorage
        const updatedSubjects = getSubjects(); // Fetch updated subjects
        const updatedSubject = updatedSubjects.find((sub) => sub.id === subjectId);
        if (updatedSubject) {
          onSubcategoryAdded(updatedSubject); // Notify parent to update state
        }
      } catch (error) {
        console.error("Error adding subcategory:", error);
        alert("Failed to add the subcategory. Please try again.");
      }
    }
  };

  return (
    <AddButton type="button" onClick={handleClick}>
      <PlusIcon>+</PlusIcon>
      Add Subcategory
    </AddButton>
  );
}
