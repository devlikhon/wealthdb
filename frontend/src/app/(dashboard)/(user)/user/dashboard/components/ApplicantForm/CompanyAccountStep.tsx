import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import {
  Form,
  Input,
  Row,
  Col,
  Select,
  Typography,
  DatePicker,
  InputNumber,
  FormInstance,
} from "antd";
import {
  companyTaxClassifications,
  companyTypes,
  regions,
  relevantCategories,
  roleInCompanies,
  titles,
  yesOrNo,
} from "@/app/components/types/arrays/arrays";
import { getNames } from "country-list";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { JSX, useEffect } from "react";

interface Props {
  form: FormInstance;
}

const { Option } = Select;

const { Text, Title, Link } = Typography;

const countries = getNames();

const categoryFields: Record<string, string[]> = {
  "Publicly Listed Company": ["nameofMarketOrExchange", "companyCode"],

  "Majority owned subsidiary of a listed company": [
    "nameofMarketOrExchange",
    "listedCompanyName",
    "companyCode",
  ],

  "Regulated Company": ["regulatorName", "licenceDetails"],
};

const fieldComponents = (category?: string): Record<string, JSX.Element> => {
  const isPublicListed = category === "Publicly Listed Company";

  const colSize = isPublicListed ? 12 : 8;

  return {
    nameofMarketOrExchange: (
      <Col xs={24} sm={12} md={colSize}>
        <Form.Item
          label="Name of Market Or Exchange:"
          name={["companyAccount", "nameofMarketOrExchange"]}
          rules={[{ required: true, message: "" }]}
        >
          <Input />
        </Form.Item>
      </Col>
    ),

    companyCode: (
      <Col xs={24} sm={12} md={colSize}>
        <Form.Item
          label="Company Code:"
          name={["companyAccount", "companyCode"]}
          rules={[{ required: true, message: "" }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            controls={false}
            min={0}
            stringMode
            onKeyDown={(e) => {
              if (
                !/[0-9]/.test(e.key) &&
                ![
                  "Backspace",
                  "Delete",
                  "ArrowLeft",
                  "ArrowRight",
                  "Tab",
                ].includes(e.key)
              ) {
                e.preventDefault();
              }
            }}
          />
        </Form.Item>
      </Col>
    ),

    listedCompanyName: (
      <Col xs={24} sm={12} md={8}>
        <Form.Item
          label="Listed Company Name:"
          name={["companyAccount", "listedCompanyName"]}
          rules={[{ required: true, message: "" }]}
        >
          <Input />
        </Form.Item>
      </Col>
    ),

    regulatorName: (
      <Col xs={24} sm={12} md={12}>
        <Form.Item
          label="Regulator Name:"
          name={["companyAccount", "regulatorName"]}
          rules={[{ required: true, message: "" }]}
        >
          <Input />
        </Form.Item>
      </Col>
    ),

    licenceDetails: (
      <Col xs={24} sm={12} md={12}>
        <Form.Item
          label="Licence Details:"
          name={["companyAccount", "licenceDetails"]}
          rules={[{ required: true, message: "" }]}
        >
          <Input />
        </Form.Item>
      </Col>
    ),
  };
};

const CompanyAccountStep = ({ form }: Props) => {
  // const relevantCategory = Form.useWatch(
  //   ["companyAccount", "relevantCategories"],
  //   form,
  // );

  const companyAccount = Form.useWatch("companyAccount", form);

  const relevantCategory = companyAccount?.relevantCategories;
  const companyOwnership = companyAccount?.companyOwnership;
  const companyCountry = companyAccount?.country;
  const personalCountry = companyAccount?.personalInformations?.country;

  const activeFields = categoryFields[relevantCategory] || [];
  const fields = fieldComponents(relevantCategory);

  // useEffect(() => {
  //   form.setFieldsValue({
  //     companyAccount: {
  //       nameofMarketOrExchange: undefined,
  //       companyCode: undefined,
  //       listedCompanyName: undefined,
  //       regulatorName: undefined,
  //       licenceDetails: undefined,
  //     },
  //   });
  // }, [form, relevantCategory]);

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
        Company Account Information
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
        Signatories where possible. Deutsche Bank Wealth may request certified
        ID where this is not possible. For company accounts at least two
        Directors’ or Authorised Signatories’ details are required, with the
        exception of Sole Director companies.
      </Text>

      <Row gutter={16}>
        {/* First Name */}
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Full Name Of Company:"
            name={["companyAccount", "companyName"]}
            rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        {/* Company type */}
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Company Type:"
            name={["companyAccount", "companyType"]}
            rules={[{ required: true, message: "" }]}
          >
            <Select
              getPopupContainer={(triggerNode) => triggerNode.parentElement!}
              placeholder="Select"
              suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
            >
              {companyTypes.map((companyType) => (
                <Option
                  key={companyType}
                  value={companyType}
                  className="modal-select"
                >
                  {companyType}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        {/* Company Number */}
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Company Number:"
            name={["companyAccount", "companyNumber"]}
            rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        {/* Tax Code */}
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Tax Code:"
            name={["companyAccount", "taxCode"]}
            rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        {/* Tax Code Exemption */}
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Tax Code Exemption:"
            name={["companyAccount", "taxCodeExemption"]}
            rules={[{ required: true, message: "" }]}
          >
            <Select
              getPopupContainer={(triggerNode) => triggerNode.parentElement!}
              placeholder="Select"
              suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
            >
              {yesOrNo.map((companyType) => (
                <Option
                  key={companyType}
                  value={companyType}
                  className="modal-select"
                >
                  {companyType}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        {/* Date Of Registration */}
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Date Of Registration:"
            // name="dateOfBirth"
            name={["companyAccount", "dateOfRegistration"]}
            rules={[{ required: true, message: "" }]}
          >
            <DatePicker placeholder="Select date" style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>

      <Row
        style={{
          marginBottom: "var(--ant-form-item-margin-bottom)",
        }}
      >
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
            <strong>Note:</strong> Provision of a Tax Code is not compulsory,
            however, if you do not quote your Tax Code or claim an exemption,
            tax may be deducted from the interest paid to you at the highest
            marginal tax rate. Declining to quote a Tax Code is not an offence.
          </Text>
        </Col>
      </Row>

      <Row gutter={16}>
        {/* Business Activity */}
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Nature of the business activity:"
            name={["companyAccount", "businessActivity"]}
            rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        {/* Address */}
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Address:"
            name={["companyAccount", "address"]}
            rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Street Name:"
            name={["companyAccount", "streetName"]}
            rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Country:"
            name={["companyAccount", "country"]}
            rules={[{ required: true, message: "" }]}
          >
            <Select
              getPopupContainer={(triggerNode) => triggerNode.parentElement!}
              placeholder="Select"
              suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
            >
              <Option
                key="United Kingdom"
                value="United Kingdom"
                className="modal-select"
              >
                United Kingdom
              </Option>
              {/* {countries.map((country) => (
                <Option key={country} value={country} className="modal-select">
                  {country}
                </Option>
              ))} */}
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Region:"
            name={["companyAccount", "region"]}
            rules={[
              { required: companyCountry === "United Kingdom", message: "" },
            ]}
          >
            <Select
              disabled={companyCountry !== "United Kingdom"}
              getPopupContainer={(triggerNode) => triggerNode.parentElement!}
              placeholder="Select"
              suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
            >
              {regions.map((region) => (
                <Option key={region} value={region} className="modal-select">
                  {region}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {/* <Form.Item
            label="Region:"
            name={["companyAccount", "region"]}
            rules={[{ required: true, message: "" }]}
          >
            <Select
              getPopupContainer={(triggerNode) => triggerNode.parentElement!}
              placeholder="Select"
              suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
            >
              {regions.map((region) => (
                <Option key={region} value={region} className="modal-select">
                  {region}
                </Option>
              ))}
            </Select>
          </Form.Item> */}
        </Col>

        {/* Town  */}
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Town:"
            name={["companyAccount", "town"]}
            rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Post Code:"
            name={["companyAccount", "postcode"]}
            rules={[{ required: true, message: "" }]}
          >
            <Input />
            {/* <InputNumber
              style={{ width: "100%" }}
              controls={false} // no arrows
              min={0}
              stringMode
              onKeyDown={(e) => {
                if (
                  !/[0-9]/.test(e.key) &&
                  ![
                    "Backspace",
                    "Delete",
                    "ArrowLeft",
                    "ArrowRight",
                    "Tab",
                  ].includes(e.key)
                ) {
                  e.preventDefault();
                }
              }}
            /> */}
          </Form.Item>
        </Col>

        {/* Relevant Categories  */}
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Relevant Categories:"
            name={["companyAccount", "relevantCategories"]}
            rules={[{ required: true, message: "" }]}
          >
            <Select
              getPopupContainer={(triggerNode) => triggerNode.parentElement!}
              placeholder="Select"
              suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
            >
              {relevantCategories.map((relevantCategory) => (
                <Option
                  key={relevantCategory}
                  value={relevantCategory}
                  className="modal-select"
                >
                  {relevantCategory}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        {/* Company tax classification */}
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Company tax classification:"
            name={["companyAccount", "companyTaxClassification"]}
            rules={[{ required: true, message: "" }]}
          >
            <Select
              getPopupContainer={(triggerNode) => triggerNode.parentElement!}
              placeholder="Select"
              suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
            >
              {companyTaxClassifications.map((companyTaxClassification) => (
                <Option
                  key={companyTaxClassification}
                  value={companyTaxClassification}
                  className="modal-select"
                >
                  {companyTaxClassification}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {/* Relevant Categories Render */}
      {activeFields.length > 0 && (
        <Row gutter={16}>{activeFields.map((field) => fields[field])}</Row>
      )}

      {/* Company Officers 1 */}
      <Row
        style={{
          marginBottom: "var(--ant-form-item-margin-bottom)",
        }}
      >
        <Col xs={24} sm={24} md={24}>
          <Title
            level={4}
            style={{
              color: "var(--foreground)",
              fontWeight: 500,
              margin: 0,
            }}
          >
            Company officers
          </Title>
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
            <strong>Company officer 1:</strong> Please provide details of your
            first company officer.
          </Text>
        </Col>
      </Row>

      <Row gutter={16}>
        {/* Title */}
        <Col xs={24} sm={12} md={6} lg={4}>
          <Form.Item
            label="Title:"
            name={["companyAccount", "companyOfficers", 0, "title"]}
            rules={[{ required: true, message: "" }]}
          >
            <Select
              getPopupContainer={(triggerNode) => triggerNode.parentElement!}
              placeholder="Select"
              suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
            >
              {titles.map((title) => (
                <Option key={title} value={title} className="modal-select">
                  {title}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        {/* First Name */}
        <Col xs={24} sm={12} md={6} lg={10}>
          <Form.Item
            label="First Name:"
            name={["companyAccount", "companyOfficers", 0, "firstName"]}
            rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        {/* Middle Name */}
        <Col xs={24} sm={12} md={6} lg={10}>
          <Form.Item
            label="Middle Name:"
            name={["companyAccount", "companyOfficers", 0, "middleName"]}
            // rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        {/* Last Name */}
        <Col xs={24} sm={12} md={12}>
          <Form.Item
            label="Last Name:"
            name={["companyAccount", "companyOfficers", 0, "lastName"]}
            rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        {/* Role In Company */}
        <Col xs={24} sm={12} md={12}>
          <Form.Item
            label="Role In Company:"
            name={["companyAccount", "companyOfficers", 0, "roleInCompany"]}
            rules={[{ required: true, message: "" }]}
          >
            <Select
              getPopupContainer={(triggerNode) => triggerNode.parentElement!}
              placeholder="Select"
              suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
            >
              {roleInCompanies.map((roleInCompany) => (
                <Option
                  key={roleInCompany}
                  value={roleInCompany}
                  className="modal-select"
                >
                  {roleInCompany}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {/* Company Officers 2 */}
      <Row
        style={{
          marginBottom: "var(--ant-form-item-margin-bottom)",
        }}
      >
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
            <strong>Company officer 2:</strong> Please provide details of your
            second company officer.
          </Text>
        </Col>
      </Row>

      <Row gutter={16}>
        {/* Title */}
        <Col xs={24} sm={12} md={6} lg={4}>
          <Form.Item
            label="Title:"
            name={["companyAccount", "companyOfficers", 1, "title"]}
          >
            <Select
              getPopupContainer={(triggerNode) => triggerNode.parentElement!}
              placeholder="Select"
              suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
            >
              {titles.map((title) => (
                <Option key={title} value={title} className="modal-select">
                  {title}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        {/* First Name */}
        <Col xs={24} sm={12} md={6} lg={10}>
          <Form.Item
            label="First Name:"
            name={["companyAccount", "companyOfficers", 1, "firstName"]}
          >
            <Input />
          </Form.Item>
        </Col>

        {/* Middle Name */}
        <Col xs={24} sm={12} md={6} lg={10}>
          <Form.Item
            label="Middle Name:"
            name={["companyAccount", "companyOfficers", 1, "middleName"]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        {/* Last Name */}
        <Col xs={24} sm={12} md={12}>
          <Form.Item
            label="Last Name:"
            name={["companyAccount", "companyOfficers", 1, "lastName"]}
          >
            <Input />
          </Form.Item>
        </Col>

        {/* Role In Company */}
        <Col xs={24} sm={12} md={12}>
          <Form.Item
            label="Role In Company:"
            name={["companyAccount", "companyOfficers", 1, "roleInCompany"]}
          >
            <Select
              getPopupContainer={(triggerNode) => triggerNode.parentElement!}
              placeholder="Select"
              suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
            >
              {roleInCompanies.map((roleInCompany) => (
                <Option
                  key={roleInCompany}
                  value={roleInCompany}
                  className="modal-select"
                >
                  {roleInCompany}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {/* Company ownership */}
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
            Company Ownership
          </Title>
        </Col>
      </Row>

      <Row gutter={16}>
        {/* Company Ownership */}
        <Col xs={24} sm={12} md={12}>
          <Form.Item
            label="Are there any individuals who own (directly or indirectly) 25% or more of the company?:"
            name={["companyAccount", "companyOwnership"]}
            rules={[{ required: true, message: "" }]}
          >
            <Select
              getPopupContainer={(triggerNode) => triggerNode.parentElement!}
              placeholder="Select"
              suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
            >
              {yesOrNo.map((companyType) => (
                <Option
                  key={companyType}
                  value={companyType}
                  className="modal-select"
                >
                  {companyType}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        {companyOwnership === "Yes" && (
          <Col xs={24} sm={12} md={6} lg={12}>
            <Form.Item
              label="Provide names of the individual(s) who are the ultimate beneficial owners.:"
              name={[
                "companyAccount",
                "beneficialOwners",
                0,
                "beneficialOwner",
              ]}
              rules={[{ required: true, message: "" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        )}
      </Row>

      {companyOwnership === "Yes" && (
        <>
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
                Additional beneficial owners
              </Title>
            </Col>
          </Row>
          <Row gutter={16}>
            {/* Title */}
            <Col xs={24} sm={12} md={6} lg={3}>
              <Form.Item
                label="Title:"
                name={["companyAccount", "beneficialOwners", 0, "title"]}
                rules={[{ required: true, message: "" }]}
              >
                <Select
                  getPopupContainer={(triggerNode) =>
                    triggerNode.parentElement!
                  }
                  placeholder="Select"
                  suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
                >
                  {titles.map((title) => (
                    <Option key={title} value={title} className="modal-select">
                      {title}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            {/* First Name */}
            <Col xs={24} sm={12} md={6} lg={7}>
              <Form.Item
                label="First Name:"
                name={["companyAccount", "beneficialOwners", 0, "firstName"]}
                rules={[{ required: true, message: "" }]}
              >
                <Input />
              </Form.Item>
            </Col>

            {/* Middle Name */}
            <Col xs={24} sm={12} md={6} lg={7}>
              <Form.Item
                label="Middle Name:"
                name={["companyAccount", "beneficialOwners", 0, "middleName"]}
                // rules={[{ required: true, message: "" }]}
              >
                <Input />
              </Form.Item>
            </Col>

            {/* Last Name */}
            <Col xs={24} sm={12} md={6} lg={7}>
              <Form.Item
                label="Last Name:"
                name={["companyAccount", "beneficialOwners", 0, "lastName"]}
                rules={[{ required: true, message: "" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </>
      )}

      {/* Personal Informations */}
      <Row
        style={{
          marginBottom: "var(--ant-form-item-margin-bottom)",
        }}
      >
        <Col xs={24} sm={24} md={24}>
          <Title
            level={4}
            style={{
              color: "var(--foreground)",
              fontWeight: 500,
              margin: 0,
            }}
          >
            Personal Informations
          </Title>
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
            <strong>Deutsche Bank</strong> will use the information below to
            electronically verify the identity of Investors, Trustees, Directors
            and Authorised Signatories where possible. Deutsche Bank may request
            certified ID where this is not possible. For company accounts at
            least two Directors’ or Authorised Signatories’ details are
            required, with the exception of Sole Director companies.
          </Text>
        </Col>
      </Row>

      <Row gutter={16}>
        {/* Title */}
        <Col xs={24} sm={12} md={6} lg={3}>
          <Form.Item
            label="Title:"
            name={["companyAccount", "personalInformations", "title"]}
            rules={[{ required: true, message: "" }]}
          >
            <Select
              getPopupContainer={(triggerNode) => triggerNode.parentElement!}
              placeholder="Select"
              suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
            >
              {titles.map((title) => (
                <Option key={title} value={title} className="modal-select">
                  {title}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        {/* First Name */}
        <Col xs={24} sm={12} md={6} lg={7}>
          <Form.Item
            label="First Name:"
            name={["companyAccount", "personalInformations", "firstName"]}
            rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        {/* Middle Name */}
        <Col xs={24} sm={12} md={6} lg={7}>
          <Form.Item
            label="Middle Name:"
            name={["companyAccount", "personalInformations", "middleName"]}
            // rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        {/* Last Name */}
        <Col xs={24} sm={12} md={6} lg={7}>
          <Form.Item
            label="Last Name:"
            name={["companyAccount", "personalInformations", "lastName"]}
            rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        {/* Date Of Birth */}
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Date Of Birth:"
            // name="dateOfBirth"
            name={["companyAccount", "personalInformations", "dateOfBirth"]}
            rules={[{ required: true, message: "" }]}
          >
            <DatePicker placeholder="Select date" style={{ width: "100%" }} />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Occupation:"
            name={["companyAccount", "personalInformations", "occupation"]}
            rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="House Number or Name:"
            name={[
              "companyAccount",
              "personalInformations",
              "houseNumberOrName",
            ]}
            rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Street Name:"
            name={["companyAccount", "personalInformations", "streetName"]}
            rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Country:"
            name={["companyAccount", "personalInformations", "country"]}
            rules={[{ required: true, message: "" }]}
          >
            <Select
              getPopupContainer={(triggerNode) => triggerNode.parentElement!}
              placeholder="Select"
              suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
            >
              <Option
                key="United Kingdom"
                value="United Kingdom"
                className="modal-select"
              >
                United Kingdom
              </Option>
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Region:"
            name={["companyAccount", "personalInformations", "region"]}
            rules={[{ required: true, message: "" }]}
          >
            <Select
              disabled={personalCountry !== "United Kingdom"}
              getPopupContainer={(triggerNode) => triggerNode.parentElement!}
              placeholder="Select"
              suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
            >
              {regions.map((region) => (
                <Option key={region} value={region} className="modal-select">
                  {region}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Town:"
            name={["companyAccount", "personalInformations", "town"]}
            rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Postcode:"
            name={["companyAccount", "personalInformations", "postcode"]}
            rules={[{ required: true, message: "" }]}
          >
            <Input />
            {/* <InputNumber
              style={{ width: "100%" }}
              controls={false} // no arrows
              min={0}
              stringMode
              onKeyDown={(e) => {
                if (
                  !/[0-9]/.test(e.key) &&
                  ![
                    "Backspace",
                    "Delete",
                    "ArrowLeft",
                    "ArrowRight",
                    "Tab",
                  ].includes(e.key)
                ) {
                  e.preventDefault();
                }
              }}
            /> */}
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Moved In Date:"
            name={["companyAccount", "personalInformations", "movedInDate"]}
            rules={[{ required: true, message: "" }]}
          >
            <DatePicker placeholder="Select Date" style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Home Phone:"
            name={[
              "companyAccount",
              "personalInformations",
              "phones",
              0,
              "number",
            ]}
            rules={[{ required: true, message: "" }]}
          >
            {/* <PhoneInput country={"gb"} enableSearch /> */}
            <PhoneInput
              country="gb"
              enableSearch
              prefix="+"
              countryCodeEditable={false}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Mobile Phone:"
            name={[
              "companyAccount",
              "personalInformations",
              "phones",
              1,
              "number",
            ]}
            rules={[{ required: true, message: "" }]}
          >
            <PhoneInput country={"gb"} enableSearch />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Email Address:"
            name={["companyAccount", "personalInformations", "emai"]}
            rules={[
              { required: true, message: "" },
              { type: "email", message: "" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Confirm Email Address:"
            name={["companyAccount", "personalInformations", "confirmEmai"]}
            rules={[
              { required: true, message: "" },
              { type: "email", message: "" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default CompanyAccountStep;
