"use client"; // For Next.js 13+ client-side features

import styled from "styled-components";
import Sidebar from "./SideBar";
import { useRouter } from "next/router";

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f9f9f9;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #0070f3;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  font-size: 24px;
  font-weight: bold;
  z-index: 1000;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;


const NavLinks = styled.div`
  display: flex;
  gap: 20px; /* Space between Pricing and About */
  align-items: center;
  margin-right: 5vw;
`;

const NavLink = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: #ffffff;
  cursor: pointer;
  transition: color 0.3s ease, text-shadow 0.3s ease;

  &:hover {
    color: #ffdd00;
    text-shadow: 0px 3px 8px rgba(255, 215, 0, 0.6);
  }
`;



const Logo = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 26px;
  font-weight: 700;
  color: #ffff;
  cursor: pointer;
  display: flex; /* Align image and text */
  align-items: center; /* Center-align text and image vertically */
  gap: 10px; /* Space between the logo and text */
  transition: color 0.3s ease, text-shadow 0.3s ease;
  margin-left: 4vw;

  &:hover {
    color: #B7B7A4;
    text-shadow: 0px 3px 8px rgba(255, 215, 0, 0.6);
  }
 
 
`;

 const SidebarWrapper = styled.div`
  position: fixed; /* Sidebar stays fixed */
  top: 60px; /* Below the header */
  left: 0;
  padding-top: 1vw;

  width: 250px; /* Fixed width for sidebar */
  height: calc(100vh -); /* Full height minus the header */
  background-color: #f4f4f4;

  overflow-y: fixed; /* Scroll only within the sidebar if content overflows */
  display: flex;
  flex-direction: column;
 

  
`;

const MainContent = styled.main`
  flex-grow: 1;
  padding: 80px 20px;
  margin-left: 365px;
  overflow: auto;
  padding-right:100px;
 
`;

const Footer = styled.footer`
  background-color: #005bbd;
  color: #ffffff;
  text-align: center;
  padding: 20px 0;
  font-family: "Poppins", sans-serif;
  font-size: 14px;

  

  p {
    margin: 0;
  }

  a {
    color: #ffe600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function Layout({ children, categories, onAddCategory }) {
  const router = useRouter();

  // Navigate back to the homepage when the logo is clicked
  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <>
    <Header>
    <Logo onClick={handleLogoClick}>
    <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  width="40"
  height="40"
  fill="none"
  stroke="white"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  aria-labelledby="studyIconTitle"
>
  <title id="studyIconTitle">Minimalist Study Icon</title>
  <path d="M12 2v20" /> 
  <path d="M4 6l8 6-8 6" /> 
  <path d="M20 6l-8 6 8 6" /> 
</svg>

    StuddiBuddi
  </Logo>
        <NavLinks>
          <NavLink >Pricing</NavLink>
          <NavLink >About</NavLink>
        </NavLinks>
      </Header>
      <LayoutContainer>
        <SidebarWrapper>
          {/* Pass categories and onAddCategory to Sidebar */}
          <Sidebar categories={categories} onAddCategory={onAddCategory} />
        </SidebarWrapper>
        <MainContent>{children}</MainContent>
      </LayoutContainer>
      <Footer>
        <p>© 2024 StuddiBuddi. All Rights Reserved.</p>
      </Footer>
    </>
  );
}
