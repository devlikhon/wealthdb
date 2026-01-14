/* eslint-disable @typescript-eslint/no-explicit-any */

import "../dashboard.css";

const DashboardQuad = ({ header, items }: any) => {
  return (
    <div className="flexonehalf_margin">
      <div className="contentcontainer_vmiddle">
        <div className="itemtitleheader">{header}</div>
        <div className="dashboardquadsection">
          {items.map((i: any, idx: number) => (
            <div key={idx} className="flexonehalf_nomargin">
              <div className="centercontent">
                <div className="itemtitle">{i[0]}</div>
                <h3>{i[1]}</h3>
                <div className="itemdescription">{i[2]}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardQuad;
