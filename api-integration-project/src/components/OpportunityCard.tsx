import React from 'react';

interface OpportunityCardProps {
  opportunity: {
    id: string;
    title: string;
    orgName: string;
    location: string[];
    logoUrl: string;
    opType: string;
    categories: string[];
  };
  onClick: (id: string) => void;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity, onClick }) => {
  const displayLocation = opportunity.location && opportunity.location.length > 0 
    ? opportunity.location.join(', ') 
    : 'Location not specified';

  return (
    <div className="opportunity-card" onClick={() => onClick(opportunity.id)}>
      <div className="card-header">
        <img 
          src={opportunity.logoUrl || '/placeholder-logo.png'} 
          alt={`${opportunity.orgName} logo`}
          className="company-logo"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"%3E%3Crect fill="%23f3f4f6" width="48" height="48"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20" fill="%239ca3af"%3E%3C/text%3E%3C/svg%3E';
          }}
        />
        <div>
          <h3 className="card-title">{opportunity.title}</h3>
          <p className="company-name">{opportunity.orgName}</p>
        </div>
      </div>
      
      <div className="card-meta">
        <div className="meta-item">
          <span className="meta-icon">📍</span>
          <span>{displayLocation}</span>
        </div>
        {opportunity.opType && (
          <div className="meta-item">
            <span className="meta-icon">💼</span>
            <span style={{ textTransform: 'capitalize' }}>{opportunity.opType}</span>
          </div>
        )}
      </div>
      
      {opportunity.categories && opportunity.categories.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          {opportunity.categories.slice(0, 2).map((category, index) => (
            <span key={index} className="tag">{category}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default OpportunityCard;

