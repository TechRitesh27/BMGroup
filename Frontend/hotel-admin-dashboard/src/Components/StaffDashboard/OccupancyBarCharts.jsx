import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
  { name: "Jan", occupancy: 75 },
  { name: "Feb", occupancy: 82 },
  { name: "Mar", occupancy: 78 },
  { name: "Apr", occupancy: 92 },
  { name: "May", occupancy: 95 },
  { name: "Jun", occupancy: 90 },
  { name: "Jul", occupancy: 88 },
  { name: "Aug", occupancy: 91 },
  { name: "Sep", occupancy: 86 },
  { name: "Oct", occupancy: 84 },
  { name: "Nov", occupancy: 87 },
  { name: "Dec", occupancy: 93 },
];

export default function OccupancyBarChart(){
  return (
    <div style={{ width: "100%", height: 220 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 10, right: 12, left: -8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize:12 }} />
          <YAxis domain={[0,100]} tick={{ fontSize:12 }} />
          <Tooltip />
          <Bar dataKey="occupancy" radius={[6,6,0,0]} barSize={18} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
