import React from 'react';

interface Opportunity {
  id: string;
  title: string;
  description: string;
  responsibilities: string;
  requirements: string;
  idealCandidate: string;
  categories: string[];
  opType: string;
  startDate: string;
  endDate: string;
  deadline: string;
  location: string[];
  requiredSkills: string[];
  whenAndWhere: string;
  orgName: string;
  logoUrl: string;
  orgEmail: string;
  orgPrimaryPhone: string;
  orgID: string;
  datePosted: string;
  status: string;
  applicantsCount: number;
  viewsCount: number;
  average_rating: number;
  total_reviews: number;
  perksAndBenefits: string | null;
  createdAt: string;
  updatedAt: string;
  isPaid: boolean;
  isBookmarked: boolean;
  isRolling: boolean;
  questions: any[] | null;
  engagementType: string;
  paymentOption: {
    currency: string;
    paymentType: string;
  };
  createdBy: string;
}

interface OpportunityDetailProps {
  opportunity: Opportunity;
  onBack: () => void;
}

const OpportunityDetail: React.FC<OpportunityDetailProps> = ({ opportunity, onBack }) => {
  const formatDate = (dateString: string) => {
    if (!dateString || dateString === '0001-01-01T00:00:00Z') return 'Not specified';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Invalid date';
    }
  };

  const getStatusBadgeClass = (status: string) => {
    return status.toLowerCase() === 'open' ? 'badge status-open' : 'badge status-closed';
  };

  const getOpTypeBadgeClass = (opType: string) => {
    const type = opType.toLowerCase();
    if (type === 'remote' || type === 'virtual') return 'badge remote';
    return 'badge onsite';
  };

  return (
    <div className="opportunity-detail">
      <button onClick={onBack} className="back-button">← Back to opportunities</button>
      
      {/* Header Section */}
      <div className="detail-header">
        <img 
          src={opportunity.logoUrl || '/placeholder-logo.png'} 
          alt={`${opportunity.orgName} logo`}
          className="company-logo-large"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"%3E%3Crect fill="%23f3f4f6" width="80" height="80"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="32" fill="%239ca3af"%3E%3C/text%3E%3C/svg%3E';
          }}
        />
        <div className="header-content">
          <h2>{opportunity.title}</h2>
          <p className="org-name">{opportunity.orgName}</p>
          <div className="detail-badges">
            <span className={getStatusBadgeClass(opportunity.status)}>
              {opportunity.status.toUpperCase()}
            </span>
            {opportunity.opType && (
              <span className={getOpTypeBadgeClass(opportunity.opType)}>
                {opportunity.opType}
              </span>
            )}
            {opportunity.isPaid && (
              <span className="badge" style={{ backgroundColor: '#dcfce7', color: '#16a34a' }}>
                💰 Paid
              </span>
            )}
            {opportunity.isRolling && (
              <span className="badge">Rolling Basis</span>
            )}
          </div>
        </div>
      </div>

      {/* Engagement Statistics */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Applicants</div>
          <div className="stat-value">{opportunity.applicantsCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Views</div>
          <div className="stat-value">{opportunity.viewsCount?.toLocaleString() || 0}</div>
        </div>
        {opportunity.total_reviews > 0 && (
          <div className="stat-card">
            <div className="stat-label">Average Rating</div>
            <div className="stat-value">
              {opportunity.average_rating.toFixed(1)} ⭐ ({opportunity.total_reviews})
            </div>
          </div>
        )}
      </div>

      {/* Description Section */}
      <div className="detail-section">
        <h3>📋 Description</h3>
        <p>{opportunity.description}</p>
      </div>

      {/* Responsibilities Section */}
      {opportunity.responsibilities && (
        <div className="detail-section">
          <h3>✅ Responsibilities</h3>
          <p>{opportunity.responsibilities}</p>
        </div>
      )}

      {/* Requirements Section */}
      {opportunity.requirements && (
        <div className="detail-section">
          <h3>📌 Requirements</h3>
          <p>{opportunity.requirements}</p>
        </div>
      )}

      {/* Ideal Candidate Section */}
      {opportunity.idealCandidate && (
        <div className="detail-section">
          <h3>🎯 Ideal Candidate</h3>
          <p>{opportunity.idealCandidate}</p>
        </div>
      )}

      {/* Required Skills */}
      {opportunity.requiredSkills && opportunity.requiredSkills.length > 0 && (
        <div className="detail-section">
          <h3>🛠️ Required Skills</h3>
          <div className="skills-list">
            {opportunity.requiredSkills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      {opportunity.categories && opportunity.categories.length > 0 && (
        <div className="detail-section">
          <h3>📂 Categories</h3>
          <div className="categories-list">
            {opportunity.categories.map((category, index) => (
              <span key={index} className="category-tag">{category}</span>
            ))}
          </div>
        </div>
      )}

      {/* Location & When/Where */}
      <div className="detail-section">
        <h3>📍 Location & Details</h3>
        <div className="detail-grid">
          <div className="info-card">
            <h4>Locations</h4>
            <div className="locations-list">
              {opportunity.location && opportunity.location.length > 0 ? (
                opportunity.location.map((loc, index) => (
                  <span key={index} className="location-tag">{loc}</span>
                ))
              ) : (
                <span className="value">Not specified</span>
              )}
            </div>
          </div>
          {opportunity.whenAndWhere && (
            <div className="info-card">
              <h4>When & Where</h4>
              <div className="value">{opportunity.whenAndWhere}</div>
            </div>
          )}
        </div>
      </div>

      {/* Important Dates */}
      <div className="detail-section">
        <h3>📅 Important Dates</h3>
        <div className="detail-grid">
          <div className="info-card">
            <h4>Posted Date</h4>
            <div className="value">{formatDate(opportunity.datePosted)}</div>
          </div>
          <div className="info-card">
            <h4>Start Date</h4>
            <div className="value">{formatDate(opportunity.startDate)}</div>
          </div>
          <div className="info-card">
            <h4>End Date</h4>
            <div className="value">{formatDate(opportunity.endDate)}</div>
          </div>
          <div className="info-card">
            <h4>Deadline</h4>
            <div className="value">{formatDate(opportunity.deadline)}</div>
          </div>
        </div>
      </div>

      {/* Perks & Benefits */}
      {opportunity.perksAndBenefits && (
        <div className="detail-section">
          <h3>🎁 Perks & Benefits</h3>
          <p>{opportunity.perksAndBenefits}</p>
        </div>
      )}

      {/* Organization Contact Information */}
      <div className="detail-section">
        <h3>🏢 Organization Information</h3>
        <div className="detail-grid">
          <div className="info-card">
            <h4>Organization</h4>
            <div className="value">{opportunity.orgName}</div>
          </div>
          <div className="info-card">
            <h4>Created By</h4>
            <div className="value">{opportunity.createdBy || 'Not specified'}</div>
          </div>
        </div>
        <div className="contact-info">
          {opportunity.orgEmail && (
            <div className="contact-item">
              <span>📧</span>
              <a href={`mailto:${opportunity.orgEmail}`}>{opportunity.orgEmail}</a>
            </div>
          )}
          {opportunity.orgPrimaryPhone && (
            <div className="contact-item">
              <span>📱</span>
              <a href={`tel:${opportunity.orgPrimaryPhone}`}>{opportunity.orgPrimaryPhone}</a>
            </div>
          )}
        </div>
      </div>

      {/* Payment Information */}
      {opportunity.isPaid && opportunity.paymentOption && (
        <div className="detail-section">
          <h3>💰 Payment Information</h3>
          <div className="detail-grid">
            {opportunity.paymentOption.paymentType && (
              <div className="info-card">
                <h4>Payment Type</h4>
                <div className="value">{opportunity.paymentOption.paymentType}</div>
              </div>
            )}
            {opportunity.paymentOption.currency && (
              <div className="info-card">
                <h4>Currency</h4>
                <div className="value">{opportunity.paymentOption.currency}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OpportunityDetail;
