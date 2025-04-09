
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LabelList } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KeyDriverData } from '@/api/mockData';

interface KeyDriversChartProps {
  data: KeyDriverData[];
}

const KeyDriversChart: React.FC<KeyDriversChartProps> = ({ data }) => {
  // Transform data for recharts - using predefined categories
  const categories = ['Revenue', 'Revenue growth', 'EBITDA margin growth', 'EBITDA Margin'];
  
  // Map the data to our predefined categories (or use placeholder values if needed)
  const chartData = categories.map(category => {
    const matchingData = data.find(item => item.name === category);
    return {
      name: category,
      deviation_from_plan: matchingData?.deviation_from_plan || 0,
      deviation_from_target: matchingData?.deviation_from_target || 0,
    };
  });

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
      <CardHeader className="pb-2 bg-gray-100 border-b flex flex-row justify-between items-center">
        <CardTitle className="text-lg">Key Drivers of EBITDA Target Risk</CardTitle>
        <Legend 
          payload={[
            { value: 'Deviation from Key Revenue Streams', color: '#82ca9d' },
            { value: 'Deviation from Key EBITDA targets', color: '#1976d2' }
          ]}
          layout="horizontal"
          verticalAlign="top"
          align="right"
          wrapperStyle={{ fontSize: '0.75rem', paddingBottom: 0 }}
        />
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
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default KeyDriversChart;
