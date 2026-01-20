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
  AutoComplete,
  Space,
  Flex,
} from "antd";
import { debounce } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleLeft,
  faCircleRight,
} from "@fortawesome/free-regular-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./CreateCalendarAppointment.css";

const { Option } = Select;

interface Props {
  open: boolean;
  onClose: () => void;
}

const timezones = [
  { value: "-1", label: "Please Select..." },
  { value: "AET", label: "AET (Australian Eastern Time) UTC+10" },
  { value: "AEST", label: "AEST (Australian Eastern Standard Time) UTC+10" },
  {
    value: "AEDT",
    label: "AEDT (Australian Eastern Daylight Saving Time) UTC+11",
  },
  { value: "NZDT", label: "NZDT (New Zealand Daylight Time) UTC+13" },
  { value: "NZST", label: "NZST (New Zealand Standard Time) UTC+12" },
  { value: "EDT", label: "EDT (Eastern Daylight Time) UTC-04" },
  { value: "GMT", label: "GMT/UTC (Greenwich Mean Time)" },
  { value: "BST", label: "BST (British Summer Time) UTC+01" },
  { value: "IST", label: "IST (Irish Standard Time) UTC+01" },
  { value: "HKT", label: "HKT (Hong Kong Time) UTC+08" },
  { value: "SST", label: "SST (Singapore Standard Time) UTC+08" },
  { value: "CET", label: "CET (Central European Time) UTC+01" },
  { value: "CEST", label: "CEST (Central European Summer Time) UTC+02" },
];

