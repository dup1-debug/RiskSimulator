
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { CircleFill } from '@/components/ui/icons';
import { RiskData } from '@/api/mockData';
import { Lightbulb } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

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
  
  useEffect(() => {
    // Update slider value when adjustedValue changes
    setSliderValue(adjustedValue);
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

  // Calculate min and max values for the slider (0 to 2x target)
  const minValue = 0;  
  const maxValue = risk.target_ebitda * 2;
  
  // Handle slider change
  const handleSliderChange = (value: number[]) => {
    setSliderValue(value[0]);
    
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
    
    // Show toast notification
    toast({
      title: "EBITDA Target Updated",
      description: `${risk.name} target updated to ${formatNumber(sliderValue)}`,
    });
  };

  return (
    <Card className="p-5 shadow-sm border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <span className="font-semibold text-lg">{risk.name}</span>
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="cursor-help">
              <Lightbulb className="h-5 w-5 text-amber-500" />
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
      
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-3">
          <div className="space-y-2">
            <div>
              <div className="text-xs text-gray-500">Current EBITDA:</div>
              <div className="font-medium">{formatNumber(risk.current_ebitda)}</div>
            </div>
            
            <div>
              <div className="text-xs text-gray-500">Target EBITDA:</div>
              <div className="font-medium">{formatNumber(risk.target_ebitda)}</div>
            </div>
          </div>
        </div>
        
        <div className="col-span-7">
          <div>
            <div className="text-xs text-gray-600 mb-2">
              Adjust EBITDA Target:
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium">{formatNumber(minValue)}</span>
              <div className="flex-grow">
                <Slider
                  value={[sliderValue]}
                  min={minValue}
                  max={maxValue}
                  step={Math.max(100000, risk.target_ebitda / 100)}
                  onValueChange={handleSliderChange}
                />
              </div>
              <span className="text-xs font-medium">{formatNumber(maxValue)}</span>
            </div>
            <div className="text-center mt-1">
              <span className="text-sm font-medium text-purple-600">
                {formatNumber(sliderValue)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="col-span-2">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="text-xs">Risk:</span>
              <CircleFill className={`h-4 w-4 ${getRiskColor(updatedRiskLevel)}`} />
              <span className="text-xs capitalize">{updatedRiskLevel}</span>
            </div>
            <Button 
              size="sm"
              onClick={applyChanges}
              className="bg-purple-600 hover:bg-purple-700 w-full"
            >
              Apply
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EbitdaAdjustmentCard;
