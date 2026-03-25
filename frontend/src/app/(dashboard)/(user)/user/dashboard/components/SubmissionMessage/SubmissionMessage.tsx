/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Descriptions, Divider, Row, Space, Typography } from "antd";

const { Title, Text } = Typography;

const SubmissionMessage = ({ currentUser }: any) => {
  return (
    <Space orientation="vertical" size={16} style={{ width: "100%" }}>
      <Descriptions
        title={
          <Title
            level={4}
            style={{ marginBottom: 0, color: "var(--foreground)" }}
          >
            {`Application Completed - ${currentUser?.referenceNumber}`}
          </Title>
        }
        column={1}
        styles={{
          label: { color: "var(--foreground)", fontWeight: 600 },
          content: { color: "var(--foreground)" },
        }}
      >
        <Descriptions.Item>
          Thank you for completing your Deutsche Bank online application form.
        </Descriptions.Item>

        <Descriptions.Item>
          <Divider size="small" />
        </Descriptions.Item>

        <Descriptions.Item>
          <Space orientation="vertical" size={4}>
            <Title
              level={5}
              style={{ marginBottom: "-4px", color: "var(--foreground)" }}
            >
              Important notice:
            </Title>

            <Text style={{ color: "var(--foreground)" }}>
              {`If you have chosen to email your identification documents, please
            send a copy of your passport and a recent utility bill to
            wealth@dwouk-db.com. Please also include the application reference
            number: ${currentUser?.referenceNumber} in the email subject.`}
            </Text>

            <Text style={{ color: "var(--foreground)" }}>
              Your application can only be processed and approved once the
              necessary identity checks have been completed.
            </Text>

            <Text style={{ color: "var(--foreground)" }}>
              Please allow 24 hours for approval.
            </Text>

            <Text style={{ color: "var(--foreground)" }}>
              {`Once your account is approved you will find funding instructions via your Online Portal by clicking on the "Funding" button`}
            </Text>

            <Text style={{ color: "var(--foreground)" }}>
              In the meantime, if you need to speak to us please find our
              contact details below: Deutsche Bank - Call 0208 058 1017
            </Text>

            <Text style={{ color: "var(--foreground)" }}>
              80 Fenchurch Street, London, EC3M 4AE
            </Text>

            <Text style={{ color: "var(--foreground)" }}>
              Thank you for taking the time to complete this online application,
              you may now close this browser window.
            </Text>
          </Space>
        </Descriptions.Item>
      </Descriptions>
    </Space>
  );
};

export default SubmissionMessage;
