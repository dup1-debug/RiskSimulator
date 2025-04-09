
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
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">KPIs Ranges used for Simulation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>KPIs</TableHead>
                <TableHead>Dubai Holdings</TableHead>
                <TableHead>Industry Average</TableHead>
                <TableHead>Minimum Value</TableHead>
                <TableHead>Maximum Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((kpi, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{kpi.name}</TableCell>
                  <TableCell>{kpi.dubai_holdings}</TableCell>
                  <TableCell>{kpi.industry_average}</TableCell>
                  <TableCell>{kpi.minimum_value}</TableCell>
                  <TableCell>{kpi.maximum_value}</TableCell>
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
