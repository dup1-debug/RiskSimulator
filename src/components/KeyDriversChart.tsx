
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KeyDriverData } from '@/api/mockData';

interface KeyDriversChartProps {
  data: KeyDriverData[];
}

const KeyDriversChart: React.FC<KeyDriversChartProps> = ({ data }) => {
  // Transform data for recharts
  const chartData = data.map(driver => ({
    name: driver.name,
    deviation_from_plan: driver.deviation_from_plan,
    deviation_from_target: driver.deviation_from_target,
  }));

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Key Drivers of EBITDA Target Risk</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 25,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis 
                label={{ 
                  value: 'Percentage (%)', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle' }
                }}
              />
              <Tooltip />
              <Legend />
              <Bar 
                name="Deviation from Key Revenue Streams" 
                dataKey="deviation_from_plan" 
                fill="#82ca9d" 
              />
              <Bar 
                name="Deviation from Key EBITDA targets" 
                dataKey="deviation_from_target" 
                fill="#1976d2" 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default KeyDriversChart;
