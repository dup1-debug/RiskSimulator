
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KpiData } from '@/api/mockData';

interface KpiTableProps {
  data: KpiData[];
}

const KpiTable: React.FC<KpiTableProps> = ({ data }) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2 bg-blue-700 text-white">
        <CardTitle className="text-lg text-center">KPIs Ranges used for Simulation</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table className="border-collapse">
            <TableHeader>
              <TableRow className="bg-gray-100 border-b border-gray-300">
                <TableHead className="w-1/5 border-r border-gray-300 font-bold text-black">KPIs</TableHead>
                <TableHead colSpan={2} className="text-center border-r border-gray-300 font-bold text-black">
                  Values for Q1 2025
                </TableHead>
                <TableHead colSpan={2} className="text-center font-bold text-black">
                  Simulation range for Q2 2025
                </TableHead>
              </TableRow>
              <TableRow className="bg-gray-50 border-b border-gray-300">
                <TableHead className="border-r border-gray-300"></TableHead>
                <TableHead className="border-r border-gray-300 text-black">Dubai Holdings</TableHead>
                <TableHead className="border-r border-gray-300 text-black">Industry Average</TableHead>
                <TableHead className="border-r border-gray-300 text-black">Minimum Value</TableHead>
                <TableHead className="text-black">Maximum Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((kpi, index) => (
                <TableRow key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <TableCell className="font-medium border-r border-gray-200">{kpi.name}</TableCell>
                  <TableCell className="text-right border-r border-gray-200">{kpi.dubai_holdings}</TableCell>
                  <TableCell className="text-right border-r border-gray-200">{kpi.industry_average}</TableCell>
                  <TableCell className="text-right border-r border-gray-200">{kpi.minimum_value}</TableCell>
                  <TableCell className="text-right">{kpi.maximum_value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default KpiTable;
