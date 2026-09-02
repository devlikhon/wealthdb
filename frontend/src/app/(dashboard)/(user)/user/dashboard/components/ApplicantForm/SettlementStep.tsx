import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Col,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Typography,
} from "antd";
import PhoneInput from "react-phone-input-2";
import { Country, State, City } from "country-state-city";
import { useEffect } from "react";

interface Props {
  form: FormInstance;
}

const { Option } = Select;

const { Text, Title } = Typography;

const SettlementStep = ({ form }: Props) => {
  const settlementType = Form.useWatch(
    ["settlement", "existingBankAccount", "type"],
    form,
  );

  const residentialCountry = Form.useWatch(
    ["settlement", "nextOfKin", "residentialAddressInformation", "country"],
    form,
  );

  const residentialAddressInformation = Form.useWatch(
    ["settlement", "nextOfKin", "residentialAddressInformation"],
    form,
  );

  // Get all countries
  const countries = Country.getAllCountries().map((country) => country.name);

  const residentialAddressInformationCountry =
    residentialAddressInformation?.country;
  const residentialAddressInformationRegion =
    residentialAddressInformation?.region;

  const selectedCountry = Country.getAllCountries().find(
    (c) => c.name === residentialAddressInformationCountry,
  );

  const states = selectedCountry
    ? State.getStatesOfCountry(selectedCountry.isoCode)
    : [];

  const selectedState = states.find(
    (s) => s.name === residentialAddressInformationRegion,
  );

  const cities =
    selectedCountry && selectedState
      ? City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode)
      : [];

  // console.log("residentialAddressInformationAccount?.region", residentialAddressInformationAccount?.region);

  useEffect(() => {
    form.setFieldValue(
      ["settlement", "nextOfKin", "residentialAddressInformation", "town"],
      undefined,
    );
  }, [form, residentialAddressInformationRegion]);

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
        Settlement Instructions
      </Title>

      <Text
        style={{
          color: "var(--foreground)",
          marginBottom: 16,
          display: "block",
        }}
      >
        Deutsche Bank requires that you select a preferred option for the
        settlement of your trades and payment of your coupons and maturities.
        The account nominated will be the one used to transact/fund your online
        account.
      </Text>

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
            Existing Bank Account
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
            This option is only available for accounts held with banks, building
            societies and credit unions within United Kingdom in the same
            account name as this application.
          </Text>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={24} md={24}>
          <Form.Item
            label="We need a copy of your identification. Please select from the following:"
            name={["settlement", "existingBankAccount", "type"]}
            rules={[{ required: true, message: "" }]}
          >
            <Radio.Group className="user-radio-group">
              <Radio value="bankAccountDetails">
                <Text style={{ color: "var(--foreground)", display: "block" }}>
                  Provide Existing Bank Account Details
                </Text>
                <Text style={{ color: "var(--foreground)", display: "block" }}>
                  Preferred account for the repayment of interest and
                  maturities.
                </Text>
              </Radio>

              <Radio value="emailBankAccountDetails">
                <Text style={{ color: "var(--foreground)", display: "block" }}>
                  Email Existing Bank Account Details
                </Text>
                <Text style={{ color: "var(--foreground)", display: "block" }}>
                  I will email my preferred account for the repayment of
                  interest and maturities.
                </Text>
              </Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>

      {settlementType === "bankAccountDetails" && (
        <>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Bank Name:"
                name={[
                  "settlement",
                  "existingBankAccount",
                  "bankAccountDetails",
                  "bankName",
                ]}
                rules={[{ required: true, message: "" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Account Name:"
                name={[
                  "settlement",
                  "existingBankAccount",
                  "bankAccountDetails",
                  "accountName",
                ]}
                rules={[{ required: true, message: "" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Sort Code:"
                name={[
                  "settlement",
                  "existingBankAccount",
                  "bankAccountDetails",
                  "sortCode",
                ]}
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

            <Col xs={24} md={12}>
              <Form.Item
                label="Account Number:"
                name={[
                  "settlement",
                  "existingBankAccount",
                  "bankAccountDetails",
                  "accountNumber",
                ]}
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
          </Row>
        </>
      )}

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
            Next Of Kin
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
            This option is only available for accounts held with banks, building
            societies and credit unions within United Kingdom in the same
            account name as this application.
          </Text>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            label="Contact Name:"
            name={[
              "settlement",
              "nextOfKin",
              "nextOfKinDetails",
              "contactName",
            ]}
          >
            <Input placeholder="Your next of kin name" />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label="Email Address:"
            name={[
              "settlement",
              "nextOfKin",
              "nextOfKinDetails",
              "emailAddress",
            ]}
            rules={[{ type: "email", message: "" }]}
          >
            <Input placeholder="email@domain.com" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            label="Home Phone:"
            name={[
              "settlement",
              "nextOfKin",
              "nextOfKinDetails",
              "phones",
              0,
              "number",
            ]}
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

        <Col xs={24} md={12}>
          <Form.Item
            label="Mobile Phone:"
            name={[
              "settlement",
              "nextOfKin",
              "nextOfKinDetails",
              "phones",
              1,
              "number",
            ]}
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
      </Row>

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
              display: "block",
              padding: "5px 10px",
              background: "#54595f3d",
              borderLeft: "4px solid var(--primary-color)",
              margin: 0,
            }}
          >
            Residential address information
          </Title>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            label="Address:"
            name={[
              "settlement",
              "nextOfKin",
              "residentialAddressInformation",
              "address",
            ]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label="Street Name:"
            name={[
              "settlement",
              "nextOfKin",
              "residentialAddressInformation",
              "streetName",
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            label="Country:"
            name={[
              "settlement",
              "nextOfKin",
              "residentialAddressInformation",
              "country",
            ]}
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
                  {
                    name: [
                      "settlement",
                      "nextOfKin",
                      "residentialAddressInformation",
                      "region",
                    ],
                    value: undefined,
                  },
                  {
                    name: [
                      "settlement",
                      "nextOfKin",
                      "residentialAddressInformation",
                      "town",
                    ],
                    value: undefined,
                  },
                ]);
              }}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label="Region:"
            name={[
              "settlement",
              "nextOfKin",
              "residentialAddressInformation",
              "region",
            ]}
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
                form.resetFields([
                  [
                    "settlement",
                    "nextOfKin",
                    "residentialAddressInformation",
                    "town",
                  ],
                ]);
              }}
              suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            label="Town:"
            name={[
              "settlement",
              "nextOfKin",
              "residentialAddressInformation",
              "town",
            ]}
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
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label="Post Code:"
            name={[
              "settlement",
              "nextOfKin",
              "residentialAddressInformation",
              "postcode",
            ]}
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
      </Row>
    </div>
  );
};

