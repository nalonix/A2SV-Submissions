import React from "react";

// import { Opportunity } from '../services/opportunityService';

export interface Opportunity {
  id: number;
  name: string;
  title: string;
  description: string;
}

interface OpportunityCardProps {
  opportunity: Opportunity;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        margin: "16px 0",
      }}
    >
      <h2>{opportunity.title}</h2>
      <h3>{opportunity.name}</h3>
      <p>{opportunity.description}</p>
    </div>
  );
};

export default OpportunityCard;
