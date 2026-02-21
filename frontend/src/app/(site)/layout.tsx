"use client";

import { useEffect, useState } from "react";
import LoginHeader from "../components/LoginHeader/LoginHeader";
import PageLoader from "../components/PageLoader";

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
      <LoginHeader />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
}
