"use client"; // For Next.js 13+ client-side features

import { useState } from "react";
import styled from "styled-components";

// Main Container
const PricingContainer = styled.section`
  padding: 80px 20px;
  background: #0d0d0d; /* Dark theme matching the provided example */
  color: #ffffff;
  text-align: center;
  min-height: 100vh;
  width: 70vw;
  border-radius: 30px;
  margin-right: 5vw;
  margin-top: -2vh;
`;

// Section Header
const PricingHeader = styled.h1`
  font-size: 48px;
  font-weight: 700;
  font-family: "Poppins", sans-serif;
  margin-bottom: 16px;
  color: #ffffff;
`;

const SubHeader = styled.p`
  font-size: 18px;
  color: #b3b3b3; /* Light grey for contrast */
  margin-bottom: 40px;
  font-family: "Poppins", sans-serif;
`;

// Billing Toggle Buttons
const BillingToggle = styled.div`
  display: inline-flex;
  justify-content: center;
  border-radius: 12px;
  background-color: #1a1a1a;
  margin-bottom: 40px;

  button {
    padding: 12px 28px;
    font-size: 16px;
    color: ${(props) => (props.active ? "#ffffff" : "#b3b3b3")};
    background-color: ${(props) => (props.active ? "#333333" : "transparent")};
    border: none;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover {
      background-color: ${(props) => (props.active ? "#4d4d4d" : "#333333")};
    }

    &:not(:last-child) {
      border-right: 1px solid #333333;
    }
  }
`;

// Pricing Cards
const PricingGrid = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 32px;
  padding: 20px;
`;

const PricingCard = styled.div`
  background: #1f1f1f; /* Dark card background */
  color: #ffffff;
  border: ${(props) => (props.featured ? "2px solid #0070f3" : "none")};
  border-radius: 16px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 14vw;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 112, 243, 0.5);
  }
`;

const PlanTitle = styled.h3`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 12px;
  font-family: "Poppins", sans-serif;
`;

const PlanDescription = styled.p`
  color: #b3b3b3;
  font-size: 16px;
  margin-bottom: 24px;
  font-weight: 400;
`;

const PlanPrice = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 24px;

  span {
    font-size: 16px;
    color: #b3b3b3;
    font-weight: 500;
  }
`;

const SubscribeButton = styled.button`
  padding: 14px 30px;
  font-size: 18px;
  color: #ffffff;
  background: #0070f3;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 400;
  font-family: "Poppins", sans-serif;
  transition: all 0.3s ease;

  &:hover {
    background: #005bbd;
    transform: scale(1.05);
  }
`;

// Pricing Component
export default function Pricing() {
  const [isMonthly, setIsMonthly] = useState(true);

  const plans = [
    { name: "Hobby", priceMonthly: "0", priceYearly: "0", description: "Perfect for starters -100 Free Credits" },
    { name: "Freelancer", priceMonthly: 6, priceYearly: 5, description: "Best for professionals" },
    { name: "Startup", priceMonthly: 25, priceYearly: 20, description: "Grow your business" },
  ];

  return (
    <PricingContainer>
      <PricingHeader>
        Pricing Plans</PricingHeader>
      <SubHeader>
        Start building for free, then add a site plan to go live. Account plans unlock additional
        features.
      </SubHeader>

      {/* Toggle */}
      <BillingToggle>
        <button
          type="button"
          active={isMonthly ? "true" : undefined}
          onClick={() => setIsMonthly(true)}
        >
          Monthly Billing
        </button>
        <button
          type="button"
          active={!isMonthly ? "true" : undefined}
          onClick={() => setIsMonthly(false)}
        >
          Yearly Billing
        </button>
      </BillingToggle>

      {/* Pricing Cards */}
      <PricingGrid>
        {plans.map((plan, index) => (
          <PricingCard key={plan.name} featured={index === 1}>
            <PlanTitle>{plan.name}</PlanTitle>
            <PlanDescription>{plan.description}</PlanDescription>
            <PlanPrice>
              ${isMonthly ? plan.priceMonthly : plan.priceYearly}
              <span>/month</span>
            </PlanPrice>
            <SubscribeButton>Subscribe</SubscribeButton>
          </PricingCard>
        ))}
      </PricingGrid>
    </PricingContainer>
  );
}
