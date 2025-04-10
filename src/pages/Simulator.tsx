
import React, { useState } from 'react';
import { useRiskContext } from '@/contexts/RiskContext';
import EbitdaAdjustmentCard from '@/components/EbitdaAdjustmentCard';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

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
            className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex items-center mb-8">
        <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900 mr-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back</span>
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">EBITDA Target Simulator</h1>
      </div>
      
      <div className="space-y-6">
        {loading ? (
          // Skeleton loaders for cards
          Array(7).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-lg" />
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
