
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { CircleFill } from '@/components/ui/icons';
import { RiskData } from '@/api/mockData';
import { Lightbulb } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface EbitdaAdjustmentCardProps {
  risk: RiskData;
  adjustedValue: number;
  onAdjustment: (value: number) => void;
}

const EbitdaAdjustmentCard: React.FC<EbitdaAdjustmentCardProps> = ({ 
  risk, 
  adjustedValue,
  onAdjustment 
}) => {
  const [sliderValue, setSliderValue] = useState(adjustedValue);
  const [updatedRiskLevel, setUpdatedRiskLevel] = useState(risk.risk_level);
  
  // Get risk level color
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

  const getBgColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high':
        return 'bg-red-100';
      case 'medium':
        return 'bg-yellow-100';
      case 'low':
        return 'bg-green-100';
      default:
        return 'bg-blue-50';
    }
  };
  
  // Calculate min and max values for the slider
  const minValue = Math.max(risk.current_ebitda * 0.8, 1000000);  // 80% of current or minimum 1M
  const maxValue = risk.current_ebitda * 1.5;  // 150% of current
  
  // Handle slider change
  const handleSliderChange = (value: number[]) => {
    setSliderValue(value[0]);
  };
  
  // Apply changes
  const applyChanges = () => {
    // In a real app, this would call an API to update the target
    onAdjustment(sliderValue);
    
    // Simulate risk level change based on slider position
    const ratio = (sliderValue - risk.current_ebitda) / risk.current_ebitda;
    let newRiskLevel;
    
    if (ratio > 0.2) {
      newRiskLevel = 'high';
    } else if (ratio > 0.1) {
      newRiskLevel = 'medium';
    } else {
      newRiskLevel = 'low';
    }
    
    setUpdatedRiskLevel(newRiskLevel);
    
    // Show toast notification
    toast({
      title: "EBITDA Target Updated",
      description: `${risk.name} target updated to $${sliderValue.toLocaleString()}`,
    });
  };

  return (
    <Card className={`p-4 shadow-sm overflow-hidden ${getBgColor(risk.risk_level)}`}>
      <div className="font-semibold text-lg mb-4 flex items-center justify-between">
        <span>{risk.name}</span>
        <Lightbulb className="h-5 w-5 text-amber-500" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-3">
          <div className="text-sm text-gray-600">EBITDA Q1 2025:</div>
          <div className="font-semibold">${risk.current_ebitda.toLocaleString()}</div>
          
          <div className="text-sm text-gray-600 mt-2">EBITDA Target Q2 2025:</div>
          <div className="font-semibold">${risk.target_ebitda.toLocaleString()}</div>
        </div>
        
        <div className="flex items-center md:col-span-1 justify-center">
          <div className="flex items-center">
            <span className="mr-1">Risk:</span>
            <CircleFill className={`h-5 w-5 ${getRiskColor(risk.risk_level)}`} />
          </div>
        </div>
        
        <div className="md:col-span-6">
          <div className="text-sm mb-2">
            Adjust EBITDA Target for Q2 2025:
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs">$M</span>
            <Slider
              value={[sliderValue]}
              min={minValue}
              max={maxValue}
              step={100000}
              onValueChange={handleSliderChange}
              className="flex-grow"
            />
            <span className="text-xs">${(maxValue / 1000000).toFixed(1)}M</span>
          </div>
          <div className="text-right text-xs text-gray-500 mt-1">
            ${(sliderValue / 1000000).toFixed(1)}M
          </div>
        </div>
        
        <div className="md:col-span-2">
          <div className="flex items-center">
            <span className="mr-1 whitespace-nowrap text-sm">Updated Risk:</span>
            <CircleFill className={`h-5 w-5 ${getRiskColor(updatedRiskLevel)}`} />
          </div>
          <Button 
            size="sm" 
            className="mt-2 w-full"
            onClick={applyChanges}
          >
            Apply
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default EbitdaAdjustmentCard;
