/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox, Col, Form, FormInstance, Row, Typography } from "antd";

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
        }}
      >
        Application declaration
      </Title>

      <Row
        style={{
          marginBottom: "var(--ant-form-item-margin-bottom)",
          padding: "10px",
          background: "#54595f3d",
          borderLeft: "4px solid var(--primary-color)",
        }}
      >
        <Col xs={24} sm={24} md={24}>
          <Title
            level={5}
            style={{
              color: "var(--foreground)",
              fontWeight: 500,
              margin: 0,
              textDecoration: "underline",
            }}
          >
            Terms & Conditions:
          </Title>
          <Text
            style={{
              color: "var(--foreground)",
              marginBottom: 16,
              display: "block",
            }}
          >
            {`For the purposes of this Agreement, Deutsche Bank shall be referred
            to as the "Company." It is imperative that you thoroughly review and
            understand these Terms and Conditions prior to purchasing any
            investment. The Terms and Conditions governing the purchase and sale
            of fixed-income investments with the Company are set forth below.
            Additional Terms and Conditions may apply to certain specific
            services as provided herein. This Agreement shall be governed by,
            and construed in accordance with, the laws of the United Kingdom.`}
          </Text>

          <Title
            level={5}
            style={{
              color: "var(--foreground)",
              fontWeight: 500,
              margin: 0,
              textDecoration: "underline",
            }}
          >
            Documentation:
          </Title>
          <Text
            style={{
              color: "var(--foreground)",
              marginBottom: 16,
              display: "block",
            }}
          >
            Clients shall be required to submit all necessary documentation in
            compliance with applicable European and United Kingdom anti-money
            laundering regulations.
          </Text>

          <Title
            level={5}
            style={{
              color: "var(--foreground)",
              fontWeight: 500,
              margin: 0,
              textDecoration: "underline",
            }}
          >
            Client Monies:
          </Title>
          <Text
            style={{
              color: "var(--foreground)",
              marginBottom: 16,
              display: "block",
            }}
          >
            Deposits shall be protected by the Financial Services Compensation
            Scheme (FSCS) up to £120,000 per individual, per financial
            institution. Deposits relating to secondary market bonds shall be
            made through an Escrow Account administered in accordance with
            Solicitors Regulation Authority (SRA) regulations. The escrow
            account will be created in the beneficiary’s name. As the escrow
            account is newly established for the beneficiary, it may not appear
            on the UK banking Confirmation of Payee (CoP) service, which checks
            whether the recipient’s name matches the bank account details before
            a transfer is made. Where the investment amount exceeds the FSCS
            protection threshold of £120,000, the funds will be sent directly to
            the solicitor’s client account and held for up to 14 days while full
            bond buy-back guarantee approval is obtained.
          </Text>

          <Title
            level={5}
            style={{
              color: "var(--foreground)",
              fontWeight: 500,
              margin: 0,
              textDecoration: "underline",
            }}
          >
            Compliants:
          </Title>
          <Text
            style={{
              color: "var(--foreground)",
              marginBottom: 16,
              display: "block",
            }}
          >
            {`The Company maintains a formal written policy for the handling of
            complaints, ensuring that all complaints are addressed promptly and
            impartially. In the event that you wish to file a complaint, a copy
            of the Company's complaints handling policy will be provided to you
            automatically.`}
          </Text>

          <Title
            level={5}
            style={{
              color: "var(--foreground)",
              fontWeight: 500,
              margin: 0,
              textDecoration: "underline",
            }}
          >
            The parties to this agreement are:
          </Title>
          <Text
            style={{
              color: "var(--foreground)",
              marginBottom: 16,
              display: "block",
            }}
          >
            I/We consent to Deutsche Bank collecting and disclosing my/our
            information provided above to a credit reporting agency to
            electronically verify your identity against information held by the
            external party solely to meet Deutsche Bank obligation pursuant to
            the Anti-Money Laundering and Counter Terrorism-Financing Act 2006.
            My/Our information will be maintained and used in accordance with
            Deutsche Bank Privacy Statement in Deutsche Bank will not be shared
            with any other party without your consent. In the event Deutsche
            Bank is unable to verify and identify the Client/Investor based on
            the information you provide, I/we may be asked to provide certified
            copies of the information and documentation including driver
            licence, passport and trust deeds or any other such documentation as
            may be necessary to meet Deutsche Bank regulatory obligations before
            a Deutsche Bank Client Account is opened.
          </Text>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} md={24}>
          <Title
            level={5}
            style={{
              color: "var(--foreground)",
              fontWeight: 500,
            }}
            className="declaration-label"
          >
            Executed as an agreement by the Investment Entity/Client:
          </Title>
        </Col>

        {/* <Form.Item
          name={["applicationDeclaration", "agreements"]}
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value?.confirmTruth && value?.selfCertification
                  ? Promise.resolve()
                  : Promise.reject(new Error("You must accept all agreements")),
            },
          ]}
        >
          <Checkbox.Group>
            <Checkbox>
              I confirm that all information is true and correct.
            </Checkbox>

            <Checkbox>
              I acknowledge that I am providing a self-certification.
            </Checkbox>
          </Checkbox.Group>
        </Form.Item> */}
        <Col xs={24} md={24}>
          <Form.Item
            name={["applicationDeclaration", "agreements"]}
            valuePropName="checked"
            rules={[
              {
                validator: (_, value: string[] = []) =>
                  value.includes("confirmTruth") &&
                  value.includes("selfCertification")
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error("You must accept all agreements"),
                      ),
              },
            ]}
          >
            <Checkbox.Group>
              <Checkbox
                value="confirmTruth"
                className="deutsche-checkbox"
                style={{ marginBottom: 16 }}
              >
                <Text style={{ color: "var(--foreground)" }}>
                  I/We provide the personal information contained in this
                  application on my own behalf, or if provided on behalf of the
                  Client, I/we confirm we are authorised to provide the personal
                  information contained in this application, and I/we confirm
                  that all information in this application is true and correct.
                </Text>
              </Checkbox>

              <Checkbox value="selfCertification" className="deutsche-checkbox">
                <Text style={{ color: "var(--foreground)" }}>
                  I/We acknowledge that I am providing a self-certification
                </Text>
              </Checkbox>
            </Checkbox.Group>
          </Form.Item>
        </Col>
        {/* <Col xs={24} md={24}>
          <Form.Item
            name={["applicationDeclaration", "confirmTruth"]}
            valuePropName="checked"
            rules={[{ required: true, message: "Required" }]}
            style={{ marginBottom: 16 }}
          >
            <Checkbox className="deutsche-checkbox">
              <Text style={{ color: "var(--foreground)" }}>
                I/We provide the personal information contained in this
                application on my own behalf, or if provided on behalf of the
                Client, I/we confirm we are authorised to provide the personal
                information contained in this application, and I/we confirm that
                all information in this application is true and correct.
              </Text>
            </Checkbox>
          </Form.Item>
          <Form.Item
            name={["applicationDeclaration", "selfCertification"]}
            valuePropName="checked"
            rules={[{ required: true, message: "" }]}
          >
            <Checkbox className="deutsche-checkbox">
              <Text style={{ color: "var(--foreground)" }}>
                I/We acknowledge that I am providing a self-certification
              </Text>
            </Checkbox>
          </Form.Item>
        </Col> */}
      </Row>
    </div>
  );
};

export default DeclarationStep;
