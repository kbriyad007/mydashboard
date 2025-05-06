"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Update AppBarChart to receive dailyTotals data
type DailyTotal = {
  day: string;
  total: number;
};

interface AppBarChartProps {
  dailyTotals: DailyTotal[];
}

const generateAllDates = (startDate: string, endDate: string) => {
  const dates = [];
  const currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (currentDate <= end) {
    const formattedDate = currentDate.toISOString().split("T")[0];  // "YYYY-MM-DD"
    dates.push(formattedDate);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

const AppBarChart = ({ dailyTotals }: AppBarChartProps) => {
  // Find the range of dates (min and max)
  const allDates = generateAllDates(
    dailyTotals[0]?.day,
    dailyTotals[dailyTotals.length - 1]?.day
  );

  // Ensure each date has a corresponding total, even if it's zero
  const dailyTotalsMap: { [key: string]: number } = dailyTotals.reduce(
    (acc, { day, total }) => {
      acc[day] = total;
      return acc;
    },
    {}
  );

  // Create a complete list of daily totals with zeroes for missing days
  const completeDailyTotals = allDates.map((date) => ({
    day: date,
    total: dailyTotalsMap[date] || 0,  // Default to 0 if no data exists for the day
  }));

  return (
    <div className="w-full h-[300px] bg-background dark:bg-zinc-900 border border-muted rounded-2xl shadow-sm p-4">
      <h2 className="text-base md:text-lg font-semibold text-foreground mb-4">
        Total Revenue (Daily)
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={completeDailyTotals} barSize={22}>
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
          />
          <Bar dataKey="totalRevenue" fill="url(#colorRevenue)" radius={[6, 6, 0, 0]} />
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.4} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AppBarChart;
