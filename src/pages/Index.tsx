
import React from 'react';
import { Link } from 'react-router-dom';
import RiskDashboard from '@/components/RiskDashboard';
import { RiskProvider } from '@/contexts/RiskContext';
import { Button } from '@/components/ui/button';
import { Sliders } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="container mx-auto px-4 mb-6 flex justify-end">
        <Link to="/simulator">
          <Button variant="outline" className="flex items-center gap-2">
            <Sliders className="h-4 w-4" />
            <span>EBITDA Simulator</span>
          </Button>
        </Link>
      </div>
      <RiskProvider>
        <RiskDashboard />
      </RiskProvider>
    </div>
  );
};

export default Index;
