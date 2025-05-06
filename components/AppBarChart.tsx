"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type DailyTotal = {
  day: string;
  total: number;
};

interface AppBarChartProps {
  dailyTotals: DailyTotal[];
}

const generateAllDates = (startDate: string, endDate: string) => {
  const dates: string[] = [];
  const currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (currentDate <= end) {
    const formattedDate = currentDate.toISOString().split("T")[0]; // "YYYY-MM-DD"
    dates.push(formattedDate);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

const AppBarChart = ({ dailyTotals }: AppBarChartProps) => {
  if (dailyTotals.length === 0) return null;

  const allDates = generateAllDates(
    dailyTotals[0]?.day,
    dailyTotals[dailyTotals.length - 1]?.day
  );

  const dailyTotalsMap: { [key: string]: number } = dailyTotals.reduce(
    (acc, { day, total }) => {
      acc[day] = total;
      return acc;
    },
    {} as { [key: string]: number }
  );

  const completeDailyTotals = allDates.map((date) => ({
    day: date,
    total: dailyTotalsMap[date] || 0,
  }));

  return (
    <div className="w-full h-[300px] bg-background dark:bg-zinc-900 border border-muted rounded-2xl shadow-sm p-4">
      <h2 className="text-base md:text-lg font-semibold text-foreground mb-4">
        Total Revenue (Daily)
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={completeDailyTotals}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 12 }}
            stroke="#94a3b8"
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            stroke="#94a3b8"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255,255,255,0.9)",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              fontSize: "14px",
            }}
            formatter={(value: number) => [`৳${value.toFixed(2)}`, "Revenue"]}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 4, fill: "#3b82f6" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AppBarChart;



