import { Row, Col } from "antd";
import FundingDeposits from "./Funding&Deposits";

const CompletedFunds = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <FundingDeposits
          header="Completed Funds"
          pieData={[
            { type: "Open Funds", value: 2 },
            { type: "Open Payments", value: 5 },
            { type: "Future Payments", value: 12 },
            { type: "Overdue Payments", value: 10 },
          ]}
          items={[
            {
              title: "Open Funds",
              value: "2",
              description: "Currently there are 2 open funds to be funded",
            },
            {
              title: "Open Payments",
              value: "5",
              description:
                "Currently there are 0 open payments to be deposited",
            },
            {
              title: "Future Payments",
              value: "12",
              description: "12 payments are scheduled for payment",
            },
            {
              title: "Overdue Payments",
              value: "10",
              description: "10 payments have missed their scheduled date",
            },
          ]}
        />
      </Col>
    </Row>
  );
};

export default CompletedFunds;
