"use client";

import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';

interface VisualizeProps {
    visualizeArray: Entry[]
}

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

export default function Visualize({visualizeArray}:VisualizeProps) {
  let data = [];
  let filtered = visualizeArray.filter((entry) => entry.category != 'Paychecks/Salary');
  let grouped = Object.groupBy(filtered, ({ category }) => category);
  

data = Object.entries(grouped).map(([type, entries]) => ({
  value: entries?.reduce(
  (accumulator, entry) => accumulator + Math.abs(entry.amount), 0)!,
  label: type,
}));

  return (
    
    <PieChart series={[{ data, innerRadius: 80 }]} {...size}>
      <PieCenterLabel>Spending</PieCenterLabel>
    </PieChart>
  );
}