export default SettlementStep;

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import {
//   Col,
//   Form,
//   FormInstance,
//   Input,
//   InputNumber,
//   Radio,
//   Row,
//   Typography,
// } from "antd";

// interface Props {
//   form: FormInstance;
// }

// const { Text, Title } = Typography;

// const SettlementStep = ({ form }: Props) => {
//   const settlementType = Form.useWatch(
//     ["settlement", "existingBankAccount", "type"],
//     form,
//   );

//   // console.log("Type", settlementType);

//   return (
//     <div className="modal-container-col" style={{ paddingBottom: 0 }}>
//       <Title
//         level={4}
//         style={{
//           color: "var(--foreground)",
//           fontWeight: 500,
//           margin: 0,
//         }}
//       >
//         Settlement Instructions
//       </Title>

//       <Text
//         style={{
//           color: "var(--foreground)",
//           marginBottom: 16,
//           display: "block",
//         }}
//       >
//         Deutsche Bank requires that you select a preferred option for the
//         settlement of your trades and payment of your coupons and maturities.
//         The account nominated will be the one used to transact/fund your online
//         account.
//       </Text>

//       <Row
//         style={{
//           marginBottom: "var(--ant-form-item-margin-bottom)",
//         }}
//       >
//         <Col xs={24} sm={24} md={24}>
//           <Title
//             level={4}
//             style={{
//               color: "var(--foreground)",
//               fontWeight: 500,
//               margin: 0,
//             }}
//           >
//             Existing Bank Account
//           </Title>
//           <Text
//             style={{
//               color: "var(--foreground)",
//               display: "block",
//               fontSize: "1em",
//               lineHeight: "1.25em",
//               padding: "5px 10px",
//               background: "#54595f3d",
//               borderLeft: "4px solid var(--primary-color)",
//             }}
//           >
//             This option is only available for accounts held with banks, building
//             societies and credit unions within United Kingdom in the same
//             account name as this application.
//           </Text>
//         </Col>
//       </Row>

//       <Row gutter={16}>
//         <Col xs={24} sm={24} md={24}>
//           <Form.Item
//             label="We need a copy of your identification. Please select from the following:"
//             name={["settlement", "existingBankAccount", "type"]}
//             rules={[
//               {
//                 required: true,
//                 message: "",
//               },
//             ]}
//           >
//             <Radio.Group className="user-radio-group">
//               {/* Provide Existing Bank Account Details */}
//               <Radio value="bankAccountDetails">
//                 <Text
//                   style={{
//                     color: "var(--foreground)",
//                     display: "block",
//                   }}
//                 >
//                   Provide Existing Bank Account Details
//                 </Text>
//                 <Text
//                   style={{
//                     color: "var(--foreground)",
//                     display: "block",
//                   }}
//                 >
//                   Preferred account for the repayment of interest and
//                   maturities.
//                 </Text>
//               </Radio>

//               {/* Email Existing Bank Account Details */}
//               <Radio value="emailBankAccountDetails">
//                 <Text
//                   style={{
//                     color: "var(--foreground)",
//                     display: "block",
//                   }}
//                 >
//                   Email Existing Bank Account Details
//                 </Text>
//                 <Text
//                   style={{
//                     color: "var(--foreground)",
//                     display: "block",
//                   }}
//                 >
//                   I will email my preferred account for the repayment of
//                   interest and maturities.
//                 </Text>
//               </Radio>
//             </Radio.Group>
//           </Form.Item>
//         </Col>
//       </Row>

//       {settlementType === "bankAccountDetails" && (
//         <>
//           <Row gutter={16}>
//             <Col xs={24} md={12}>
//               <Form.Item
//                 label="Bank Name:"
//                 name={[
//                   "settlement",
//                   "existingBankAccount",
//                   "bankAccountDetails",
//                   "bankName",
//                 ]}
//                 rules={[{ required: true, message: "" }]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col xs={24} md={12}>
//               <Form.Item
//                 label="Account Name:"
//                 name={[
//                   "settlement",
//                   "existingBankAccount",
//                   "bankAccountDetails",
//                   "accountName",
//                 ]}
//                 rules={[{ required: true, message: "" }]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row gutter={16}>
//             <Col xs={24} md={12}>
//               <Form.Item
//                 label="Sort Code:"
//                 name={[
//                   "settlement",
//                   "existingBankAccount",
//                   "bankAccountDetails",
//                   "sortCode",
//                 ]}
//                 rules={[{ required: true, message: "" }]}
//               >
//                 <InputNumber
//                   style={{ width: "100%" }}
//                   controls={false} // no arrows
//                   min={0}
//                   stringMode
//                   onKeyDown={(e) => {
//                     if (
//                       !/[0-9]/.test(e.key) &&
//                       ![
//                         "Backspace",
//                         "Delete",
//                         "ArrowLeft",
//                         "ArrowRight",
//                         "Tab",
//                       ].includes(e.key)
//                     ) {
//                       e.preventDefault();
//                     }
//                   }}
//                 />
//               </Form.Item>
//             </Col>

//             <Col xs={24} md={12}>
//               <Form.Item
//                 label="Account Number:"
//                 name={[
//                   "settlement",
//                   "existingBankAccount",
//                   "bankAccountDetails",
//                   "accountNumber",
//                 ]}
//                 rules={[{ required: true, message: "" }]}
//               >
//                 <InputNumber
//                   style={{ width: "100%" }}
//                   controls={false} // no arrows
//                   min={0}
//                   stringMode
//                   onKeyDown={(e) => {
//                     if (
//                       !/[0-9]/.test(e.key) &&
//                       ![
//                         "Backspace",
//                         "Delete",
//                         "ArrowLeft",
//                         "ArrowRight",
//                         "Tab",
//                       ].includes(e.key)
//                     ) {
//                       e.preventDefault();
//                     }
//                   }}
//                 />
//               </Form.Item>
//             </Col>
//           </Row>
//         </>
//       )}
//     </div>
//   );
// };

// export default SettlementStep;
