
import React, { useState } from 'react';
import { RiskData } from '@/api/mockData';
import { Card } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

interface RiskCardProps {
  risk: RiskData;
  isSelected: boolean;
  onClick: () => void;
}

const RiskCard: React.FC<RiskCardProps> = ({ risk, isSelected, onClick }) => {
  // Local state for slider and input values
  const [sliderValue, setSliderValue] = useState(risk.target_ebitda);
  const [revenueMin, setRevenueMin] = useState(17);
  const [revenueMax, setRevenueMax] = useState(58);
  const [marginMin, setMarginMin] = useState(21);
  const [marginMax, setMarginMax] = useState(42);
  const [updatedRiskLevel, setUpdatedRiskLevel] = useState(risk.risk_level);

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

  // Get risk text color
  const getRiskTextColor = (level: string) => {
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

  // Handle slider change
  const handleSliderChange = (value: number[]) => {
    setSliderValue(value[0]);
    updateRiskLevel(value[0]);
  };

  // Apply EBITDA target update
  const handleSliderUpdate = () => {
    toast({
      title: "EBITDA Target Updated",
      description: `${risk.name} target updated to $${sliderValue.toLocaleString()}`,
    });
  };

  // Apply range parameter update
  const handleRangeUpdate = () => {
    toast({
      title: "Range Parameters Updated",
      description: `${risk.name} parameters have been updated`,
    });
  };

  return (
    <Card 
      className="w-full bg-white shadow-sm hover:shadow-md transition-shadow"
      onClick={() => onClick()}
    >
      {/* Card Header */}
      <div className="p-3 border-b">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{risk.name}</h3>
          <div className={`w-3 h-3 rounded-full ${getRiskColor(risk.risk_level)}`} />
        </div>
        
        {/* Main metrics - always visible */}
        <div className="grid grid-cols-2 gap-3">
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

      {/* Accordion Sections - more compact with better UX */}
      <Accordion type="multiple" className="px-2 pt-1 pb-2">
        {/* EBITDA Target Adjustment Section */}
        <AccordionItem value="target" className="border-b-0">
          <AccordionTrigger className="py-2 hover:no-underline">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">EBITDA Target Adjustment</span>
              {/* Fixed: Properly nested HoverCard with HoverCardTrigger */}
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                </HoverCardTrigger>
                <HoverCardContent className="w-64 p-3">
                  <p className="text-xs text-gray-600">Adjust the EBITDA target to see how it affects risk levels.</p>
                </HoverCardContent>
              </HoverCard>
            </div>
          </AccordionTrigger>
          
          <AccordionContent className="pt-0 pb-2">
            <div className="flex flex-col space-y-3">
              {/* Slider with min-max labels */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">0</span>
                <Slider
                  value={[sliderValue]}
                  min={0}
                  max={risk.target_ebitda * 2}
                  step={1}
                  onValueChange={handleSliderChange}
                  className="flex-grow"
                />
                <span className="text-xs text-gray-500">{(risk.target_ebitda * 2).toLocaleString()}</span>
              </div>
              
              {/* Current value and risk indicators */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">${sliderValue.toLocaleString()}</span>
                  <span className={`text-xs ${getRiskTextColor(updatedRiskLevel)}`}>
                    ({updatedRiskLevel.toUpperCase()})
                  </span>
                </div>
                <Button 
                  size="sm" 
                  onClick={handleSliderUpdate}
                  className="h-7 bg-gray-800 hover:bg-gray-900"
                >
                  Apply
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Range Parameters Section */}
        <AccordionItem value="range" className="border-b-0">
          <AccordionTrigger className="py-2 hover:no-underline">
            <span className="text-sm font-medium">Range Parameters</span>
          </AccordionTrigger>
          
          <AccordionContent className="pt-0 pb-2">
            <div className="space-y-3">
              {/* Revenue */}
              <div className="grid grid-cols-12 gap-1 items-center text-sm">
                <div className="col-span-3 text-xs text-gray-500">Revenue:</div>
                <div className="col-span-4 text-xs text-gray-500">
                  Current: 17-58%
                </div>
                <div className="col-span-2">
                  <Input
                    value={revenueMin}
                    onChange={(e) => setRevenueMin(Number(e.target.value))}
                    className="h-6 text-xs px-1"
                    type="number"
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    value={revenueMax}
                    onChange={(e) => setRevenueMax(Number(e.target.value))}
                    className="h-6 text-xs px-1"
                    type="number"
                  />
                </div>
                <div className="col-span-1 text-xs text-gray-500">%</div>
              </div>
              
              {/* Margin */}
              <div className="grid grid-cols-12 gap-1 items-center text-sm">
                <div className="col-span-3 text-xs text-gray-500">Margin:</div>
                <div className="col-span-4 text-xs text-gray-500">
                  Current: 21-42%
                </div>
                <div className="col-span-2">
                  <Input
                    value={marginMin}
                    onChange={(e) => setMarginMin(Number(e.target.value))}
                    className="h-6 text-xs px-1"
                    type="number"
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    value={marginMax}
                    onChange={(e) => setMarginMax(Number(e.target.value))}
                    className="h-6 text-xs px-1"
                    type="number"
                  />
                </div>
                <div className="col-span-1 text-xs text-gray-500">%</div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  size="sm" 
                  onClick={handleRangeUpdate}
                  className="h-7 bg-gray-800 hover:bg-gray-900"
                >
                  Apply
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default RiskCard;
