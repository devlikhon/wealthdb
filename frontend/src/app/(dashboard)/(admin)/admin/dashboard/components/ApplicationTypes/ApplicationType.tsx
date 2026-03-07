import { Row, Col } from "antd";
import ConversionRates from "./ConversionRates";

const ApplicationTypes = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <ConversionRates
          header="Conversation Rates"
          pieData={[
            { type: "Individual", value: 4 },
            { type: "Joint", value: 2 },
            { type: "Company", value: 1 },
            { type: "Trust", value: 2 },
          ]}
          items={[
            {
              title: "Individual",
              value: "4",
              description: "4 individual applications",
            },
            {
              title: "Joint",
              value: "2",
              description: "2 joint applications",
            },
            {
              title: "Company",
              value: "1",
              description: "1 company application",
            },
            {
              title: "Trust",
              value: "2",
              description: "2 trust applications",
            },
          ]}
        />
      </Col>
    </Row>
  );
};

export default ApplicationTypes;
