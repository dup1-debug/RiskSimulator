
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { RiskData } from '@/api/mockData';
import { Lightbulb } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { 
  HoverCard, 
  HoverCardContent, 
  HoverCardTrigger 
} from '@/components/ui/hover-card';

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
  const [isApplied, setIsApplied] = useState(true);
  
  useEffect(() => {
    // Update slider value when adjustedValue changes
    setSliderValue(adjustedValue);
    setIsApplied(true);
  }, [adjustedValue]);
  
  // Get risk level color
  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-orange-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  // Get risk level background color
  const getRiskBgColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high':
        return 'bg-red-100';
      case 'medium':
        return 'bg-orange-100';
      case 'low':
        return 'bg-green-100';
      default:
        return 'bg-gray-100';
    }
  };
  
  // Calculate min and max values for the slider (0 to 2x target)
  const minValue = 0;  
  const maxValue = risk.target_ebitda * 2;
  
  // Handle slider change
  const handleSliderChange = (value: number[]) => {
    setSliderValue(value[0]);
    setIsApplied(false);
    
    // Calculate risk level in real time as slider moves
    updateRiskLevel(value[0]);
  };
  
  // Update risk level based on slider position
  const updateRiskLevel = (value: number) => {
    const ratio = value / risk.target_ebitda;
    let newRiskLevel;
    
    if (ratio < 0.8) {
      newRiskLevel = 'high';
    } else if (ratio < 0.95) {
      newRiskLevel = 'medium';
    } else {
      newRiskLevel = 'low';
    }
    
    setUpdatedRiskLevel(newRiskLevel);
  };
  
  // Apply changes
  const applyChanges = () => {
    onAdjustment(sliderValue);
    setIsApplied(true);
    
    // Show toast notification
    toast({
      title: "EBITDA Target Updated",
      description: `${risk.name} target updated to ${sliderValue.toLocaleString()}`,
    });
  };

  return (
    <Card className="overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
      {/* Card Header with gradient background */}
      <div className="bg-gray-800 p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg text-white">{risk.name}</h3>
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="cursor-help">
                <Lightbulb className="h-5 w-5 text-yellow-400 hover:text-yellow-300" />
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 bg-white shadow-lg p-4">
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">EBITDA Target Guidance</h4>
                <p className="text-sm text-gray-600">
                  Adjusting your EBITDA target affects your risk profile. Higher targets increase risk, 
                  while lower targets reduce risk but may impact growth projections.
                </p>
                <p className="text-sm text-gray-600">
                  The current market average growth for this sector is approximately 8-10% YoY.
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
      
      {/* Card Body */}
      <div className="p-5">
        <div className="grid grid-cols-12 gap-6 items-center">
          {/* Left column - Current values */}
          <div className="col-span-3">
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-md shadow-sm">
                <div className="text-xs text-gray-500 font-medium">EBITDA Q1 2025:</div>
                <div className="font-medium text-gray-900">{risk.current_ebitda.toLocaleString()}</div>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-md shadow-sm">
                <div className="text-xs text-gray-500 font-medium">EBITDA Target Q2 2025:</div>
                <div className="font-medium text-gray-900">{risk.target_ebitda.toLocaleString()}</div>
              </div>
              
              <div className="p-3 rounded-md flex items-center gap-2" style={{ backgroundColor: getRiskBgColor(risk.risk_level) }}>
                <span className="text-xs text-gray-700 font-medium">Current Risk:</span>
                <span className={`text-sm font-medium capitalize ${getRiskColor(risk.risk_level)}`}>
                  {risk.risk_level}
                </span>
              </div>
            </div>
          </div>
          
          {/* Middle column - Slider */}
          <div className="col-span-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="text-sm text-gray-700 mb-3 font-medium">
                Adjust EBITDA Target for Q2 2025:
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-500">{minValue.toLocaleString()}</span>
                <div className="flex-grow">
                  <Slider
                    value={[sliderValue]}
                    min={minValue}
                    max={maxValue}
                    step={1}
                    onValueChange={handleSliderChange}
                  />
                </div>
                <span className="text-xs font-medium text-gray-500">{maxValue.toLocaleString()}</span>
              </div>
              <div className="text-center mt-3">
                <span className="text-base font-bold text-gray-800 bg-gray-100 px-3 py-1 rounded-full">
                  {sliderValue.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          
          {/* Right column - Updated risk & Apply button */}
          <div className="col-span-3">
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 rounded-md w-full text-center" style={{ backgroundColor: getRiskBgColor(updatedRiskLevel) }}>
                <span className="text-xs text-gray-700 font-medium block mb-1">Updated Risk:</span>
                <span className={`text-sm font-medium capitalize ${getRiskColor(updatedRiskLevel)}`}>
                  {updatedRiskLevel}
                </span>
              </div>
              <Button 
                onClick={applyChanges}
                disabled={isApplied}
                className={`bg-gray-800 hover:bg-gray-900 w-full ${isApplied ? 'opacity-50' : ''}`}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EbitdaAdjustmentCard;
