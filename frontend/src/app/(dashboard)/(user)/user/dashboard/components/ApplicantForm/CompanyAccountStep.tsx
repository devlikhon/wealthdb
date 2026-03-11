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
  companyTypes,
  regions,
  titles,
} from "@/app/components/types/arrays/arrays";
import { getNames } from "country-list";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface Props {
  form: FormInstance;
}

const { Option } = Select;

const { Text, Title, Link } = Typography;

const countries = getNames();

const CompanyAccountStep = ({ form }: Props) => {
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
        Signatories where possible. Aviva Wealth may request certified ID where
        this is not possible. For company accounts at least two Directors’ or
        Authorised Signatories’ details are required, with the exception of Sole
        Director companies.
      </Text>

      <Row gutter={16}>
        {/* First Name */}
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Full Name of Company:"
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

        {/* Middle Name */}
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Company Number:"
            name={["companyAccount", "companyNumber"]}
            rules={[{ required: true, message: "" }]}
          >
            <InputNumber
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
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        {/* Date Of Birth */}
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Date Of Birth:"
            // name="dateOfBirth"
            name={["companyAccount", "dateOfBirth"]}
            rules={[{ required: true, message: "" }]}
          >
            <DatePicker placeholder="Select date" style={{ width: "100%" }} />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Occupation:"
            name={["companyAccount", "occupation"]}
            rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="House Number or Name:"
            name={["companyAccount", "houseNumberOrName"]}
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
            name={["companyAccount", "streetName"]}
            rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Town:"
            name={["companyAccount", "town"]}
            rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item
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
              {countries.map((country) => (
                <Option key={country} value={country} className="modal-select">
                  {country}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Postcode:"
            name={["companyAccount", "postcode"]}
            rules={[{ required: true, message: "" }]}
          >
            <InputNumber
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
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Moved In Date:"
            name={["companyAccount", "movedInDate"]}
            rules={[{ required: true, message: "" }]}
          >
            <DatePicker placeholder="Date" style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Home Phone"
            name={["companyAccount", "phones", 0, "number"]}
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
            label="Mobile Phone"
            name={["companyAccount", "phones", 1, "number"]}
            rules={[{ required: true, message: "" }]}
          >
            <PhoneInput country={"gb"} enableSearch />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Email Address:"
            name={["companyAccount", "emai"]}
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
            name={["companyAccount", "confirmEmai"]}
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
