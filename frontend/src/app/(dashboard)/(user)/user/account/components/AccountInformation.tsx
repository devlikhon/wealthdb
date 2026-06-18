/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGlobal } from "@/app/Auth/GlobalProvider/GlobalProvider";
import { faChevronDown, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Col,
  Form,
  Grid,
  Input,
  InputNumber,
  Row,
  Select,
  Typography,
} from "antd";
import { regions, titles } from "@/app/components/types/arrays/arrays";
import "../../dashboard/dashboard.css";
import { useEffect } from "react";
import { getNames } from "country-list";
import { debounce } from "lodash";

const { Title } = Typography;

const countries = getNames();

const { Option } = Select;

const AccountInformation = () => {
  const [form] = Form.useForm();

  const { useBreakpoint } = Grid;

  const screens = useBreakpoint();

  const { user, applicants, updateApplicant } = useGlobal();

  // ✅ compute currentUser dynamically whenever applicants or user changes
  const currentUser = applicants?.find(
    (applicant) => applicant.email === user?.email,
  );

  const account =
    currentUser?.individualAccount ||
    currentUser?.jointAccount ||
    currentUser?.companyAccount;

  const accountKey = currentUser?.individualAccount
    ? "individualAccount"
    : currentUser?.jointAccount
      ? "jointAccount"
      : "companyAccount";

  // console.log("Current User", currentUser);

  // 🔹 Auto-save / update handler (debounced)
  const handleAutoSave = debounce((values: any) => {
    console.log("Auto updating form data:", { [accountKey]: values.account });

    // TODO:
    // updateDealTicket(values)
  }, 500);

  // 🔹 Called on every field change
  const onValuesChange = (_changed: any, allValues: any) => {
    handleAutoSave(allValues);
  };

  const onFinish = (values: any) => {
    // console.log("Final Submit:", values);

    if (!currentUser?._id) return;

    updateApplicant(currentUser._id, {
      [accountKey]: values.account,
    });
  };

  useEffect(() => {
    if (account) {
      form.setFieldsValue({
        account: {
          title: account.title,
          firstName: account.firstName,
          middleName: account.middleName,
          lastName: account.lastName,
          houseNumberOrName: account.houseNumberOrName,
          streetName: account.streetName,
          town: account.town,
          region: account.region,
          country: account.country,
          postcode: account.postcode,
        },
      });
    }
  }, [account, form]);

  return (
    <Form
      form={form}
      layout="vertical"
      autoComplete="off"
      // onFinish={onFinish}
      // onValuesChange={handleAutoSave}
      onValuesChange={onValuesChange}
      onFinish={onFinish}
    >
      <Title
        level={5}
        style={{
          color: "var(--primary-color)",
          fontWeight: 500,
          display: "block",
          padding: "5px 10px",
          background: "#54595f3d",
          borderLeft: "4px solid var(--primary-color)",
        }}
      >
        Account Informations
      </Title>
      <Row gutter={16}>
        <Col xs={24} sm={12} md={6} lg={3}>
          <Form.Item
            label="Title:"
            name={["account", "title"]}
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

        <Col xs={24} sm={12} md={6} lg={7}>
          <Form.Item
            label="First Name:"
            name={["account", "firstName"]}
            rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={6} lg={7}>
          <Form.Item label="Middle Name:" name={["account", "middleName"]}>
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={6} lg={7}>
          <Form.Item
            label="Last Name:"
            name={["account", "lastName"]}
            rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="House Number or Name:"
            name={["account", "houseNumberOrName"]}
            rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Street Name:"
            name={["account", "streetName"]}
            rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Town:"
            name={["account", "town"]}
            rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Region:"
            name={["account", "region"]}
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

        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Country:"
            name={["account", "country"]}
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
            name={["account", "postcode"]}
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
      </Row>

      <Row
        wrap
        justify={screens.md ? "end" : "center"}
        gutter={[12, 16]}
        className="modal-container-footer"
      >
        <Col>
          <Button type="primary" htmlType="submit" className="submit-btn">
            Update Account <FontAwesomeIcon icon={faFloppyDisk} />
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AccountInformation;
