"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";

type PageData = {
  type: string;
  amount: string;
  status: string;
  created_at: string;
}[];
const chartConfig = {
  complete: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function LineChart({ pageData }: { pageData: PageData }) {
  const [chartData, setChartData] = useState<
    | null
    | {
        date: string;
        totalVolume: number;
      }[]
  >(null);
  useEffect(() => {
    if (!pageData) return;

    function sort(transactions: PageData) {
      const today = new Date();

      // Create a map for transaction sums
      const sums: any = {};

      // Group volumes by day (YYYY-MM-DD)
      transactions.forEach((tx) => {
        const day = tx.created_at.split("T")[0]; // extract YYYY-MM-DD
        sums[day] = (sums[day] || 0) + Number(tx.amount);
      });

      // Generate the last 7 days (including today)
      const result = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const dayStr = d.toISOString().split("T")[0];
        result.push({
          date: dayStr,
          totalVolume: sums[dayStr] || 0,
        });
      }
      // console.log(result);
      setChartData(result);
    }

    sort(
      pageData.filter(
        (item) => item.type === "purchase" && item.status === "succeeded"
      )
    );

    return () => {};
  }, [pageData]);

  return (
    <div className="bordser rounded-lg bg-white shasdow">
      <ChartContainer config={chartConfig}>
        <AreaChart
          accessibilityLayer
          data={chartData!}
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
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) =>
              value.split("-")[1] + "/" + value.split("-")[2]
            }
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Area
            dataKey={"totalVolume"}
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
