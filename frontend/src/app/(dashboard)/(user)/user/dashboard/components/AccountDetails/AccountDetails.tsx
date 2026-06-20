import { useGlobal } from "@/app/Auth/GlobalProvider/GlobalProvider";
import { Card, Col, Row, Typography } from "antd";

const { Text, Title } = Typography;

const AccountDetails = () => {
  const { user, applicants, myPortfolio } = useGlobal();

  // ✅ compute currentUser dynamically whenever applicants or user changes
  const currentUser = applicants?.find(
    (applicant) => applicant.email === user?.email,
  );

  return (
    <Row gutter={[16, 16]}>
      <Col
        xs={24}
        sm={24}
        md={8}
        lg={8}
        style={{ display: "flex" }} // keep cards same height
      >
        <Card
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            background: "var(--secondary-color)",
          }}
          variant="borderless"
        >
          <Title
            level={5}
            style={{ margin: 0, color: "var(--foreground)", fontWeight: 400 }}
          >
            {currentUser?.title} {currentUser?.firstName}{" "}
            {currentUser?.middleName} {currentUser?.lastName}
          </Title>

          <Text
            style={{
              margin: "0 auto",
              padding: "2px 3px",
              color: "var(--foreground)",
              backgroundColor: "var(--primary-color)",
              width: "max-content",
            }}
          >
            {currentUser?.accountType}
          </Text>

          <Title
            level={5}
            style={{ margin: 0, color: "var(--foreground)", fontWeight: 400 }}
          >
            {currentUser?.referenceNumber}
          </Title>

          <Title
            level={5}
            style={{ margin: 0, color: "var(--foreground)", fontWeight: 400 }}
          >
            {currentUser?.email}
          </Title>
        </Card>
      </Col>

      <Col
        xs={24}
        sm={24}
        md={8}
        lg={8}
        style={{ display: "flex" }} // keep cards same height
      >
        <Card
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            background: "var(--secondary-color)",
          }}
          variant="borderless"
        >
          <Title
            level={5}
            style={{ margin: 0, color: "var(--foreground)", fontWeight: 400 }}
          >
            Total Investment
          </Title>

          <Title level={4} style={{ margin: 0, color: "var(--foreground)" }}>
            £{myPortfolio.grandTotal}
          </Title>
        </Card>
      </Col>

      <Col
        xs={24}
        sm={24}
        md={8}
        lg={8}
        style={{ display: "flex" }} // keep cards same height
      >
        <Card
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            background: "var(--secondary-color)",
          }}
          variant="borderless"
        >
          <Title
            level={5}
            style={{ margin: 0, color: "var(--foreground)", fontWeight: 400 }}
          >
            Total Interest
          </Title>

          <Title level={4} style={{ margin: 0, color: "var(--foreground)" }}>
            £{myPortfolio.totalInterest}
          </Title>
        </Card>
      </Col>
    </Row>
  );
};

export default AccountDetails;
