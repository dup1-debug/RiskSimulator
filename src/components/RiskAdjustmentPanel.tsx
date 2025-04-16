
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { RiskData } from '@/api/mockData';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card';
import { toast } from '@/hooks/use-toast';

interface RiskAdjustmentPanelProps {
  risk: RiskData;
  onUpdate: (updatedValues: {
    targetEbitda?: number;
    revenueGrowthMin?: number;
    revenueGrowthMax?: number;
    ebitdaMarginGrowthMin?: number;
    ebitdaMarginGrowthMax?: number;
  }) => void;
}

const RiskAdjustmentPanel: React.FC<RiskAdjustmentPanelProps> = ({ risk, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState(risk.target_ebitda);
  const [updatedRiskLevel, setUpdatedRiskLevel] = useState(risk.risk_level);
  const [isSliderApplied, setIsSliderApplied] = useState(true);
  
  // Min-Max adjustment states
  const [revenueGrowthMin, setRevenueGrowthMin] = useState(17);
  const [revenueGrowthMax, setRevenueGrowthMax] = useState(58);
  const [ebitdaMarginGrowthMin, setEbitdaMarginGrowthMin] = useState(21);
  const [ebitdaMarginGrowthMax, setEbitdaMarginGrowthMax] = useState(42);
  const [isRangeApplied, setIsRangeApplied] = useState(true);
  
  // Calculate slider min and max values (0 to 2x target)
  const minValue = 0;
  const maxValue = risk.target_ebitda * 2;
  
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
    setIsSliderApplied(false);
    updateRiskLevel(value[0]);
  };
  
  // Apply slider changes
  const applySliderChanges = () => {
    onUpdate({ targetEbitda: sliderValue });
    setIsSliderApplied(true);
    
    toast({
      title: "EBITDA Target Updated",
      description: `${risk.name} target updated to ${sliderValue.toLocaleString()}`,
    });
  };
  
  // Apply range changes
  const applyRangeChanges = () => {
    onUpdate({
      revenueGrowthMin,
      revenueGrowthMax,
      ebitdaMarginGrowthMin,
      ebitdaMarginGrowthMax
    });
    setIsRangeApplied(true);
    
    toast({
      title: "Range Parameters Updated",
      description: `${risk.name} parameters have been updated`,
    });
  };
  
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

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full border rounded-lg shadow-sm overflow-hidden"
    >
      <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <h3 className="font-medium text-lg">{risk.name}</h3>
        <div className="flex items-center gap-3">
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="cursor-help">
                <Lightbulb className="h-5 w-5 text-yellow-300 hover:text-yellow-200" />
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 bg-white shadow-lg p-4">
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Risk Adjustment Guidance</h4>
                <p className="text-sm text-gray-600">
                  Adjusting the EBITDA target affects your risk profile. The growth parameters
                  influence the Monte Carlo simulation results.
                </p>
                <p className="text-sm text-gray-600">
                  Industry average growth for this sector is approximately 8-10% YoY.
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="p-1 text-white hover:text-gray-200">
              {isOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>

      <CollapsibleContent>
        <div className="p-4 bg-white">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="ebitda-target">
              <AccordionTrigger className="py-3">EBITDA Target Adjustment</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-12 gap-4 items-center py-2">
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
                      
                      <div className="p-3 rounded-md">
                        <span className="text-xs text-gray-700 font-medium">Current Risk: </span>
                        <span className={`text-sm font-medium capitalize ${getRiskColor(risk.risk_level)}`}>
                          {risk.risk_level}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Middle column - Slider */}
                  <div className="col-span-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-100">
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
                      <div className="p-3 rounded-md w-full text-center">
                        <span className="text-xs text-gray-700 font-medium block mb-1">Updated Risk:</span>
                        <span className={`text-sm font-medium capitalize ${getRiskColor(updatedRiskLevel)}`}>
                          {updatedRiskLevel}
                        </span>
                      </div>
                      <Button 
                        onClick={applySliderChanges}
                        disabled={isSliderApplied}
                        className={`bg-gray-800 hover:bg-gray-900 w-full ${isSliderApplied ? 'opacity-50' : ''}`}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="range-adjustment">
              <AccordionTrigger className="py-3">Range Parameter Adjustment</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-6 py-2">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium text-gray-700">Current Range for Q2 2025</h4>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="text-sm font-medium"></div>
                        <div className="text-sm font-medium text-gray-600 text-center">Min</div>
                        <div className="text-sm font-medium text-gray-600 text-center">Max</div>
                        
                        <div className="text-sm font-medium text-gray-700">Revenue Growth:</div>
                        <div className="text-sm text-gray-900 text-center">17%</div>
                        <div className="text-sm text-gray-900 text-center">58%</div>
                        
                        <div className="text-sm font-medium text-gray-700">EBITDA Margin Growth:</div>
                        <div className="text-sm text-gray-900 text-center">21%</div>
                        <div className="text-sm text-gray-900 text-center">42%</div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium text-gray-700">Adjusted Range for Q2 2025</h4>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="text-sm font-medium"></div>
                        <div className="text-sm font-medium text-gray-600 text-center">Min</div>
                        <div className="text-sm font-medium text-gray-600 text-center">Max</div>
                        
                        <div className="text-sm font-medium text-gray-700">Revenue Growth:</div>
                        <div className="text-center">
                          <Input 
                            type="number" 
                            value={revenueGrowthMin}
                            onChange={(e) => {
                              setRevenueGrowthMin(Number(e.target.value));
                              setIsRangeApplied(false);
                            }}
                            className="h-8 w-20 text-center mx-auto"
                          />
                        </div>
                        <div className="text-center">
                          <Input 
                            type="number" 
                            value={revenueGrowthMax}
                            onChange={(e) => {
                              setRevenueGrowthMax(Number(e.target.value));
                              setIsRangeApplied(false);
                            }}
                            className="h-8 w-20 text-center mx-auto"
                          />
                        </div>
                        
                        <div className="text-sm font-medium text-gray-700">EBITDA Margin Growth:</div>
                        <div className="text-center">
                          <Input 
                            type="number" 
                            value={ebitdaMarginGrowthMin}
                            onChange={(e) => {
                              setEbitdaMarginGrowthMin(Number(e.target.value));
                              setIsRangeApplied(false);
                            }}
                            className="h-8 w-20 text-center mx-auto"
                          />
                        </div>
                        <div className="text-center">
                          <Input 
                            type="number" 
                            value={ebitdaMarginGrowthMax}
                            onChange={(e) => {
                              setEbitdaMarginGrowthMax(Number(e.target.value));
                              setIsRangeApplied(false);
                            }}
                            className="h-8 w-20 text-center mx-auto"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button
                      onClick={applyRangeChanges}
                      disabled={isRangeApplied}
                      className={`bg-gray-800 hover:bg-gray-900 ${isRangeApplied ? 'opacity-50' : ''}`}
                    >
                      Apply Changes
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default RiskAdjustmentPanel;
