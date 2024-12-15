
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
const IconWrapper = styled.div`
  position: relative;
  margin-top: -2vh; /* Move down */
  margin-left: -50vw; /* Move left */
  width: 100px;
  height: 100px;
  
`;


const HeroHeading = styled.h1`
  font-size: 48px;
  font-weight: 700;
  font-family: "Poppins", sans-serif;
  margin-bottom: -9vh;
  text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  margin-left: -1vw;
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
  
        </HeroHeading>
        <IconWrapper>
          <img
            src="/Book7.png"
            alt="Realistic Book and Pencil Icon"
            width="125"
            height="125"
          
          />
        </IconWrapper>
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