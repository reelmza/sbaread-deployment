"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

let chartData = [
  { transaction: "successful", count: 200, fill: "#4CAF50" },
  { transaction: "refunded", count: 50, fill: "#FFA000" },
  { transaction: "failed", count: 45, fill: "#D32F2F" },
];

type PageData = {
  status: string;
}[];

const chartConfig = {
  count: {
    label: "Transaction",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function PieChartX({ pageData }: { pageData: PageData }) {
  const [chartData, setChartData] = React.useState([
    { transaction: "successful", count: 0, fill: "#4CAF50" },
    { transaction: "pending", count: 0, fill: "#FFA000" },
    { transaction: "failed", count: 0, fill: "#D32F2F" },
  ]);

  React.useEffect(() => {
    if (!pageData) return;
    const succeeded = pageData.filter((item) => item.status === "succeeded");
    const pending = pageData.filter((item) => item.status === "pending");
    const failed = pageData.filter((item) => item.status === "failed");

    setChartData([
      { transaction: "successful", count: succeeded.length, fill: "#4CAF50" },
      { transaction: "pending", count: pending.length, fill: "#FFA000" },
      { transaction: "failed", count: failed.length, fill: "#D32F2F" },
    ]);

    console.log(succeeded.length);
    return () => {};
  }, [pageData]);

  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[180px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="transaction"
              innerRadius={50}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {pageData.length}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground tracking-tight"
                        >
                          Transactions
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#4CAF50]"></div>
          <div className="text-sm">
            Successful transactions {chartData[0].count}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#FFA000]"></div>
          <div className="text-sm">
            Pending transactions {chartData[1].count}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#D32F2F]"></div>
          <div className="text-sm">
            Failed transactions {chartData[2].count}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
