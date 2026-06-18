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
import { regions, titles } from "@/app/components/types/arrays/arrays";
import { getNames } from "country-list";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface Props {
  form: FormInstance;
}

const { Option } = Select;

const { Text, Title } = Typography;

const countries = getNames();

const JointAccountStep = ({ form }: Props) => {
  const jointAccount = Form.useWatch("jointAccount", form);

  const jointCountry = jointAccount?.country;

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
        Joint Account Information
      </Title>

      <Text
        style={{
          color: "var(--foreground)",
          marginBottom: 16,
          display: "block",
        }}
      >
        Deutsche Bank will use the information below to electronically verify
        the identity of Investors, Trustees, Directors and Authorised
        Signatories where possible. Deutsche Bank Wealth may request certified
        ID where this is not possible. For company accounts at least two
        Directors’ or Authorised Signatories’ details are required, with the
        exception of Sole Director companies.
      </Text>

      <Row gutter={16}>
        {/* Title */}
        <Col xs={24} sm={12} md={6} lg={3}>
          <Form.Item
            label="Title:"
            name={["jointAccount", "title"]}
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
            name={["jointAccount", "firstName"]}
            rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        {/* Middle Name */}
        <Col xs={24} sm={12} md={6} lg={7}>
          <Form.Item
            label="Middle Name:"
            name={["jointAccount", "middleName"]}
            // rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        {/* Last Name */}
        <Col xs={24} sm={12} md={6} lg={7}>
          <Form.Item
            label="Last Name:"
            name={["jointAccount", "lastName"]}
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
            name={["jointAccount", "dateOfBirth"]}
            rules={[{ required: true, message: "" }]}
          >
            <DatePicker placeholder="Select date" style={{ width: "100%" }} />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Occupation:"
            name={["jointAccount", "occupation"]}
            rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="House Number or Name:"
            name={["jointAccount", "houseNumberOrName"]}
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
            name={["jointAccount", "country"]}
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
            name={["jointAccount", "region"]}
            rules={[
              { required: jointCountry === "United Kingdom", message: "" },
            ]}
          >
            <Select
              disabled={jointCountry !== "United Kingdom"}
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

        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Town:"
            name={["jointAccount", "town"]}
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
            name={["jointAccount", "streetName"]}
            rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Postcode:"
            name={["jointAccount", "postcode"]}
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
            name={["jointAccount", "movedInDate"]}
            rules={[{ required: true, message: "" }]}
          >
            <DatePicker placeholder="Date" style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Home Phone:"
            name={["jointAccount", "phones", 0, "number"]}
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
            name={["jointAccount", "phones", 1, "number"]}
            rules={[{ required: true, message: "" }]}
          >
            <PhoneInput country={"gb"} enableSearch />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Email Address:"
            name={["jointAccount", "emai"]}
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
            name={["jointAccount", "confirmEmai"]}
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

export default JointAccountStep;
