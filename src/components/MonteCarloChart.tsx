
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MonteCarloData } from '@/api/mockData';

interface MonteCarloChartProps {
  data: MonteCarloData;
}

const MonteCarloChart: React.FC<MonteCarloChartProps> = ({ data }) => {
  // Transform data for recharts
  const chartData = data.bins.map((bin, index) => ({
    name: bin.toString(),
    frequency: data.frequencies[index],
  }));

  return (
    <Card className="w-full">
      <CardHeader className="pb-2 bg-gray-100 border-b">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Monte Carlo Simulation</span>
          <span className="text-sm font-normal text-muted-foreground flex items-center">
            <span className="inline-block w-3 h-3 bg-[#ea384c] mr-2"></span>
            Target EBITDA
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 25,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                label={{ 
                  value: 'EBITDA', 
                  position: 'insideBottom', 
                  offset: -5 
                }}
              />
              <YAxis 
                label={{ 
                  value: 'Frequency', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle' }
                }}
              />
              <Tooltip />
              <Bar dataKey="frequency" fill="#1976d2" />
              <ReferenceLine 
                x={data.target_value?.toString()} 
                stroke="#ea384c" 
                strokeWidth={2}
                label={{
                  position: 'top',
                  value: 'TARGET EBITDA',
                  fill: '#ea384c',
                  fontSize: 12,
                  fontWeight: 'bold'
                }} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonteCarloChart;
