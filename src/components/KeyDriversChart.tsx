
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LabelList, ReferenceLine } from 'recharts';
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

  const renderCustomizedLabel = (props: any) => {
    const { x, y, width, height, value } = props;
    return (
      <text 
        x={x + width / 2} 
        y={y - 5} 
        fill="#333" 
        textAnchor="middle" 
        dominantBaseline="middle"
        fontSize={11}
      >
        {`${value}%`}
      </text>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2 bg-gray-100 border-b">
        <CardTitle className="text-lg">Key Drivers of EBITDA Target Risk</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80"> {/* Increased height */}
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
              >
                <LabelList dataKey="deviation_from_plan" content={renderCustomizedLabel} />
              </Bar>
              <Bar 
                name="Deviation from Key EBITDA targets" 
                dataKey="deviation_from_target" 
                fill="#1976d2" 
              >
                <LabelList dataKey="deviation_from_target" content={renderCustomizedLabel} />
              </Bar>
              <ReferenceLine 
                y={0} 
                stroke="#ea384c" 
                strokeWidth={2}
                strokeDasharray="3 3"
                label={{
                  value: 'Target',
                  position: 'right',
                  fill: '#ea384c'
                }} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default KeyDriversChart;
