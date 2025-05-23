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

type Total = {
  day: string; // e.g. '2025-05-01' or 'W1'
  total: number;
};

interface AppBarChartProps {
  dailyTotals: Total[];
}

const generateAllDates = (startDate: string, endDate: string) => {
  const dates: string[] = [];
  const currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (currentDate <= end) {
    const formatted = currentDate.toISOString().split("T")[0];
    dates.push(formatted);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

const formatDateWithOrdinal = (dateString: string) => {
  if (dateString.startsWith("W")) return dateString;

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

  const isWeekly = dailyTotals[0].day.startsWith("W");

  let completeData = dailyTotals;

  if (!isWeekly) {
    const allDates = generateAllDates(
      dailyTotals[0].day,
      dailyTotals[dailyTotals.length - 1].day
    );

    const totalsMap = dailyTotals.reduce((acc, { day, total }) => {
      acc[day] = total;
      return acc;
    }, {} as { [key: string]: number });

    completeData = allDates.map((date) => ({
      day: date,
      total: totalsMap[date] || 0,
    }));
  }

  return (
    <div className="w-full h-[300px] bg-background dark:bg-zinc-900 border border-muted rounded-2xl shadow-sm p-4">
      <h2 className="text-base md:text-lg font-semibold text-foreground mb-4">
        Total Revenue ({isWeekly ? "Weekly" : "Daily"})
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={completeData}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.08} />
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
              backgroundColor: "rgba(255,255,255,0.95)",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              fontSize: "14px",
            }}
            formatter={(value: number) => [`৳${value.toFixed(2)}`, "Revenue"]}
            labelFormatter={(label) =>
              isWeekly ? `Week: ${label}` : `Date: ${formatDateWithOrdinal(label)}`
            }
          />
          <Bar
            dataKey="total"
            fill="#3b82f6"
            radius={[4, 4, 0, 0]}
            barSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AppBarChart;
