/* eslint-disable @typescript-eslint/no-explicit-any */
import { Descriptions, Divider, Space, Typography } from "antd";

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
              Please send a copy of your passport and a recent utility bill to
              application@dwouk-db.com or to your relationship manager’s email
              address.
            </Text>

            <Text style={{ color: "var(--foreground)" }}>
              If you have already submitted these documents, please disregard
              this request.
            </Text>

            <Text style={{ color: "var(--foreground)" }}>
              Once your application has been successfully approved, you will
              receive your Bond Purchase Agreement (BPA), which sets out the
              full terms and conditions of your investment, including the bond
              term, interest rate, and key features of the product.
            </Text>

            <Text style={{ color: "var(--foreground)" }}>
              {`Following account approval, funding instructions will be made available through your Online Client Portal. Simply log in and select the "Funding" section to view the bank details and payment instructions required to complete your investment.`}
            </Text>

            <Text style={{ color: "var(--foreground)" }}>
              Should you have any questions or require assistance at any stage
              of the process, please do not hesitate to contact our team using
              the details below:
            </Text>

            <Text style={{ color: "var(--foreground)" }}>
              Deutsche Bank Wealth Management Telephone: 0208 058 1017 80
              Fenchurch Street London EC3M 4AE
            </Text>

            <Text style={{ color: "var(--foreground)" }}>
              We look forward to assisting you throughout your investment
              journey.
            </Text>
          </Space>
        </Descriptions.Item>
      </Descriptions>
    </Space>
  );
};

export default SubmissionMessage;
