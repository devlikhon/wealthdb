import { FormInstance, Typography } from "antd";

interface Props {
  form: FormInstance;
}

const { Text, Title } = Typography;

const DeclarationStep = ({ form }: Props) => {
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
        DeclarationStep
      </Title>

      <Text
        style={{
          color: "var(--foreground)",
          marginBottom: 16,
          display: "block",
        }}
      >
        Deutsche Bank will use the below information to electronically verify
        the identity of Investors, Trustees, Directors and Authorised
        Signatories where possible. Aviva Wealth may request certified ID where
        this is not possible. For company accounts at least two Directors’ or
        Authorised Signatories’ details are required, with the exception of Sole
        Director companies.
      </Text>
    </div>
  );
};

export default DeclarationStep;
