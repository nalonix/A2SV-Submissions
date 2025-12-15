import { useState, useEffect } from "react";
import OpportunityCard from "./components/OpportunityCard";
import OpportunityDetail from "./components/OpportunityDetail";
import { getOpportunities } from "./services/opportunityService";
import type { Opportunity } from "./services/opportunityService";
import "./App.css";

function App() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const data = await getOpportunities();
        console.log(data.data);
        setOpportunities(data.data);
      } catch (err) {
        setError("Failed to fetch opportunities");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  const handleSelectOpportunity = (id: string) => {
    const opportunity = opportunities.find(opp => opp.id === id);
    if (opportunity) {
      setSelectedOpportunity(opportunity);
    }
  };

  const handleBackToList = () => {
    setSelectedOpportunity(null);
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>Job Opportunities</h1>
        <p className="subtitle">Find your next great opportunity</p>
      </div>
      {loading && (
        <div className="loading-container">
          <p>Loading opportunities...</p>
        </div>
      )}
      {error && (
        <div className="error-container">
          <p>Error: {error}</p>
        </div>
      )}
      {!loading && !error && (
        <div>
          {selectedOpportunity ? (
            <OpportunityDetail opportunity={selectedOpportunity} onBack={handleBackToList} />
          ) : (
            <div className="opportunity-grid">
              {opportunities.map((opp) => (
                <OpportunityCard key={opp.id} opportunity={opp} onClick={handleSelectOpportunity} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
