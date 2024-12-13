"use client"; // If you're using Next.js 13+ and need client-side behavior

import { useState, useEffect } from "react";
import styled from "styled-components";
import AddSubjectButton from "../app/components/AddSubjectButton";
import { getSubjects } from "../app/localStorageHelpers";
import Dashboard from "../app/components/Dashboard";

// A visually appealing hero section with a background gradient
const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0070f3 0%, #57a0ff 100%);
  color: #fff;
  padding: 80px 20px;
  text-align: center;
`;

const HeroHeading = styled.h1`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const HeroParagraph = styled.p`
  font-size: 20px;
  max-width: 600px;
  margin-bottom: 30px;
  line-height: 1.5;
`;

const SubjectsContainer = styled.div`
  margin-top: 40px;
`;

const SubjectStatus = styled.p`
  font-size: 16px;
  color: #f1f1f1;
`;

export default function Home() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const loadedSubjects = getSubjects() || [];
    console.log("Loaded subjects:", loadedSubjects);
    setSubjects(loadedSubjects);
  }, []);

  const handleSubjectAdded = () => {
    const updatedSubjects = getSubjects() || [];
    console.log("Updated subjects:", updatedSubjects);
    setSubjects(updatedSubjects);
  };
  return (
    <>
      <HeroSection>
        <HeroHeading>Welcome to StuddiBuddi</HeroHeading>
        <HeroParagraph>
          Streamline your learning with organized subjects and notes.
          Add a new subject to get started.
        </HeroParagraph>
        <AddSubjectButton onSubjectAdded={handleSubjectAdded} />
        <SubjectsContainer>
          {subjects.length > 0 ? (
            <SubjectStatus>You currently have {subjects.length} subjects.</SubjectStatus>
          ) : (
            <SubjectStatus>No subjects yet. Please add one!</SubjectStatus>
          )}
        </SubjectsContainer>
      </HeroSection>
  
      {/* Use Dashboard here as a separate component */}
      <Dashboard />
    </>
  );
}