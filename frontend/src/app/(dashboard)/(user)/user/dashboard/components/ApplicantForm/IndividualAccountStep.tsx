"use client";

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
  FormInstance,
} from "antd";
import { titles } from "@/app/components/types/arrays/arrays";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Country, State, City } from "country-state-city";
import { useEffect } from "react";

interface Props {
  form: FormInstance;
}

const { Option } = Select;

const { Text, Title } = Typography;

const IndividualAccountStep = ({ form }: Props) => {
  const individualAccount = Form.useWatch("individualAccount", form);

  // Get all countries

  const countries = Country.getAllCountries().map((country) => country.name);

  const individualCountry = individualAccount?.country;
  const individualRegion = individualAccount?.region;

  const selectedCountry = Country.getAllCountries().find(
    (c) => c.name === individualCountry,
  );

  const states = selectedCountry
    ? State.getStatesOfCountry(selectedCountry.isoCode)
    : [];

  const selectedState = states.find((s) => s.name === individualRegion);

  const cities =
    selectedCountry && selectedState
      ? City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode)
      : [];

  // console.log("individualAccount?.region", individualAccount?.region);

  useEffect(() => {
    form.setFieldValue(["individualAccount", "town"], undefined);
  }, [form, individualRegion]);

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
        Individual Account Information
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
        Signatories where possible. Deutsche Bank may request certified ID where
        this is not possible. For company accounts at least two Directors’ or
        Authorised Signatories’ details are required, with the exception of Sole
        Director companies.
      </Text>

      {/* <Card
        size="small"
        title={
          <div
            style={{
              textAlign: "center",
              width: "100%",
              fontSize: 16,
              color: "var(--foreground)",
              fontWeight: 500,
            }}
          >
            Individual Details
          </div>
        }
        style={{
          backgroundColor: "transparent",
          border: "1px solid var(--border-color)",
          marginBottom: 24,
        }}
      > */}
      <Row gutter={16}>
        {/* Title */}
        <Col xs={24} sm={12} md={6} lg={3}>
          <Form.Item
            label="Title:"
            name={["individualAccount", "title"]}
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
            name={["individualAccount", "firstName"]}
            rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        {/* Middle Name */}
        <Col xs={24} sm={12} md={6} lg={7}>
          <Form.Item
            label="Middle Name:"
            name={["individualAccount", "middleName"]}
            // rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        {/* Last Name */}
        <Col xs={24} sm={12} md={6} lg={7}>
          <Form.Item
            label="Last Name:"
            name={["individualAccount", "lastName"]}
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
            name={["individualAccount", "dateOfBirth"]}
            rules={[{ required: true, message: "" }]}
          >
            <DatePicker placeholder="Select date" style={{ width: "100%" }} />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Occupation:"
            name={["individualAccount", "occupation"]}
            rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="House Number or Name:"
            name={["individualAccount", "houseNumberOrName"]}
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
            name={["individualAccount", "country"]}
            rules={[{ required: true, message: "" }]}
          >
            <Select
              getPopupContainer={(triggerNode) => triggerNode.parentElement!}
              placeholder="Search country"
              suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
              showSearch
              options={countries.map((country) => ({
                value: country,
                label: country,
                className: "modal-select",
              }))}
              onChange={() => {
                form.setFields([
                  { name: ["individualAccount", "region"], value: undefined },
                  { name: ["individualAccount", "town"], value: undefined },
                ]);
              }}
              // optionFilterProp="label"
              // filterOption={(input, option) =>
              //   (option?.label as string)
              //     ?.toLowerCase()
              //     .includes(input.toLowerCase())
              // }
            />
          </Form.Item>

          {/* <Form.Item
            label="Country:"
            name={["individualAccount", "country"]}
            rules={[{ required: true, message: "" }]}
          >
            <Select
              getPopupContainer={(triggerNode) => triggerNode.parentElement!}
              placeholder="Select"
              suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option?.children
                  ?.toString()
                  .toLowerCase()
                  .includes(input.toLowerCase()) ?? false
              }
              onChange={() => {
                form.setFields([
                  { name: ["individualAccount", "region"], value: undefined },
                  { name: ["individualAccount", "town"], value: undefined },
                ]);
              }}
            >
              <Option
                key="United Kingdom"
                value="United Kingdom"
                className="modal-select"
              >
                United Kingdom
              </Option>

              {countries.map((country) => (
                <Option key={country} value={country} className="modal-select">
                  {country}
                </Option>
              ))}
            </Select>
          </Form.Item> */}
        </Col>

        {/* <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Region:"
            name={["individualAccount", "region"]}
            rules={[
              { required: individualCountry === "United Kingdom", message: "" },
            ]}
          >
            <Select
              disabled={individualCountry !== "United Kingdom"}
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
        </Col> */}

        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Region:"
            name={["individualAccount", "region"]}
            // rules={[{ required: true, message: "" }]}
          >
            <Select
              key={selectedCountry?.isoCode}
              showSearch
              disabled={!selectedCountry}
              placeholder="Search region"
              options={states.map((state) => ({
                label: state.name,
                value: state.name,
              }))}
              onChange={() => {
                form.resetFields([["individualAccount", "town"]]);
              }}
              suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
              // optionFilterProp="label"
              // filterOption={(input, option) =>
              //   (option?.label as string)
              //     ?.toLowerCase()
              //     .includes(input.toLowerCase())
              // }
            />
          </Form.Item>
        </Col>

        {/* <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Region:"
            name={["individualAccount", "region"]}
            rules={[{ required: true, message: "" }]}
          >
            <Select
              key={selectedCountry?.isoCode}
              showSearch
              disabled={!selectedCountry}
              placeholder="Search region"
              optionFilterProp="children"
              onChange={() => {
                form.setFieldValue(["individualAccount", "town"], undefined);
              }}
              filterOption={(input, option) =>
                option?.children
                  ?.toString()
                  .toLowerCase()
                  .includes(input.toLowerCase()) ?? false
              }
              suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
            >
              {states.map((state) => (
                <Option
                  key={state.isoCode}
                  value={state.name}
                  className="modal-select"
                >
                  {state.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col> */}

        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Town:"
            name={["individualAccount", "town"]}
            // rules={[{ required: true, message: "" }]}
          >
            <Select
              key={`${selectedCountry?.isoCode}-${selectedState?.isoCode}`}
              showSearch
              disabled={!selectedState}
              placeholder="Search town"
              options={cities?.map((city) => ({
                label: city.name,
                value: city.name,
              }))}
              suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
              // optionFilterProp="label"
              // filterOption={(input, option) =>
              //   (option?.label as string)
              //     .toLowerCase()
              //     .includes(input.toLowerCase())
              // }
            />
          </Form.Item>
        </Col>

        {/* <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Town:"
            name={["individualAccount", "town"]}
            rules={[{ required: true, message: "" }]}
          >
            <Select
              key={selectedCountry?.isoCode}
              showSearch
              disabled={!selectedCountry}
              placeholder="Search town"
              optionFilterProp="children"
              // onChange={() => {
              //   form.setFieldsValue({
              //     individualAccount: {
              //       ...form.getFieldValue("individualAccount"),
              //       town: undefined,
              //     },
              //   });
              // }}
              filterOption={(input, option) =>
                option?.children
                  ?.toString()
                  .toLowerCase()
                  .includes(input.toLowerCase()) ?? false
              }
              suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
            >
              {cities?.map((city) => (
                <Option
                  key={`${city.countryCode}-${city.name}`}
                  value={city.name}
                  className="modal-select"
                >
                  {city.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col> */}
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Street Name:"
            name={["individualAccount", "streetName"]}
            rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Postcode:"
            name={["individualAccount", "postcode"]}
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
            name={["individualAccount", "movedInDate"]}
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
            name={["individualAccount", "phones", 0, "number"]}
            rules={[{ required: true, message: "" }]}
          >
            {/* <PhoneInput country={"gb"} enableSearch /> */}
            <PhoneInput
              country="gb"
              enableSearch
              prefix="+"
              countryCodeEditable={false}
              inputStyle={{ width: "100%" }}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Mobile Phone:"
            name={["individualAccount", "phones", 1, "number"]}
            rules={[{ required: true, message: "" }]}
          >
            <PhoneInput
              country="gb"
              enableSearch
              prefix="+"
              countryCodeEditable={false}
              inputStyle={{ width: "100%" }}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Email Address:"
            name={["individualAccount", "email"]}
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
            name={["individualAccount", "confirmEmail"]}
            rules={[
              { required: true, message: "" },
              { type: "email", message: "" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      {/* </Card> */}
    </div>
  );
};

export default IndividualAccountStep;
