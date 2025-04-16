
import React from 'react';
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
  const [sliderValue, setSliderValue] = React.useState(risk.target_ebitda);
  const [revenueMin, setRevenueMin] = React.useState(17);
  const [revenueMax, setRevenueMax] = React.useState(58);
  const [marginMin, setMarginMin] = React.useState(21);
  const [marginMax, setMarginMax] = React.useState(42);

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

  const handleSliderUpdate = () => {
    toast({
      title: "EBITDA Target Updated",
      description: `${risk.name} target updated to $${sliderValue.toLocaleString()}`,
    });
  };

  const handleRangeUpdate = () => {
    toast({
      title: "Range Parameters Updated",
      description: `${risk.name} parameters have been updated`,
    });
  };

  return (
    <Card className="w-full bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="p-3 border-b">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{risk.name}</h3>
          <div className={`w-3 h-3 rounded-full ${getRiskColor(risk.risk_level)}`} />
        </div>
        
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

      {/* Adjustments Accordion */}
      <Accordion type="multiple" className="px-2 py-1">
        <AccordionItem value="target" className="border-b-0">
          <AccordionTrigger className="py-2 hover:no-underline">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">EBITDA Target Adjustment</span>
              <HoverCard>
                <HoverCardTrigger>
                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                </HoverCardTrigger>
                <HoverCardContent className="w-72">
                  <p className="text-sm text-gray-600">Adjust the EBITDA target to see how it affects risk levels.</p>
                </HoverCardContent>
              </HoverCard>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-0 pb-2">
            <div className="space-y-3">
              <Slider
                value={[sliderValue]}
                min={0}
                max={risk.target_ebitda * 2}
                step={1}
                onValueChange={(value) => setSliderValue(value[0])}
              />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">${sliderValue.toLocaleString()}</span>
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

        <AccordionItem value="range" className="border-b-0">
          <AccordionTrigger className="py-2 hover:no-underline">
            <span className="text-sm font-medium">Range Parameters</span>
          </AccordionTrigger>
          <AccordionContent className="pt-0 pb-2">
            <div className="space-y-3">
              <div className="grid grid-cols-4 gap-2 items-center text-sm">
                <div className="text-gray-500">Revenue:</div>
                <Input
                  value={revenueMin}
                  onChange={(e) => setRevenueMin(Number(e.target.value))}
                  className="h-7"
                  type="number"
                />
                <Input
                  value={revenueMax}
                  onChange={(e) => setRevenueMax(Number(e.target.value))}
                  className="h-7"
                  type="number"
                />
                <span className="text-xs text-gray-500">%</span>
              </div>
              <div className="grid grid-cols-4 gap-2 items-center text-sm">
                <div className="text-gray-500">Margin:</div>
                <Input
                  value={marginMin}
                  onChange={(e) => setMarginMin(Number(e.target.value))}
                  className="h-7"
                  type="number"
                />
                <Input
                  value={marginMax}
                  onChange={(e) => setMarginMax(Number(e.target.value))}
                  className="h-7"
                  type="number"
                />
                <span className="text-xs text-gray-500">%</span>
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
