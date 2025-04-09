
import React from 'react';
import RiskDashboard from '@/components/RiskDashboard';
import { RiskProvider } from '@/contexts/RiskContext';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <RiskProvider>
        <RiskDashboard />
      </RiskProvider>
    </div>
  );
};

export default Index;
