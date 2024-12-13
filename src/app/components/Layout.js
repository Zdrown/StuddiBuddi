 // If you're on Next.js 13 App Router and need client-side features

import styled from "styled-components";
import Sidebar from "./SideBar";

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
  padding: 0 20px;
  font-size: 24px;
  font-weight: bold;
  z-index: 1000;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const SidebarWrapper = styled.div`
  width: 250px;
  background-color: #f4f4f4;
  padding-top: 60px;
  border-right: 1px solid #ddd;
 
`;

const MainContent = styled.main`
  flex-grow: 1;
  padding: 80px 20px;
  margin-left: 50px;
  overflow: auto;
`;

const Footer = styled.footer`
  background-color: #0070f3;
  color: #fff;
  text-align: center;
  padding: 10px 0;
  position: relative;
  bottom: 0;
  width: 100%;
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.1);
`;

export default function Layout({ children, categories, onAddCategory }) {
  console.log("Layout rendered with categories:", categories);

  return (
    <>
      <Header>
        <h1>StuddiBuddi</h1>
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
