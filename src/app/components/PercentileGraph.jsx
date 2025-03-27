"use client"; // Required for Next.js App Router

import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, ReferenceDot } from "recharts";

// Percentile distribution curve data
const percentileData = [
  { percentile: 0, users: 2 },
  { percentile: 10, users: 10 },
  { percentile: 20, users: 40 },
  { percentile: 30, users: 80 },
  { percentile: 40, users: 120 },
  { percentile: 50, users: 150 }, // Peak (most users)
  { percentile: 60, users: 120 },
  { percentile: 70, users: 80 },
  { percentile: 80, users: 40 },
  { percentile: 90, users: 10 },
  { percentile: 100, users: 2 },
];

// User's percentile (e.g., 72%)
const userPercentile = 72;

// Find the closest y-value for the given userPercentile
const closestPoint = percentileData.reduce((prev, curr) =>
  Math.abs(curr.percentile - userPercentile) < Math.abs(prev.percentile - userPercentile) ? curr : prev
);

export default function PercentileGraph() {
  return (
    <div className="p-6 rounded-xl shadow-lg w-full h-80">
      <h2 className="text-gray-300 text-lg font-semibold mb-4">Percentile Distribution</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={percentileData}
          margin={{ top: 10, right: 30, left: 10, bottom: 30 }} // Added more bottom margin
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="percentile" stroke="#bbb" tick={{ fill: "#ccc" }} />
          <YAxis stroke="#bbb" tick={{ fill: "#ccc" }} />
          <Tooltip contentStyle={{ backgroundColor: "#222", borderColor: "#555", color: "#fff" }} />
          
          {/* Percentile Curve */}
          <Line type="monotone" dataKey="users" stroke="#38bdf8" strokeWidth={3} dot={false} />

          {/* User's Percentile Marker */}
          <ReferenceDot x={closestPoint.percentile} y={closestPoint.users} r={6} fill="red" stroke="white" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
