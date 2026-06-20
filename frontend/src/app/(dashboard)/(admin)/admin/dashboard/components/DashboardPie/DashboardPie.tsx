/* eslint-disable @typescript-eslint/no-explicit-any */
import { G2, Pie } from "@ant-design/plots";
import { fill } from "lodash";
import React from "react";

interface PieItem {
  type: string;
  value: number;
}

interface DashboardPieProps {
  data: PieItem[];
  height?: number;
  title?: string;
  desc?: string;
}

function customPalette() {
  return ["#2c82be", "#12213c", "#89CFF0", "#54595f", "#ffffffe3"];
}

G2.register("palette.custom", customPalette);

const DashboardPie: React.FC<DashboardPieProps> = ({
  data,
  height = 400,
  title,
}) => {
  const config = {
    data,
    angleField: "value",
    colorField: "type",

    height,
    innerRadius: 0.6,
    tooltip: {
      items: [
        (datum: any) => ({
          name: datum.type,
          value: `£${datum.value.toLocaleString()}`,
        }),
      ],
    },
    label: {
      text: "value",
      style: {
        fontWeight: "bold",
        fill: "#ffffffe3",
      },
    },
    legend: false,
    // legend: {
    //   color: {
    //     title: false,
    //     position: "bottom",
    //     rowPadding: 5,
    //     layout: {
    //       justifyContent: "center",
    //       fill: "#ffffffe3 !important",
    //     },
    //   },
    // },
    scale: {
      color: {
        palette: "custom",
        fill: "#ffffffe3",
        color: "#ffffffe3",
      },
    },

    annotations: [
      {
        type: "text",
        style: {
          text: title,
          x: "50%",
          y: "50%",
          textAlign: "center",
          fontSize: 16,
          fontStyle: "bold",
          fill: "#ffffffe3",
        },
      },
    ],
  };

  return <Pie {...config} />;
};

export default DashboardPie;

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Pie } from "@ant-design/plots";
// import React from "react";

// interface PieItem {
//   type: string;
//   value: number;
// }

// interface DashboardPieProps {
//   data: PieItem[];
//   height?: number;
//   title?: string;
//   desc?: string;
// }

// const DashboardPie: React.FC<DashboardPieProps> = ({
//   data,
//   height = 400,
//   title,
// }) => {
//   const config = {
//     data,
//     angleField: "value",
//     colorField: "type",
//     height,
//     innerRadius: 0.6,
//     tooltip: {
//       items: [(datum: any) => ({ name: datum.type, value: datum.value })],
//     },
//     label: {
//       text: "value",
//       style: {
//         fontWeight: "bold",
//       },
//     },
//     legend: {
//       position: "bottom", // top or bottom
//       layout: "horizontal", // important for horizontal centering
//       align: "center", // center it horizontally
//       itemSpacing: 5,
//       color: {
//         title: false,
//         // position: "bottom",
//         // rowPadding: 5,
//         layout: "horizontal", // important for horizontal centering
//         align: "center", // center it horizontally
//       },
//     },
//     annotations: [
//       {
//         type: "text",
//         style: {
//           text: title?.replace(/\n/g, " "),
//           x: "50%",
//           y: "50%",
//           textAlign: "center",
//           fontSize: 16,
//           fontStyle: "bold",
//         },
//       },
//     ],
//   };

//   return <Pie {...config} />;
// };

// export default DashboardPie;

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Pie } from "@ant-design/plots";

// interface PieItem {
//   type: string;
//   value: number;
// }

// interface DashboardPieProps {
//   data: PieItem[];
//   height?: number;
//   title?: string;
//   desc?: string;
// }

// const DashboardPie: React.FC<DashboardPieProps> = ({
//   data,
//   height = 400,
//   title,
//   desc,
// }) => {
//   const config = {
//     data,
//     angleField: "value",
//     colorField: "type",
//     height,
//     innerRadius: 0.6,
//     tooltip: {
//       items: [(datum: any) => ({ name: datum.type, value: datum.value })],
//     },
//     label: {
//       text: "value",
//       style: {
//         fontWeight: "bold",
//       },
//     },
//     legend: {
//       color: {
//         title: false,
//         position: "right",
//         rowPadding: 5,
//       },
//     },
//     annotations: [
//       {
//         type: "text",
//         style: {
//           text: title?.replace(/\n/g, "<br>"),
//           x: "50%",
//           y: "50%",
//           textAlign: "center",
//           fontSize: 20,
//           fontStyle: "bold",
//         },
//       },
//     ],
//   };
//   return <Pie {...config} />;
// };

// export default DashboardPie;

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Pie } from "@ant-design/plots";

// interface PieItem {
//   type: string;
//   value: number;
// }

// interface DashboardPieProps {
//   data: PieItem[];
//   height?: number;
// }

// const DashboardPie = ({ data, height = 260 }: DashboardPieProps) => {
//   // Map each type to a specific color
//   const colorMap: Record<string, string> = {
//     Created: "#ff4d4f",
//     "In progress": "#ffc53d",
//     "Client completed": "#36cfc9",
//     "Application conversion": "#ffa940",
//     // add more types/colors as needed
//   };

//   const colors = data.map((item) => colorMap[item.type] || "#9254de");

//   const config = {
//     data,
//     angleField: "value",
//     colorField: "type",
//     color: colors, // <-- pass array instead of callback
//     innerRadius: 0.65,
//     height,
//     legend: { position: "bottom" as const },
//     interactions: [{ type: "element-active" }],
//     tooltip: {
//       items: [(datum: any) => ({ name: datum.type, value: datum.value })],
//     },
//     label: false,
//     autoFit: true,
//   };

//   return <Pie {...config} />;
// };

// export default DashboardPie;

// /* DashboardPie.tsx */
// "use client";

// import "../dashboard.css";
// import { Pie } from "@ant-design/plots";

// interface DashboardPieProps {
//   title: string;
//   desc: string;
//   data: { type: string; value: number }[];
//   height?: number;
// }

// const DashboardPie = ({
//   title,
//   desc,
//   data,
//   height = 120,
// }: DashboardPieProps) => {
//   const config = {
//     appendPadding: 10,
//     data,
//     angleField: "value",
//     colorField: "type",
//     radius: 0.8,
//     label: {
//       type: "inner",
//       content: "{value}",
//       style: {
//         fontSize: 12,
//         textAlign: "center",
//       },
//     },
//     height,
//   };

//   return (
//     <div className="flexonehalf_margin">
//       <div className="contentcontainer_vmiddle centercontent">
//         <div className="itemtitle">{title}</div>
//         <Pie {...config} />
//         <div className="itemdescription">{desc}</div>
//       </div>
//     </div>
//   );
// };

// export default DashboardPie;
