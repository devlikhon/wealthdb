import {
  PurposeOfAccount,
  SourceOfFunds,
} from "@/app/components/types/arrays/arrays";
import {
  Form,
  Select,
  Typography,
  FormInstance,
  Row,
  Col,
  Radio,
  Input,
} from "antd";

interface Props {
  form: FormInstance;
}

const { Text, Title } = Typography;

const AdditionalInformationStep = ({ form }: Props) => {
  const adviserAppointementType = Form.useWatch(
    ["additionalInformation", "adviserAppointement", "type"],
    form,
  );

  return (
    <div className="modal-container-col" style={{ paddingBottom: 0 }}>
      <Title
        level={4}
        style={{
          color: "var(--foreground)",
          fontWeight: 500,
          margin: 0,
        }}
      >
        Additional Information
      </Title>

      <Text
        style={{
          color: "var(--foreground)",
          marginBottom: 16,
          display: "block",
        }}
      >
        Please answer the following questions in relation to your application.
      </Text>

      {/* Adviser Appointment */}
      <Row>
        <Col xs={24} sm={24} md={24}>
          <Title
            level={4}
            style={{
              color: "var(--foreground)",
              fontWeight: 500,
              margin: 0,
            }}
          >
            Adviser Appointment
          </Title>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={24} md={24}>
          <Form.Item
            label="Do you have a financial adviser?"
            name={["additionalInformation", "adviserAppointement", "type"]}
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <Radio.Group className="user-radio-group">
              {/* Yes */}
              <Radio value="Yes">
                <Text
                  style={{
                    color: "var(--foreground)",
                    display: "block",
                  }}
                >
                  Yes
                </Text>
              </Radio>

              {/* NO */}
              <Radio value="No">
                <Text
                  style={{
                    color: "var(--foreground)",
                    display: "block",
                  }}
                >
                  No
                </Text>
              </Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>

      {adviserAppointementType === "Yes" && (
        <>
          <Row style={{ marginBottom: 16 }}>
            <Col xs={24} sm={24} md={24}>
              <Text
                style={{
                  color: "var(--foreground)",
                  display: "block",
                  fontSize: "1em",
                  lineHeight: "1.25em",
                  padding: "5px 10px",
                  background: "#54595f3d",
                  borderLeft: "4px solid var(--primary-color)",
                }}
              >
                <strong>Note:</strong> Please provide details of your adviser.
                By appointing an adviser under this section you nominate the
                adviser as the primary contact and authorised signatory for this
                account. By appointing the above adviser I authorise and consent
                to Aviva Wealth providing the adviser with my personal,
                transactional and investment information and data via their
                nominated data feed provider.
              </Text>
            </Col>
          </Row>

          <Row gutter={16}>
            {/* First Name */}
            <Col xs={24} sm={12} md={12}>
              <Form.Item
                label="First Name:"
                name={[
                  "additionalInformation",
                  "adviserAppointement",
                  "adviserAppointementDetails",
                  "firstName",
                ]}
                rules={[{ required: true, message: "" }]}
              >
                <Input />
              </Form.Item>
            </Col>

            {/* Last Name */}
            <Col xs={24} sm={12} md={12}>
              <Form.Item
                label="Last Name:"
                name={[
                  "additionalInformation",
                  "adviserAppointement",
                  "adviserAppointementDetails",
                  "lastName",
                ]}
                rules={[{ required: true, message: "" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            {/* Busiess Name */}
            <Col xs={24} sm={12} md={12}>
              <Form.Item
                label="Busiess Name:"
                name={[
                  "additionalInformation",
                  "adviserAppointement",
                  "adviserAppointementDetails",
                  "busiessName",
                ]}
                rules={[{ required: true, message: "" }]}
              >
                <Input />
              </Form.Item>
            </Col>

            {/* Email address */}
            <Col xs={24} sm={12} md={12}>
              <Form.Item
                label="Email address:"
                name={[
                  "additionalInformation",
                  "adviserAppointement",
                  "adviserAppointementDetails",
                  "emailAddress",
                ]}
                rules={[
                  { required: true, message: "" },
                  { type: "email", message: "" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </>
      )}

      {/* Source of funds */}

      <Row>
        <Col xs={24} sm={24} md={24}>
          <Title
            level={4}
            style={{
              color: "var(--foreground)",
              fontWeight: 500,
              margin: 0,
            }}
          >
            Source of Funds
          </Title>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={24} md={24}>
          <Form.Item
            label="What is the main source of Funds for Investment?"
            name={["additionalInformation", "sourceOfFunds"]}
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <Radio.Group className="user-radio-group">
              {SourceOfFunds.map((item) => (
                <Radio key={item} value={item}>
                  <Text
                    style={{
                      color: "var(--foreground)",
                      display: "block",
                    }}
                  >
                    {item}
                  </Text>
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>

      {/* Purpose of accounts */}

      <Row>
        <Col xs={24} sm={24} md={24}>
          <Title
            level={4}
            style={{
              color: "var(--foreground)",
              fontWeight: 500,
              margin: 0,
            }}
          >
            Purpose of Account
          </Title>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={24} md={24}>
          <Form.Item
            label="What is the purpose of the account?"
            name={["additionalInformation", "purposeOfAccount"]}
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <Radio.Group className="user-radio-group">
              {PurposeOfAccount.map((item) => (
                <Radio key={item} value={item}>
                  <Text
                    style={{
                      color: "var(--foreground)",
                      display: "block",
                    }}
                  >
                    {item}
                  </Text>
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default AdditionalInformationStep;
