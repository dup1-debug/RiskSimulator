
import React from 'react';
import { cn } from '@/lib/utils';
import { RiskData } from '@/api/mockData';
import { CircleFill } from '@/components/ui/icons';

interface RiskCardProps {
  risk: RiskData;
  isSelected: boolean;
  onClick: () => void;
}

const RiskCard: React.FC<RiskCardProps> = ({ risk, isSelected, onClick }) => {
  // Determine risk level color
  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-orange-500';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-500';
    }
  };

  const getBgColor = (isSelected: boolean, level: string) => {
    if (!isSelected) return 'bg-white';
    
    switch (level.toLowerCase()) {
      case 'high':
        return 'bg-red-50';
      case 'medium':
        return 'bg-orange-50';
      case 'low':
        return 'bg-green-50';
      default:
        return 'bg-blue-50';
    }
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md min-w-[240px] h-[180px] flex flex-col justify-between',
        isSelected ? 'border-blue-500 shadow-sm' : 'border-gray-200',
        getBgColor(isSelected, risk.risk_level)
      )}
    >
      <h3 className="font-medium text-center text-lg mb-2">{risk.name}</h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Q2 2025 EBITDA:</span>
          <span className="font-semibold">${risk.current_ebitda.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Q2 2025 EBITDA Target:</span>
          <span className="font-semibold">${risk.target_ebitda.toLocaleString()}</span>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-center">
        <CircleFill className={cn('h-5 w-5 mr-2', getRiskColor(risk.risk_level))} />
        <span className={cn('font-medium text-base', getRiskColor(risk.risk_level))}>
          {risk.risk_level}
        </span>
      </div>
    </div>
  );
};

export default RiskCard;
