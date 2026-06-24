"use client";

import { Layout } from "antd";
import PageLoader from "@/app/components/PageLoader";
import LeftSidebar from "@/app/components/Dashboard/LeftSideBar/LeftSideBar";
import RightSide from "@/app/components/Dashboard/RightSide/RightSide";
import { useGlobal } from "@/app/Auth/GlobalProvider/GlobalProvider";
import { usePathname, useSearchParams } from "next/navigation";
import "./layout.css";
import { useEffect } from "react";

const { Footer } = Layout;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useGlobal();
  const pathname = usePathname();

  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("impersonation");

    if (!token) return;

    // localStorage.setItem("impersonationToken", token);
    sessionStorage.setItem("impersonationToken", token);

    window.history.replaceState({}, "", "/user/dashboard");

    window.location.reload();
  }, [searchParams]);

  if (loading) return <PageLoader />;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <LeftSidebar pathname={pathname} />

      <RightSide>{children}</RightSide>

      <Footer className="mobile-footer-container">
        © {new Date().getFullYear()} Deutsche Bank Wealth. All Rights Reserved.
      </Footer>
    </Layout>
  );
}
