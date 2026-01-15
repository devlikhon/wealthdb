"use client";

import {
  Card,
  Col,
  Row,
  Table,
  Input,
  Select,
  Button,
  Space,
  Typography,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  CalendarOutlined,
  UserOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const columns = [
  { title: "Date / Time", dataIndex: "date", key: "date" },
  { title: "Ticket Number", dataIndex: "ticket", key: "ticket" },
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Investment", dataIndex: "investment", key: "investment" },
  { title: "Total", dataIndex: "total", key: "total" },
  { title: "Representative", dataIndex: "rep", key: "rep" },
  { title: "", key: "a" },
  { title: "", key: "b" },
  { title: "", key: "c" },
  { title: "", key: "d" },
];

const DealTickets = () => {
  return (
    <>
      {/* ================= KPI SECTION ================= */}
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Card>
            <CalendarOutlined />
            <Title level={3}>0</Title>
            <Text>Active clients in last 30 Days</Text>
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <UserOutlined />
            <Title level={3}>0</Title>
            <Text>Clients deposited in last 30 Days</Text>
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <CloseOutlined />
            <Title level={3}>0</Title>
            <Text>Inactive client accounts</Text>
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <CheckOutlined />
            <Title level={3}>0</Title>
            <Text>New clients in last 30 Days</Text>
          </Card>
        </Col>
      </Row>

      {/* ================= TABLE SECTION ================= */}
      <Card>
        {/* Header */}
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: 16 }}
        >
          <Title level={5} style={{ margin: 0 }}>
            All Deal Tickets
          </Title>

          <Space>
            <Button type="primary" icon={<PlusOutlined />}>
              Add Deal Ticket
            </Button>

            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              style={{ width: 200 }}
            />

            <Select defaultValue="10" style={{ width: 90 }}>
              <Select.Option value="10">10</Select.Option>
              <Select.Option value="25">25</Select.Option>
              <Select.Option value="50">50</Select.Option>
              <Select.Option value="100">100</Select.Option>
              <Select.Option value="-1">All</Select.Option>
            </Select>
          </Space>
        </Row>

        {/* Table */}
        <Table
          columns={columns}
          dataSource={[]}
          pagination={{ pageSize: 10 }}
          locale={{ emptyText: "No clients to display." }}
          scroll={{ x: true }}
          rowKey="id"
        />
      </Card>
    </>
  );
};

export default DealTickets;
