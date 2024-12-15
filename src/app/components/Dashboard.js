"use client"; // For Next.js 13+ client-side rendering

import { useEffect, useState } from "react";
import styled from "styled-components";
import { getSubjects } from "../localStorageHelpers"; // Adjust path if needed

// Dashboard Container
const DashboardContainer = styled.section`
  margin: 40px auto;
  padding: 32px;
  background-color: #ffffff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  max-width: 1100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

// Section Header
const SectionHeader = styled.h2`
  font-family: "Poppins", sans-serif;
  font-size: 24px;
  font-weight: bold;
  color: #0070f3;
  margin: 0;
`;

// Stats Rows
const StatRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f9fbfd;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: relative; /* Ensure it doesn't affect surrounding layout */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  will-change: transform, box-shadow; /* Hint browser for optimization */

  &:hover {
    transform: translateY(-5px); /* Smaller, smoother translation */
    box-shadow: 0 6px 15px rgba(0, 112, 243, 0.3); /* Simplified shadow */
  }
`;

const StatTitle = styled.h3`
  font-size: 18px;
  color: #333;
  margin: 0;
  font-family: "Poppins", sans-serif;
`;

const StatValue = styled.span`
  font-size: 24px;
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  color: #0070f3;
`;

// Progress Bar
const ProgressBarContainer = styled.div`
  background-color: #e6e6e6;
  border-radius: 6px;
  height: 12px;
  width: 100%;
  overflow: hidden;
  margin-top: 8px;
  
`;

const ProgressBarFill = styled.div`
  background-color: #0070f3;
  height: 100%;
  width: ${(props) => props.percentage || 0}%;
  transition: width 0.4s ease;
`;

// Achievements Section
const AchievementsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
`;

const AchievementCard = styled.div`
  background-color: ${(props) => (props.unlocked ? "#f0f8ff" : "#f9f9f9")};
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  box-shadow: ${(props) =>
    props.unlocked ? "0 4px 12px rgba(0, 112, 243, 0.2)" : "0 2px 8px rgba(0, 0, 0, 0.05)"};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: ${(props) => (props.unlocked ? "scale(1.03)" : "none")};
    box-shadow: ${(props) =>
      props.unlocked
        ? "0 6px 18px rgba(0, 112, 243, 0.3)"
        : "0 2px 8px rgba(0, 0, 0, 0.1)"};
  }
`;

const AchievementTitle = styled.h4`
  font-size: 18px;
  color: ${(props) => (props.unlocked ? "#0070f3" : "#555")};
  margin-bottom: 8px;
  font-family: "Poppins", sans-serif;
`;

const AchievementDescription = styled.p`
  font-size: 14px;
  color: #555;
  font-family: "Poppins", sans-serif;
`;

const PlaceholderMessage = styled.p`
  font-size: 16px;
  color: #666;
  text-align: center;
  margin-top: 16px;
`;

// Dashboard Component
export default function Dashboard() {
  const [subjectsCount, setSubjectsCount] = useState(0);
  const [notesCount, setNotesCount] = useState(0);

  useEffect(() => {
    const subjects = getSubjects() || [];
    setSubjectsCount(subjects.length);

    let totalNotes = 0;
    for (const subject of subjects) {
      if (!subject.subcategories) continue;
      for (const subcat of subject.subcategories) {
        totalNotes += subcat.notes?.length || 0;
      }
    }
    setNotesCount(totalNotes);
  }, []);

  const NOTES_GOAL = 100;
  const notesPercentage = Math.min((notesCount / NOTES_GOAL) * 100, 100);

  const achievements = [
    {
      id: 1,
      title: "First Steps",
      unlocked: subjectsCount >= 1,
      description: "You created your first subject!",
    },
    {
      id: 2,
      title: "Note Taker",
      unlocked: notesCount >= 5,
      description: "Congrats on adding 5 notes!",
    },
    {
      id: 3,
      title: "Study Enthusiast",
      unlocked: notesCount >= 20,
      description: "20 notes! You're on your way to mastering these subjects.",
    },
    {
      id: 4,
      title: "Halfway There",
      unlocked: notesCount >= 50,
      description: "50 notes! Keep it up!",
    },
    {
      id: 5,
      title: "Note Master",
      unlocked: notesCount >= 100,
      description: "100 notes! You've unlocked the highest achievement!",
    },
  ];

  const unlockedAchievements = achievements.filter((ach) => ach.unlocked);

  return (
    <DashboardContainer>
      <SectionHeader>Dashboard</SectionHeader>

      {/* Stats Section */}
      <StatRow>
        <StatTitle>Total Subjects</StatTitle>
        <StatValue>{subjectsCount}</StatValue>
      </StatRow>
      <StatRow>
        <StatTitle>Total Notes</StatTitle>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <StatValue>{notesCount}</StatValue>
          <ProgressBarContainer>
            <ProgressBarFill percentage={notesPercentage} />
          </ProgressBarContainer>
        </div>
      </StatRow>

      {/* Achievements Section */}
      <SectionHeader>Achievements</SectionHeader>
      <AchievementsContainer>
        {unlockedAchievements.length > 0 ? (
          unlockedAchievements.map((ach) => (
            <AchievementCard key={ach.id} unlocked={ach.unlocked}>
              <AchievementTitle unlocked={ach.unlocked}>{ach.title}</AchievementTitle>
              <AchievementDescription>{ach.description}</AchievementDescription>
            </AchievementCard>
          ))
        ) : (
          <PlaceholderMessage>No achievements yet. Keep adding notes to unlock rewards!</PlaceholderMessage>
        )}
      </AchievementsContainer>
    </DashboardContainer>
  );
}
