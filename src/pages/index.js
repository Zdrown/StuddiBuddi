import { useState, useEffect } from "react";
import Layout from "../app/components/Layout";
import AddSubjectButton from "../app/components/AddSubjectButton";
import { getSubjects } from "../app/localStorageHelpers";
import styled from "styled-components";

const HeroContainer = styled.div`
  text-align: center;
  margin: 40px auto;
`;

const HeroHeading = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
  color: #333;
`;

const HeroParagraph = styled.p`
  font-size: 18px;
  margin-bottom: 30px;
  color: #555;
`;

export default function Home() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const loadedSubjects = getSubjects();
    console.log("Loaded subjects: ", loadedSubjects); // Add logging to verify loading
    setSubjects(loadedSubjects);
  }, []);

  const handleSubjectAdded = () => {
    const updatedSubjects = getSubjects();
    console.log("Updated subjects: ", updatedSubjects); // Add logging to verify updates
    setSubjects(updatedSubjects);
  };

  return (
      <HeroContainer>
        <HeroHeading>Welcome to StuddiBuddi</HeroHeading>
        <HeroParagraph>Get started by adding subjects to your study list.</HeroParagraph>
        <AddSubjectButton onSubjectAdded={handleSubjectAdded} />
        <ul>
          {subjects.map((subject) => (
            <li key={subject.id}>{subject.title}</li>
          ))}
        </ul>
      </HeroContainer>
  );
}
