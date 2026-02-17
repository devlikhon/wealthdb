// ApplicationsDashboard.tsx
import { Row, Col } from "antd";
import QuadSection from "./QuadSection";

const ApplicationStatus = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <QuadSection
          header="Application Status"
          pieData={[
            { type: "Created", value: 3 },
            { type: "In progress", value: 10 },
            { type: "Client completed", value: 5 },
            { type: "Application conversion", value: 2 },
          ]}
          items={[
            {
              title: "Created",
              value: "3",
              description: "2 of the 3 applications are older than 30 days",
            },
            {
              title: "In progress",
              value: "10",
              description: "10 of the 15 applications are older than 30 days",
            },
            {
              title: "Client completed",
              value: "5",
              description:
                "5 completed by the client and need to be actioned by admin",
            },
            {
              title: "Application conversion",
              value: "2",
              description: "2 of the 3 completed applicants have made deposits",
            },
          ]}
        />
      </Col>
    </Row>
  );
};

export default ApplicationStatus;
