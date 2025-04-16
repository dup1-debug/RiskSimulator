
import React, { useState } from 'react';
import { useRiskContext } from '@/contexts/RiskContext';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import RiskAdjustmentPanel from '@/components/RiskAdjustmentPanel';

const Simulator: React.FC = () => {
  const { riskData, loading, error } = useRiskContext();
  const [adjustedValues, setAdjustedValues] = useState<Record<string, any>>({});

  const handleUpdate = (riskId: string, updatedValues: any) => {
    setAdjustedValues(prev => ({
      ...prev,
      [riskId]: {
        ...(prev[riskId] || {}),
        ...updatedValues
      }
    }));
    
    console.log('Updated values:', { riskId, ...updatedValues });
    // In a real application, this would trigger updates to charts and other visualizations
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
        <h1 className="text-2xl font-bold text-gray-800">Risk Adjustment Simulator</h1>
      </div>
      
      <div className="space-y-6">
        {loading ? (
          // Skeleton loaders for cards
          Array(7).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-lg" />
          ))
        ) : (
          riskData.map((risk) => (
            <RiskAdjustmentPanel
              key={risk.id}
              risk={risk}
              onUpdate={(values) => handleUpdate(risk.id, values)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Simulator;
