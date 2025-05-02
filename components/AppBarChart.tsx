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
    <div className="w-full h-[300px] bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Total Revenue</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="desktop" fill="#2563eb" radius={[4, 4, 0, 0]} />
          <Bar dataKey="mobile" fill="#60a5fa" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AppBarChart;
