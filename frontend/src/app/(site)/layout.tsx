"use client";

import { useEffect, useState } from "react";
import PageLoader from "../components/PageLoader";
import { Layout } from "antd";
import "./layout.css";
import GlobalHeader from "../components/GlobalHeader/GlobalHeader";

const { Footer } = Layout;

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <PageLoader />;

  return (
    <>
      <GlobalHeader />
      <main>{children}</main>
      <Footer className="main-footer">
        © {new Date().getFullYear()} Deutsche Bank Wealth. All Rights Reserved.
      </Footer>
    </>
  );
}
