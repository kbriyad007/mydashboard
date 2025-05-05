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

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
  { month: "July", desktop: 314, mobile: 240 },
  { month: "August", desktop: 500, mobile: 340 },
  { month: "September", desktop: 314, mobile: 240 },
  { month: "October", desktop: 414, mobile: 240 },
];

const AppBarChart = () => {
  return (
    <div className="w-full h-[300px] bg-zinc-50 dark:bg-zinc-900 border border-muted rounded-2xl shadow-md p-4">
      <h2 className="text-base md:text-lg font-semibold text-foreground mb-4">
        Total Revenue
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} barSize={22}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
          <XAxis
            dataKey="month"
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
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              fontSize: "14px",
            }}
          />
          <Bar dataKey="desktop" fill="url(#colorDesktop)" radius={[6, 6, 0, 0]} />
          <Bar dataKey="mobile" fill="url(#colorMobile)" radius={[6, 6, 0, 0]} />
          <defs>
            <linearGradient id="colorDesktop" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.4} />
            </linearGradient>
            <linearGradient id="colorMobile" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.4} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AppBarChart;

