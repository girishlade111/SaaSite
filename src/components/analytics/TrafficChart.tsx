'use client';

import { Line, LineChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {
  ChartTooltip,
  ChartTooltipContent,
  ChartContainer,
} from "@/components/ui/chart"

const chartData = [
  { date: "2024-05-01", visits: 250, pageViews: 450 },
  { date: "2024-05-02", visits: 300, pageViews: 550 },
  { date: "2024-05-03", visits: 280, pageViews: 520 },
  { date: "2024-05-04", visits: 320, pageViews: 600 },
  { date: "2024-05-05", visits: 400, pageViews: 750 },
  { date: "2024-05-06", visits: 380, pageViews: 700 },
  { date: "2024-05-07", visits: 420, pageViews: 800 },
  { date: "2024-05-08", visits: 450, pageViews: 850 },
  { date: "2024-05-09", visits: 430, pageViews: 820 },
  { date: "2024-05-10", visits: 500, pageViews: 950 },
  { date: "2024-05-11", visits: 520, pageViews: 1000 },
  { date: "2024-05-12", visits: 550, pageViews: 1050 },
  { date: "2024-05-13", visits: 530, pageViews: 1020 },
  { date: "2024-05-14", visits: 580, pageViews: 1100 },
  { date: "2024-05-15", visits: 600, pageViews: 1150 },
  { date: "2024-05-16", visits: 580, pageViews: 1120 },
  { date: "2024-05-17", visits: 620, pageViews: 1200 },
  { date: "2024-05-18", visits: 650, pageViews: 1250 },
  { date: "2024-05-19", visits: 630, pageViews: 1220 },
  { date: "2024-05-20", visits: 680, pageViews: 1300 },
  { date: "2024-05-21", visits: 700, pageViews: 1350 },
  { date: "2024-05-22", visits: 680, pageViews: 1320 },
  { date: "2024-05-23", visits: 720, pageViews: 1400 },
  { date: "2024-05-24", visits: 750, pageViews: 1450 },
  { date: "2024-05-25", visits: 730, pageViews: 1420 },
  { date: "2024-05-26", visits: 780, pageViews: 1500 },
  { date: "2024-05-27", visits: 800, pageViews: 1550 },
  { date: "2024-05-28", visits: 780, pageViews: 1520 },
  { date: "2024-05-29", visits: 820, pageViews: 1600 },
  { date: "2024-05-30", visits: 850, pageViews: 1650 },
];

const chartConfig = {
  visits: {
    label: "Visits",
    color: "hsl(var(--primary))",
  },
  pageViews: {
    label: "Page Views",
    color: "hsl(var(--accent))",
  },
}

export default function TrafficChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis
            dataKey="date"
            tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { day: 'numeric' })}
            tickLine={false}
            axisLine={false}
            padding={{ left: 20, right: 20 }}
            stroke="hsl(var(--muted-foreground))"
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Line
            dataKey="visits"
            type="monotone"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={false}
          />
          <Line
            dataKey="pageViews"
            type="monotone"
            stroke="hsl(var(--accent))"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
