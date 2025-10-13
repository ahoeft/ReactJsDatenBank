"use client";

import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart, BarSeries } from '@mui/x-charts/BarChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';

interface VisualizeProps {
    visualizeArray: Entry[]
}

const chartSetting = {
  xAxis: [
    {
      label: 'Amount Spent',
    },
  ],
  height: 400,
  margin: { left: 0 },
};

const size = {
  width: 200,
  height: 200,
};

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

function valueFormatter(value: number | null) {
  return `$${value}`;
}

export default function Visualize({visualizeArray}:VisualizeProps) {
  let pieData = [];
  
  let filtered = visualizeArray.filter((entry) => entry.category != 'Paychecks/Salary');
  let grouped = Object.groupBy(filtered, ({ category }) => category);

  pieData = Object.entries(grouped).map(([type, entries]) => ({
    value: entries?.reduce(
    (accumulator, entry) => accumulator + Math.abs(entry.amount), 0)!,
    label: type,
  }));

  let barData = filtered.map(entry => ({ 
      date: entry.date,
      amount: Math.abs(entry.amount),
      description: entry.description,
      category: entry.category
  }));
  

  return (
    <div>
      <PieChart series={[{ data: pieData, innerRadius: 80 }]} {...size}>
        <PieCenterLabel>Spending</PieCenterLabel>
      </PieChart>
      <BarChart
        dataset={barData}
        yAxis={[{ scaleType: 'band', dataKey: 'category', width: 200 }]}
        series={[{ dataKey: 'amount', label: 'Amount Spent', valueFormatter }]}
        layout="horizontal"
        {...chartSetting}
      />

    </div>
    
    
  );
}