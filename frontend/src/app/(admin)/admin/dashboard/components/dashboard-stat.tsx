import "../dashboard.css";
import DashboardDonut from "./DashboardDonut";

interface DashboardStatProps {
  title: string;
  value?: string | number;
  desc: string;
  pieData?: { type: string; value: number }[];
}

const DashboardStat = ({ title, value, desc, pieData }: DashboardStatProps) => {
  return (
    <div className="flexonehalf_margin">
      <div className="contentcontainer_vmiddle centercontent">
        <div className="itemtitle">{title}</div>

        {pieData ? (
          <DashboardDonut data={pieData} />
        ) : (
          <h2 className="itemtitleheader">{value}</h2>
        )}

        <div className="itemdescription">{desc}</div>
      </div>
    </div>
  );
};

export default DashboardStat;

// import "../dashboard.css";

// interface DashboardStatProps {
//   title: string;
//   value: string | number;
//   desc: string;
// }

// const DashboardStat = ({ title, value, desc }: DashboardStatProps) => {
//   return (
//     <div className="flexonehalf_margin">
//       <div className="contentcontainer_vmiddle centercontent">
//         <div className="itemtitle">{title}</div>
//         <h2 className="itemtitleheader">{value}</h2>
//         <div className="itemdescription">{desc}</div>
//       </div>
//     </div>
//   );
// };

// export default DashboardStat;
