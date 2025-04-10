
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { CircleFill } from '@/components/ui/icons';
import { RiskData } from '@/api/mockData';
import { Lightbulb } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { 
  HoverCard, 
  HoverCardContent, 
  HoverCardTrigger 
} from '@/components/ui/hover-card';

// Format number to K, M, etc.
const formatNumber = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
};

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

  // Get risk level circle color (for the filled circles)
  const getRiskCircleColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high':
        return '#EF4444'; // red-500
      case 'medium':
        return '#F97316'; // orange-500
      case 'low':
        return '#22C55E'; // green-500
      default:
        return '#6B7280'; // gray-500
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
      description: `${risk.name} target updated to ${formatNumber(sliderValue)}`,
    });
  };

  return (
    <Card className="overflow-hidden shadow-sm border-gray-200">
      {/* Card Header with gradient background */}
      <div className="bg-gradient-to-r from-teal-400 to-teal-300 p-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg text-white">{risk.name}</h3>
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="cursor-help">
                <Lightbulb className="h-5 w-5 text-yellow-300" />
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-2">
                <h4 className="font-medium">EBITDA Target Guidance</h4>
                <p className="text-sm text-muted-foreground">
                  Adjusting your EBITDA target affects your risk profile. Higher targets increase risk, 
                  while lower targets reduce risk but may impact growth projections.
                </p>
                <p className="text-sm text-muted-foreground">
                  The current market average growth for this sector is approximately 8-10% YoY.
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
      
      {/* Card Body */}
      <div className="p-4">
        <div className="grid grid-cols-12 gap-4 items-center">
          {/* Left column - Current values */}
          <div className="col-span-3">
            <div className="space-y-2">
              <div>
                <div className="text-xs text-gray-500">EBITDA Q1 2025:</div>
                <div className="font-medium">{formatNumber(risk.current_ebitda)}</div>
              </div>
              
              <div>
                <div className="text-xs text-gray-500">EBITDA Target Q2 2025:</div>
                <div className="font-medium">{formatNumber(risk.target_ebitda)}</div>
              </div>
              
              <div className="flex items-center mt-2 gap-1.5">
                <span className="text-xs text-gray-500">Current Risk:</span>
                <div 
                  className="h-4 w-4 rounded-full" 
                  style={{ backgroundColor: getRiskCircleColor(risk.risk_level) }}
                ></div>
                <span className="text-xs capitalize">{risk.risk_level}</span>
              </div>
            </div>
          </div>
          
          {/* Middle column - Slider */}
          <div className="col-span-6">
            <div>
              <div className="text-xs text-gray-600 mb-2 font-medium">
                Adjust EBITDA Target for Q2 2025:
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium">{formatNumber(minValue)}</span>
                <div className="flex-grow">
                  <Slider
                    value={[sliderValue]}
                    min={minValue}
                    max={maxValue}
                    step={Math.max(50000, risk.target_ebitda / 200)}
                    onValueChange={handleSliderChange}
                  />
                </div>
                <span className="text-xs font-medium">{formatNumber(maxValue)}</span>
              </div>
              <div className="text-center mt-1">
                <span className="text-sm font-medium text-purple-700">
                  {formatNumber(sliderValue)}
                </span>
              </div>
            </div>
          </div>
          
          {/* Right column - Updated risk & Apply button */}
          <div className="col-span-3">
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-gray-500">Updated Risk:</span>
                <div 
                  className="h-4 w-4 rounded-full" 
                  style={{ backgroundColor: getRiskCircleColor(updatedRiskLevel) }}
                ></div>
                <span className="text-xs capitalize">{updatedRiskLevel}</span>
              </div>
              <Button 
                size="sm"
                onClick={applyChanges}
                disabled={isApplied}
                className={`bg-purple-600 hover:bg-purple-700 w-full ${isApplied ? 'opacity-50' : ''}`}
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
