import { Row, Col } from "antd";
import DepositsWeekStat from "./DepositsWeekStat";

const DepositsWeek = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <DepositsWeekStat
          header="Deposits This Month"
          pieData={[
            { type: "Deposits This Week", value: 300 },
            { type: "Deposits This Month", value: 800 },
            { type: "Payments Due", value: 2000 },
          ]}
          items={[
            {
              title: "Deposits This Week",
              value: "300 GBP",
              description: "300 GBP payments have been made this week",
            },
            {
              title: "Payments Due",
              value: "2000 GBP",
              description: "2000 GBP payments are due this month",
            },
          ]}
        />
      </Col>
    </Row>
  );
};

export default DepositsWeek;
