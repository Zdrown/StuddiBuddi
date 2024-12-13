"use client"; // If you’re using Next.js 13+ and need client-side rendering

import { useEffect, useState } from "react";
import styled from "styled-components";
import { getSubjects } from "../localStorageHelpers"; // Adjust path if needed

// Container for the entire dashboard block
const DashboardContainer = styled.section`
  margin: 40px 20px;
  padding: 24px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  max-width: 1000px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

// A row or card that displays a main statistic
const StatRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f7f9fc;
  padding: 12px 16px;
  border-radius: 6px;
`;

const StatTitle = styled.h3`
  font-size: 18px;
  color: #333;
  margin: 0;
`;

const StatValue = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #0070f3;
`;

const ProgressBarContainer = styled.div`
  background-color: #e6e6e6;
  border-radius: 6px;
  height: 12px;
  width: 100%;
  overflow: hidden;
  margin-top: 6px;
`;

const ProgressBarFill = styled.div`
  background-color: #0070f3;
  height: 100%;
  width: ${(props) => props.percentage || 0}%;
  transition: width 0.3s ease;
`;

// Achievements container
const AchievementsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const AchievementCard = styled.div`
  flex: 1 1 200px;
  background-color: #f7f9fc;
  border-radius: 6px;
  padding: 16px;
  text-align: center;
  min-width: 200px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const AchievementTitle = styled.h4`
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
`;

const AchievementDescription = styled.p`
  font-size: 14px;
  color: #555;
`;

export default function Dashboard() {
  const [subjectsCount, setSubjectsCount] = useState(0);
  const [notesCount, setNotesCount] = useState(0);

  // We load stats once the component is mounted
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

  // Example progress metric: total notes out of some “goal,” e.g., 100
  const NOTES_GOAL = 100;
  const notesPercentage = Math.min((notesCount / NOTES_GOAL) * 100, 100);

  // Example achievements based on thresholds
  const achievements = [
    {
      id: 1,
      title: "First Steps",
      unlocked: subjectsCount >= 1,
      description: "You created your first subject!"
    },
    {
      id: 2,
      title: "Note Taker",
      unlocked: notesCount >= 5,
      description: "Congrats on adding 5 notes!"
    },
    {
      id: 3,
      title: "Study Enthusiast",
      unlocked: notesCount >= 20,
      description: "20 notes! You're on your way to mastering these subjects."
    },
    {
      id: 4,
      title: "Halfway There",
      unlocked: notesCount >= 50,
      description: "50 notes! Keep it up!"
    },
    {
      id: 5,
      title: "Note Master",
      unlocked: notesCount >= 100,
      description: "100 notes! You've unlocked the highest achievement!"
    }
  ];

  // Filter for unlocked achievements
  const unlockedAchievements = achievements.filter((ach) => ach.unlocked);

  return (
    <DashboardContainer>
      {/* Stats Rows */}
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
      <h2>Achievements</h2>
      <AchievementsContainer>
        {unlockedAchievements.length > 0 ? (
          unlockedAchievements.map((ach) => (
            <AchievementCard key={ach.id}>
              <AchievementTitle>{ach.title}</AchievementTitle>
              <AchievementDescription>{ach.description}</AchievementDescription>
            </AchievementCard>
          ))
        ) : (
          <p>No achievements yet. Keep adding notes to unlock rewards!</p>
        )}
      </AchievementsContainer>
    </DashboardContainer>
  );
}
