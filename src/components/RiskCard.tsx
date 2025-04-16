
import React from 'react';
import { RiskData } from '@/api/mockData';
import { Card } from '@/components/ui/card';
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
        return 'bg-red-500';
      case 'medium':
        return 'bg-orange-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleUpdate = (updatedValues: any) => {
    console.log('Updated values for risk:', risk.id, updatedValues);
    // In a real application, you would update the risk data here
  };

  return (
    <Card className="mb-4 w-full bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{risk.name}</h3>
          <div className={`w-3 h-3 rounded-full ${getRiskColor(risk.risk_level)}`}></div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-500">Q2 2025 EBITDA:</div>
            <div className="font-medium">${risk.current_ebitda.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Q2 2025 EBITDA Target:</div>
            <div className="font-medium">${risk.target_ebitda.toLocaleString()}</div>
          </div>
        </div>
      </div>
      
      <RiskAdjustmentPanel risk={risk} onUpdate={handleUpdate} />
    </Card>
  );
};

export default RiskCard;
