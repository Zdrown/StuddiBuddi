"use client"; // For Next.js 13+ client-side behavior

import { useState } from "react";
import styled from "styled-components";
import { addSubject } from "../localStorageHelpers";

/* 
  A styled, modern button that matches
  the branding and layout of the rest of the app.
*/
const AddButton = styled.button`
  background-color: #0070f3;
  color: #fff;
  font-size: 16px;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: inline-block;
  margin-top: 10px;

  &:hover {
    background-color: #005bbd;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.5);
  }

  &:active {
    background-color: #004a9c;
  }
`;

/*
  Overlay covers the entire screen behind the modal
  to give a clear focus on the content in the modal.
*/
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

/*
  A styled modal container that sits on top of the overlay.
*/
const ModalContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  width: 400px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ModalHeader = styled.h2`
  margin: 0;
  font-size: 20px;
  color: #333;
`;

const ModalInput = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: #0070f3;
    box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.2);
  }
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const ModalButton = styled.button`
  background-color: ${(props) => (props.variant === "cancel" ? "#aaa" : "#0070f3")};
  color: #fff;
  font-size: 14px;
  padding: 10px 18px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.variant === "cancel" ? "#888" : "#005bbd"};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.5);
  }

  &:active {
    background-color: ${(props) =>
      props.variant === "cancel" ? "#777" : "#004a9c"};
  }
`;

export default function AddSubjectButton({ onSubjectAdded }) {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTitle(""); // Clear input on close
  };

  const handleAddSubject = () => {
    if (title.trim()) {
      addSubject(title.trim());
      if (onSubjectAdded) {
        onSubjectAdded();
      }
    }
    closeModal();
  };

  return (
    <>
      <AddButton onClick={openModal}>Add Subject</AddButton>

      {showModal && (
        <ModalOverlay onClick={closeModal}>
          {/* Stop propagation so clicking inside modal doesn't close it */}
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <ModalHeader>Add a New Subject</ModalHeader>
            <ModalInput
              type="text"
              placeholder="Enter subject title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <ModalActions>
              <ModalButton variant="cancel" onClick={closeModal}>
                Cancel
              </ModalButton>
              <ModalButton onClick={handleAddSubject}>
                Add
              </ModalButton>
            </ModalActions>
          </ModalContainer>
        </ModalOverlay>
      )}
    </>
  );
}
