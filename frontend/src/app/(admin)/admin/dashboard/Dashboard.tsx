"use client";

import { Metadata } from "next";
import { Typography, Space, Row, Col } from "antd";
import ApplicationStatus from "./components/ApplicationStatus/ApplicationStatus";
import ApplicationTypes from "./components/ApplicationTypes/ApplicationType";
import CompletedFunds from "./components/CompletedFunds/CompletedFunds";
import DepositsWeek from "./components/DepositsWeek/DepositsWeek";

const { Title } = Typography;

export const metadata: Metadata = {
  title: "Dashboard",
};

const AdminDashboard = () => {
  return (
    <Row
      gutter={[32, 32]}
      style={{
        background: "var(--background)",
      }}
    >
      <Col xs={24} md={24}>
        <Space orientation="vertical" size="middle" style={{ width: "100%" }}>
          <Title
            level={3}
            style={{ marginBottom: 0, color: "var(--foreground)" }}
          >
            Applications
          </Title>
          <ApplicationStatus />
          <ApplicationTypes />
        </Space>
      </Col>
      <Col xs={24} md={24}>
        <Space orientation="vertical" size="middle" style={{ width: "100%" }}>
          <Title
            level={3}
            style={{ marginBottom: 0, color: "var(--foreground)" }}
          >
            Funding & Deposits
          </Title>
          <CompletedFunds />
          <DepositsWeek />
        </Space>
      </Col>
    </Row>
  );
};

export default AdminDashboard;

// "use client";

// import "./dashboard.css";
// import DashboardStat from "./components/dashboard-stat";
// import DashboardDouble from "./components/dashboard-double";
// import DashboardQuad from "./components/dashboard-quad";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Dashboard",
// };

// const AdminDashboard = () => {
//   return (
//     <div className="dashboard flexcontainer">
//       {/* Applications */}

//       <div className="boxedshadowcontainer">
//         <div className="headerfilterbar">
//           <div className="headertitle">Applications</div>
//         </div>

//         <div className="dashboardsectionholder">
//           <DashboardStat
//             title="Completed Applications"
//             value="67%"
//             desc="A total of 4 of the 6 applications have been completed"
//           />

//           <DashboardQuad
//             header="Application Status"
//             items={[
//               [
//                 "Created",
//                 "2",
//                 "0 of the 2 applications are older than 30 days",
//               ],
//               [
//                 "In progress",
//                 "-",
//                 "0 of the 0 applications are older than 30 days",
//               ],
//               ["Client completed", "-", "0 completed by client"],
//               [
//                 "Application conversion",
//                 "2",
//                 "2 of the 4 completed applicants",
//               ],
//             ]}
//           />

//           <DashboardQuad
//             header="Application Types"
//             items={[
//               ["Individual", "4", "0 used express form"],
//               ["Joint", "-", "0 used express form"],
//               ["Company", "-", "0 company applications"],
//               ["Trust", "-", "0 trusts"],
//             ]}
//           />

//           <DashboardStat
//             title="Conversion Rates"
//             value="33%"
//             desc="A total of 2 of the 6 applicants have made deposits"
//           />
//         </div>
//       </div>

//       {/* Funding & Deposits */}

//       <div className="boxedshadowcontainer">
//         <div className="headerfilterbar">
//           <div className="headertitle">Funding & Deposits</div>
//         </div>

//         <div className="dashboardsectionholder">
//           <DashboardStat
//             title="Completed Funds"
//             value="50%"
//             desc="A total of 2 of the 4 funds have been completed"
//           />

//           <DashboardQuad
//             header="Open Funding & Payments"
//             items={[
//               ["Open Funds", "2", "2 open funds"],
//               ["Open Payments", "1", "1 open payment"],
//               ["Future Payments", "-", "0 scheduled"],
//               ["Overdue Payments", "1", "1 missed payment"],
//             ]}
//           />

//           <DashboardDouble
//             left={["Deposits This Week", "-", "No payments made"]}
//             right={["Deposits This Month", "£15,000", "3 payments made"]}
//           />

//           <DashboardStat
//             title="Payments Due"
//             value="£5,000"
//             desc="£5,000 due from 1 payment"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
