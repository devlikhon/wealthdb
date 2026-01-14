"use client";

import Link from "next/link";
import "./LoginHeader.css";
import LoginHeaderLogo from "../SVG/HeaderLogoSVG";
import Envelop from "../SVG/EnvelopSVG";
import Faq from "../SVG/FAQSVG";
import Slash from "../SVG/SlashSVG";

const LoginHeader = () => {
  return (
    <header className="login-header">
      {/* <div className="logo">
        Deutsche Bank
        <br />
        <span>Wealth Management</span>
      </div> */}
      <Link href="/">
        <LoginHeaderLogo />
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

        <Slash />
      </div>
    </header>
  );
};

export default LoginHeader;
