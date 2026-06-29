"use client";

import Link from "next/link";
import { Flex, Space, Grid, Layout } from "antd";
import HeaderLogo from "../SVG/HeaderLogoSVG";
import Slash from "../SVG/SlashSVG";
import Envelop from "../SVG/EnvelopSVG";
import Faq from "../SVG/FAQSVG";
import "./GlobalHeader.css";

const { useBreakpoint } = Grid;
const { Header } = Layout;

const GlobalHeader = () => {
  const screens = useBreakpoint();

  return (
    <Header
      style={{
        background: "transparent",
        height: "auto",
        lineHeight: "normal",
        padding: 0,
      }}
    >
      <Flex
        justify="space-between"
        align="center"
        vertical={!screens.md}
        gap={screens.md ? 0 : 24}
        style={{
          padding: screens.md ? "20px 60px" : "20px",
        }}
      >
        <Link href="/">
          <Flex align="center" gap={12}>
            <HeaderLogo />
            <Slash />
          </Flex>
        </Link>

        <Space size={32} wrap>
          <Link href="/contact-us" className="header-link">
            <Flex align="center" gap={8}>
              <Envelop />
              Contact Us
            </Flex>
          </Link>

          <Link href="/faq" className="header-link">
            <Flex align="center" gap={8}>
              <Faq />
              FAQ
            </Flex>
          </Link>
        </Space>
      </Flex>
    </Header>
  );
};

export default GlobalHeader;
