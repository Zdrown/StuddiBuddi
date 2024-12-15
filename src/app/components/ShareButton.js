import styled from "styled-components";
import { useRouter } from "next/router";
// @ts-ignore
import { ShareIcon } from "@heroicons/react/24/outline"; // Use this path for outline icons


const ShareButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  margin-bottom: 3vh;
  border: 1px solid #ccc;
  border-radius: 50px;
  background-color: #f9f9f9;
  color: #333;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #f1f1f1;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 112, 243, 0.3);
  }

  svg {
    width: 18px;
    height: 18px;
    stroke: #333;
  }
`;

// Share Button Component
export default function ShareSubjectButton({ subjectTitle, notes }) {
  const router = useRouter();

  const handleShare = async () => {
  const shareText = `Check out my notes for "${subjectTitle}":\n\n${notes.join("\n")}`;
  const url = window.location.href;

  if (navigator.share) {
    try {
      await navigator.share({
        title: subjectTitle,
        text: shareText,
        url: url,
      });
      console.log("Content shared successfully!");
    } catch (error) {
      console.error("Error sharing content:", error);
    }
  } else {
    // Fallback for SMS sharing
    const smsLink = `sms:?body=${encodeURIComponent(`${shareText}\n${url}`)}`;

    window.location.href = smsLink;
  }
};

return (
  <ShareButton onClick={handleShare}>
  <ShareIcon /> {/* This is correct */}
  Share
</ShareButton>

  );
}