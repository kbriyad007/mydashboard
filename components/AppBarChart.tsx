"use client";

import {
  AreaChart,
  Area,
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
    const formattedDate = currentDate.toISOString().split("T")[0];
    dates.push(formattedDate);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

// Format to "1st May"
const formatDateWithOrdinal = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });

  const getOrdinal = (n: number) => {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  return `${day}${getOrdinal(day)} ${month}`;
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
        <AreaChart data={completeDailyTotals}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
          <XAxis
            dataKey="day"
            tickFormatter={formatDateWithOrdinal}
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
            labelFormatter={(label) => `Date: ${formatDateWithOrdinal(label)}`}
          />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#3b82f6"
            fill="url(#colorRevenue)"
            strokeWidth={3}
            dot={false}
            activeDot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AppBarChart;
