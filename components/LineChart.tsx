"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", complete: 140_000 },
  { month: "February", complete: 80_000 },
  { month: "March", complete: 120_000 },
  { month: "April", complete: 100_000 },
  { month: "May", complete: 110_000 },
  { month: "June", complete: 120_000 },
  { month: "July", complete: 140_000 },
  { month: "August", complete: 140_000 },
  { month: "September", complete: 140_000 },
  { month: "October", complete: 120_000 },
  { month: "November", complete: 140_000 },
  { month: "December", complete: 300_000 },
];

const chartConfig = {
  complete: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function LineChart() {
  return (
    <div className="bordser rounded-lg bg-white shasdow">
      <ChartContainer config={chartConfig}>
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{ left: 20, top: 40, right: 20, bottom: 10 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4CAF50" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} strokeDasharray={"10 10"} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Area
            dataKey={"complete"}
            type="natural"
            fill="url(#colorUv)"
            fillOpacity={0.5}
            stroke="#4CAF50"
            strokeWidth={2}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
