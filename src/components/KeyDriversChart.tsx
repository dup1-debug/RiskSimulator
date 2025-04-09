
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LabelList } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KeyDriverData } from '@/api/mockData';

interface KeyDriversChartProps {
  data: KeyDriverData[];
}

const KeyDriversChart: React.FC<KeyDriversChartProps> = ({ data }) => {
  // Transform data for recharts - ensure all four categories are present
  const categories = ['Revenue', 'Revenue Growth', 'EBITDA Margin Growth', 'EBITDA Margin'];
  
  // Map the data to our predefined categories
  const chartData = categories.map(category => {
    // Find the matching data item, case-insensitive comparison to handle different casing
    const matchingData = data.find(item => 
      item.name.toLowerCase() === category.toLowerCase());
    
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
        y={value > 0 ? y - 5 : y + 15} // Adjust position based on value
        fill="#333" 
        textAnchor="middle" 
        dominantBaseline="middle"
        fontSize={11}
        fontWeight="bold"
      >
        {`${value}%`}
      </text>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2 bg-gray-100 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Key Drivers of EBITDA Target Risk</CardTitle>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-[#82ca9d] mr-2"></span>
              <span>Deviation from Avg Revenue Growth</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-[#1976d2] mr-2"></span>
              <span>Deviation from Avg EBITDA Margin</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 30,
                right: 30,
                left: 20,
                bottom: 25,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                label={{ 
                  value: 'Percentage (%)', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle' }
                }}
                tickCount={7}
                domain={[0, 'dataMax + 3']}
              />
              <Tooltip formatter={(value) => [`${value}%`, '']} />
              <Bar 
                name="Deviation from Avg Revenue Growth" 
                dataKey="deviation_from_plan" 
                fill="#82ca9d" 
                barSize={35}
              >
                <LabelList dataKey="deviation_from_plan" content={renderCustomizedLabel} />
              </Bar>
              <Bar 
                name="Deviation from Avg EBITDA Margin" 
                dataKey="deviation_from_target" 
                fill="#1976d2" 
                barSize={35}
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
