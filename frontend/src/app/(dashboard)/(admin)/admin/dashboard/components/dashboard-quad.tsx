import "../dashboard.css";
import DashboardDonut from "./DashboardDonut";

interface QuadItem {
  title: string;
  value: string;
  desc: string;
}

interface DashboardQuadProps {
  header: string;
  items: QuadItem[];
  pieData?: { type: string; value: number }[];
}

const DashboardQuad = ({ header, items, pieData }: DashboardQuadProps) => {
  return (
    <div className="flexonehalf_margin">
      <div className="contentcontainer_vmiddle">
        <div className="itemtitleheader">{header}</div>

        {/* 🔥 Single Pie Chart */}
        {pieData && (
          <div style={{ margin: "20px 0" }}>
            <DashboardDonut data={pieData} height={220} />
          </div>
        )}

        {/* Text Stats */}
        <div className="dashboardquadsection">
          {items.map((item, idx) => (
            <div key={idx} className="flexonehalf_nomargin">
              <div className="centercontent">
                <div className="itemtitle">{item.title}</div>
                <h3>{item.value}</h3>
                <div className="itemdescription">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardQuad;

// /* eslint-disable @typescript-eslint/no-explicit-any */

// import "../dashboard.css";

// const DashboardQuad = ({ header, items }: any) => {
//   return (
//     <div className="flexonehalf_margin">
//       <div className="contentcontainer_vmiddle">
//         <div className="itemtitleheader">{header}</div>
//         <div className="dashboardquadsection">
//           {items.map((i: any, idx: number) => (
//             <div key={idx} className="flexonehalf_nomargin">
//               <div className="centercontent">
//                 <div className="itemtitle">{i[0]}</div>
//                 <h3>{i[1]}</h3>
//                 <div className="itemdescription">{i[2]}</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardQuad;
