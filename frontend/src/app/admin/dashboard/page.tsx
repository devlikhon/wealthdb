"use client";

import { Row, Col, Card, Statistic } from "antd";

const Admin = () => {
  return (
    <Row gutter={[24, 24]}>
      {/* Applications */}
      <Col span={12}>
        <Card title="APPLICATIONS">
          <Statistic title="Completed Applications" value={100} suffix="%" />
        </Card>
      </Col>

      {/* Funding */}
      <Col span={12}>
        <Card title="FUNDING & DEPOSITS">
          <Statistic title="Completed Funds" value={50} suffix="%" />
        </Card>
      </Col>

      {/* Deposits */}
      <Col span={8}>
        <Card>
          <Statistic title="Deposits This Month" value={15000} prefix="£" />
        </Card>
      </Col>

      {/* Payments Due */}
      <Col span={8}>
        <Card>
          <Statistic title="Payments Due" value={5000} prefix="£" />
        </Card>
      </Col>

      {/* Open Payments */}
      <Col span={8}>
        <Card>
          <Statistic title="Open Payments" value={1} />
        </Card>
      </Col>
    </Row>
  );
};

export default Admin;
