
import React from 'react';
import { useRiskContext } from '@/contexts/RiskContext';
import RiskCard from '@/components/RiskCard';
import MonteCarloChart from '@/components/MonteCarloChart';
import KeyDriversChart from '@/components/KeyDriversChart';
import KpiTable from '@/components/KpiTable';
import { Skeleton } from '@/components/ui/skeleton';

const RiskDashboard: React.FC = () => {
  const { riskData, selectedRisk, loading, error, selectRisk, selectedRiskId } = useRiskContext();

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">Error</h2>
          <p className="mt-2">{error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Risk Simulator</h1>
      
      {/* Risk Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 mb-8">
        {loading ? (
          // Skeleton loaders for cards
          Array(7).fill(0).map((_, i) => (
            <div key={i} className="border rounded-lg p-4">
              <Skeleton className="h-4 w-24 mx-auto mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-16 mx-auto mt-3" />
            </div>
          ))
        ) : (
          riskData.map((risk) => (
            <RiskCard
              key={risk.id}
              risk={risk}
              isSelected={selectedRiskId === risk.id}
              onClick={() => selectRisk(risk.id)}
            />
          ))
        )}
      </div>

      {selectedRisk && (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Risk Breakdown</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {loading ? (
                <>
                  <Skeleton className="h-64 w-full" />
                  <Skeleton className="h-64 w-full" />
                </>
              ) : (
                <>
                  <MonteCarloChart data={selectedRisk.monte_carlo_simulation} />
                  <KeyDriversChart data={selectedRisk.key_drivers} />
                </>
              )}
            </div>
            <div className="w-full">
              {loading ? (
                <Skeleton className="h-64 w-full" />
              ) : (
                <KpiTable data={selectedRisk.kpis} />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RiskDashboard;
