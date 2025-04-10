
import React, { useState } from 'react';
import { useRiskContext } from '@/contexts/RiskContext';
import EbitdaAdjustmentCard from '@/components/EbitdaAdjustmentCard';
import { Skeleton } from '@/components/ui/skeleton';

const Simulator: React.FC = () => {
  const { riskData, loading, error } = useRiskContext();
  const [adjustedValues, setAdjustedValues] = useState<Record<string, number>>({});

  const handleAdjustment = (riskId: string, newValue: number) => {
    setAdjustedValues(prev => ({
      ...prev,
      [riskId]: newValue
    }));
  };

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
      <h1 className="text-2xl font-bold mb-6">Risk Simulator - Changing EBITDA Targets</h1>
      
      <div className="space-y-4">
        {loading ? (
          // Skeleton loaders for cards
          Array(7).fill(0).map((_, i) => (
            <div key={i} className="border rounded-lg p-4 bg-white">
              <Skeleton className="h-8 w-48 mb-4" />
              <div className="flex justify-between mb-4">
                <div>
                  <Skeleton className="h-4 w-36 mb-2" />
                  <Skeleton className="h-4 w-36" />
                </div>
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
              <Skeleton className="h-8 w-full mb-4" />
            </div>
          ))
        ) : (
          riskData.map((risk) => (
            <EbitdaAdjustmentCard
              key={risk.id}
              risk={risk}
              adjustedValue={adjustedValues[risk.id] || risk.target_ebitda}
              onAdjustment={(newValue) => handleAdjustment(risk.id, newValue)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Simulator;
