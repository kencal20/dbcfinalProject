// SuperUserPieChart.js
import React from "react";
import { PieChart, Pie, Tooltip } from "recharts";

export default function SuperUserPieChart({ data01 }) {
  return (
    <PieChart width={1000} height={400}>
      <Pie
        data={data01}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={130}
        fill="#8884d8"
      ></Pie>
      <Tooltip />
    </PieChart>
  );
}


