
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
  background: linear-gradient(135deg, #57a0ff 0%, #0070f3 100%);
  color: #ffffff;
  padding: 60px 20px;
  text-align: center;
  border-radius: 12px;
  width: 68vw;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  margin-bottom:65px;
  height: 40vh;

`;

const HeroHeading = styled.h1`
  font-size: 48px;
  font-weight: 700;
  font-family: "Poppins", sans-serif;
  margin-bottom: 20px;
  text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
`;

const HeroParagraph = styled.p`
  font-size: 20px;
  font-family: "Poppins", sans-serif;
  max-width: 600px;
  margin-bottom: 30px;
  line-height: 1.6;
`;



const SubjectsContainer = styled.div`
  margin-top: 40px;
`;

const SubjectStatus = styled.p`
  font-size: 16px;
  color: #f1f1f1;
  font-family: "Poppins", sans-serif;
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
        <HeroHeading>Welcome to StuddiBuddi
        <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 48 48"
  width="48"
  height="48"
  fill="none"
  stroke="white"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  aria-labelledby="pencilAppleIconTitle"
>
  <title id="pencilAppleIconTitle">Stylized Pencil and Apple Icon</title>
  

  <path d="M24 16c6 0 10 4 10 10s-4 10-10 10-10-4-10-10 4-10 10-10z" />
  <path d="M22 8c2-1 4 1 4 3s-2 3-4 1" /> 

 
  <path d="M10 34l8-8" />
  <path d="M6 38l4-4" /> 
  <path d="M8 36l2 2" /> 
  <path d="M6 38l2-2" /> 
</svg>


        </HeroHeading>

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