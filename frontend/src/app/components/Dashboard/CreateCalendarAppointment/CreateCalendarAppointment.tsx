/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Modal,
  Form,
  Input,
  Select,
  Row,
  Col,
  Button,
  DatePicker,
  TimePicker,
  AutoComplete,
  Space,
} from "antd";
import { debounce } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleLeft,
  faCircleRight,
} from "@fortawesome/free-regular-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";

const { Option } = Select;

interface Props {
  open: boolean;
  onClose: () => void;
}

const timezones = [
  { value: "GMT", label: "GMT / UTC" },
  { value: "BST", label: "BST (UTC+1)" },
  { value: "CET", label: "CET (UTC+1)" },
  { value: "CEST", label: "CEST (UTC+2)" },
];

const CreateCalendarAppointment = ({ open, onClose }: Props) => {
  const [form] = Form.useForm();

  /* 🔹 Autocomplete search */
  const handleParticipantSearch = debounce(async (value: string) => {
    if (!value || value.length < 3) return [];

    // 🔁 API call placeholder
    return [
      { value: "John Smith", id: 12 },
      { value: "Alex Whitmore", id: 3 },
    ];
  }, 400);

  const onFinish = (values: any) => {
    console.log("Submit:", values);
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title="Create Calendar Appointment"
      destroyOnClose
      centered
      width="90vw"
      className="calendar-appointment-modal"
    >
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
      >
        <Space direction="vertical" size={24} style={{ width: "100%" }}>
          {/* ================= ROW 1 : FORM CONTENT ================= */}
          <Row gutter={[24, 24]}>
            {/* LEFT COLUMN */}
            <Col xs={24} lg={12}>
              <h3>Appointment Information</h3>

              <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true }]}
              >
                <Input placeholder="Meeting title" />
              </Form.Item>

              <Form.Item
                label="Meeting Participant"
                name="participant"
                rules={[{ required: true }]}
              >
                <AutoComplete
                  onSearch={handleParticipantSearch}
                  placeholder="Start typing contact name"
                />
              </Form.Item>

              <Form.Item
                label="Meeting Host"
                name="host"
                rules={[{ required: true }]}
              >
                <Select
                  suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
                  placeholder="Please Select..."
                >
                  <Option value="3">Alex Whitmore</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Calendar Item Type"
                name="type"
                rules={[{ required: true }]}
              >
                <Select
                  suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
                >
                  <Option value="Appointment">Appointment</Option>
                </Select>
              </Form.Item>
            </Col>

            {/* RIGHT COLUMN */}
            <Col xs={24} lg={12}>
              <h3>Date & Time</h3>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Start Date"
                    name="startDate"
                    rules={[{ required: true }]}
                  >
                    <DatePicker
                      format="DD/MM/YYYY"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Start Time"
                    name="startTime"
                    rules={[{ required: true }]}
                  >
                    <TimePicker
                      format="HH:mm"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="End Date"
                    name="endDate"
                    rules={[{ required: true }]}
                  >
                    <DatePicker
                      format="DD/MM/YYYY"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="End Time"
                    name="endTime"
                    rules={[{ required: true }]}
                  >
                    <TimePicker
                      format="HH:mm"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Timezone"
                name="timezone"
                rules={[{ required: true }]}
                initialValue="GMT"
              >
                <Select
                  suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
                >
                  {timezones.map((tz) => (
                    <Option key={tz.value} value={tz.value}>
                      {tz.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* ================= ROW 2 : FOOTER BUTTONS ================= */}
          <Row justify="end" gutter={12}>
            <Col>
              <Button type="primary" onClick={onClose}>
                <FontAwesomeIcon icon={faCircleLeft} /> Cancel
              </Button>
            </Col>
            <Col>
              <Button type="primary" htmlType="submit">
                Create Meeting <FontAwesomeIcon icon={faCircleRight} />
              </Button>
            </Col>
          </Row>
        </Space>
      </Form>
    </Modal>
  );
};

export default CreateCalendarAppointment;
