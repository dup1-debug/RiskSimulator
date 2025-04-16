
import React from 'react';
import { RiskData } from '@/api/mockData';
import RiskAdjustmentPanel from './RiskAdjustmentPanel';

interface RiskCardProps {
  risk: RiskData;
  isSelected: boolean;
  onClick: () => void;
}

const RiskCard: React.FC<RiskCardProps> = ({ risk, isSelected, onClick }) => {
  // Get risk level color
  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleUpdate = (updatedValues: any) => {
    console.log('Updated values for risk:', risk.id, updatedValues);
    // In a real application, you would update the risk data here
  };

  return (
    <div className="mb-4 w-full">
      <RiskAdjustmentPanel risk={risk} onUpdate={handleUpdate} />
    </div>
  );
};

export default RiskCard;
