"use client";

import { Pie } from "@ant-design/plots";

interface DashboardDonutProps {
  data: { type: string; value: number }[];
  height?: number;
}

const DashboardDonut = ({ data, height = 140 }: DashboardDonutProps) => {
  const config = {
    data,
    angleField: "value",
    colorField: "type",
    innerRadius: 0.65, // donut style like your screenshot
    radius: 0.9,
    legend: false,
    label: false,
    height,
    interactions: [{ type: "element-active" }],
  };

  return <Pie {...config} />;
};

export default DashboardDonut;
