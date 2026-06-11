"use client";

import Link from "next/link";
import Envelop from "../SVG/EnvelopSVG";
import Faq from "../SVG/FAQSVG";
import Slash from "../SVG/SlashSVG";
import "./LoginHeader.css";
import "@/app/components/SVG/svg.css";
import Flex from "antd/es/flex";
import HeaderLogo from "../SVG/HeaderLogoSVG";

const LoginHeader = () => {
  return (
    <header className="login-header">
      {/* <div className="logo">
        Deutsche Bank
        <br />
        <span>Wealth Management</span>
      </div> */}
      <Link href="/">
        {/* <LoginHeaderLogo /> */}
        <Flex align="center" justify="space-between">
          <HeaderLogo />

          <Slash />
        </Flex>
      </Link>

      <div className="header-actions">
        <Link href="/contact-us" className="header-links">
          <Envelop />
          Contact Us
        </Link>

        <Link href="/faq" className="header-links">
          <Faq />
          FAQ
        </Link>

        {/* <Slash /> */}
      </div>
    </header>
  );
};

export default LoginHeader;