const CreateCalendarAppointment = ({ open, onClose }: Props) => {
  const [form] = Form.useForm();

  // 🔹 Auto-save / update handler (debounced)
  const handleAutoSave = debounce((values: any) => {
    console.log("Auto updating form data:", values);

    // TODO:
    // updateDealTicket(values)
  }, 500);

  // 🔹 Called on every field change
  const onValuesChange = (_changed: any, allValues: any) => {
    handleAutoSave(allValues);
  };

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
      destroyOnHidden
      centered
      width="95vw"
      className="deal-ticket-modal"
    >
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
        <Space orientation="vertical" size={24} style={{ width: "100%" }}>
          {/* ================= ROW 1 : FORM CONTENT ================= */}
          <Row
            gutter={[
              { xs: 0, sm: 12, md: 16, lg: 24 },
              { xs: 12, sm: 16, md: 16, lg: 24 },
            ]}
          >
            {/* LEFT COLUMN */}
            <Col xs={24} lg={12}>
              <div className="deal-ticket-modal-col client-details-col">
                <h3>Calendar Appointment Information</h3>

                <Form.Item
                  label="Title"
                  name="title"
                  rules={[{ required: true, message: "" }]}
                >
                  <Input placeholder="" />
                </Form.Item>

                <Form.Item
                  label="Meeting Participant (Start typing contacts name):"
                  name="meetingParticipant"
                  rules={[{ required: true, message: "" }]}
                >
                  <AutoComplete
                    onSearch={handleParticipantSearch}
                    placeholder=""
                  />
                </Form.Item>

                <Form.Item
                  label="Meeting Host"
                  name="host"
                  rules={[{ required: true, message: "" }]}
                >
                  <Select
                    suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
                    placeholder="Please Select..."
                  >
                    <Option
                      className="deal-ticket-modal-select"
                      value="Alex Whitmore"
                    >
                      Alex Whitmore
                    </Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Calendar Item Type"
                  name="type"
                  rules={[{ required: true, message: "" }]}
                >
                  <Select
                    suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
                    placeholder="Please Select..."
                  >
                    <Option
                      className="deal-ticket-modal-select"
                      value="Appointment"
                    >
                      Appointment
                    </Option>
                  </Select>
                </Form.Item>
              </div>
            </Col>

            {/* RIGHT COLUMN */}
            <Col xs={24} lg={12}>
              <Flex
                vertical
                justify="space-between"
                style={{ height: "100%", rowGap: 16 }}
              >
                <div className="deal-ticket-modal-col address-details-col">
                  <h3>Date & Time</h3>

                  {/* Meeting Start Date & Time: */}
                  <Form.Item>
                    <div style={{ width: "100%" }}>
                      <Space size={8} wrap style={{ width: "100%" }}>
                        <Form.Item
                          name="startDate"
                          label="Meeting Start Date & Time:"
                          className="responsive-date-picker"
                          rules={[{ required: true, message: "" }]}
                        >
                          <DatePicker
                            placeholder="Select date"
                            style={{ width: "100%" }}
                          />
                        </Form.Item>

                        <Form.Item
                          name="startHour"
                          label="HH"
                          style={{
                            minWidth: 128.5,
                            marginBottom: 0,
                          }}
                          rules={[{ required: true, message: "" }]}
                        >
                          <Select
                            placeholder="Hour"
                            suffixIcon={
                              <FontAwesomeIcon icon={faChevronDown} />
                            }
                          >
                            {Array.from({ length: 24 }, (_, i) => {
                              const hour = String(i).padStart(2, "0");
                              return (
                                <Option
                                  className="deal-ticket-modal-select"
                                  key={hour}
                                  value={hour}
                                >
                                  {hour}
                                </Option>
                              );
                            })}
                          </Select>
                        </Form.Item>

                        <Form.Item
                          name="startMinute"
                          label="MM"
                          style={{
                            minWidth: 128.5,
                            marginBottom: 0,
                          }}
                          rules={[{ required: true, message: "" }]}
                        >
                          <Select
                            placeholder="Minute"
                            suffixIcon={
                              <FontAwesomeIcon icon={faChevronDown} />
                            }
                          >
                            {[
                              "00",
                              "05",
                              "10",
                              "15",
                              "20",
                              "25",
                              "30",
                              "35",
                              "40",
                              "45",
                              "50",
                              "55",
                            ].map((m) => (
                              <Option
                                className="deal-ticket-modal-select"
                                key={m}
                                value={m}
                              >
                                {m}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Space>
                    </div>
                  </Form.Item>

                  {/* Meeting End Date & Time: */}
                  <Form.Item>
                    <div style={{ width: "100%" }}>
                      <Space size={8} wrap style={{ width: "100%" }}>
                        <Form.Item
                          name="endDate"
                          label="Meeting End Date & Time::"
                          className="responsive-date-picker"
                          rules={[{ required: true, message: "" }]}
                        >
                          <DatePicker
                            placeholder="Select date"
                            style={{ width: "100%" }}
                          />
                        </Form.Item>

                        <Form.Item
                          name="endtHour"
                          label="HH"
                          style={{
                            minWidth: 128.5,
                            marginBottom: 0,
                          }}
                          rules={[{ required: true, message: "" }]}
                        >
                          <Select
                            placeholder="Hour"
                            suffixIcon={
                              <FontAwesomeIcon icon={faChevronDown} />
                            }
                          >
                            {Array.from({ length: 24 }, (_, i) => {
                              const hour = String(i).padStart(2, "0");
                              return (
                                <Option
                                  className="deal-ticket-modal-select"
                                  key={hour}
                                  value={hour}
                                >
                                  {hour}
                                </Option>
                              );
                            })}
                          </Select>
                        </Form.Item>

                        <Form.Item
                          name="endMinute"
                          label="MM"
                          style={{
                            minWidth: 128.5,
                            marginBottom: 0,
                          }}
                          rules={[{ required: true, message: "" }]}
                        >
                          <Select
                            placeholder="Minute"
                            suffixIcon={
                              <FontAwesomeIcon icon={faChevronDown} />
                            }
                          >
                            {[
                              "00",
                              "05",
                              "10",
                              "15",
                              "20",
                              "25",
                              "30",
                              "35",
                              "40",
                              "45",
                              "50",
                              "55",
                            ].map((m) => (
                              <Option
                                className="deal-ticket-modal-select"
                                key={m}
                                value={m}
                              >
                                {m}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Space>
                    </div>
                  </Form.Item>

                  {/* Timezone: */}
                  <Form.Item
                    label="Timezone"
                    name="timezone"
                    rules={[{ required: true, message: "" }]}
                    initialValue="GMT"
                  >
                    <Select
                      placeholder="Please Select..."
                      suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
                    >
                      {timezones.map((tz) => (
                        <Option
                          className="deal-ticket-modal-select"
                          key={tz.value}
                          value={tz.value}
                        >
                          {tz.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>

                {/* ================= ROW 2 : FOOTER BUTTONS ================= */}
                <Row
                  justify="end"
                  gutter={12}
                  className="deal-ticket-modal-footer"
                >
                  <Col>
                    <Button
                      type="primary"
                      onClick={onClose}
                      className="cancel-btn"
                    >
                      <FontAwesomeIcon icon={faCircleLeft} /> Cancel
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="submit-btn"
                    >
                      Create Meeting <FontAwesomeIcon icon={faCircleRight} />
                    </Button>
                  </Col>
                </Row>
              </Flex>
            </Col>
          </Row>
        </Space>
      </Form>
    </Modal>
  );
};

export default CreateCalendarAppointment;
