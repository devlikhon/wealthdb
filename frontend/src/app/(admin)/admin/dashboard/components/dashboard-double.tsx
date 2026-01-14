/* eslint-disable @typescript-eslint/no-explicit-any */

import "../dashboard.css";

const DashboardDouble = ({ left, right }: any) => {
  return (
    <div className="flexonehalf_margin dashboarddoublefullsection">
      <div className="contentcontainer_vmiddle">
        {[left, right].map((item, idx) => (
          <div key={idx} className="flexfullwidth">
            <div className="contentcontainer_vmiddle centercontent">
              <div className="itemtitle">{item[0]}</div>
              <h3>{item[1]}</h3>
              <div className="itemdescription">{item[2]}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default DashboardDouble;
