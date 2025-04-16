
import React from 'react';

const RiskLegend = () => {
  return (
    <div className="flex items-center justify-center gap-6 mb-6 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <span className="text-sm text-gray-600">High Risk</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
        <span className="text-sm text-gray-600">Medium Risk</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="text-sm text-gray-600">Low Risk</span>
      </div>
    </div>
  );
};

export default RiskLegend;
