"use client";

import { Layout } from "antd";
import PageLoader from "@/app/components/PageLoader";
import LeftSidebar from "@/app/components/Dashboard/LeftSideBar/LeftSideBar";
import RightSide from "@/app/components/Dashboard/RightSide/RightSide";
import { useGlobal } from "@/app/Auth/GlobalProvider/GlobalProvider";
import { usePathname } from "next/navigation";
import "./layout.css";

const { Footer } = Layout;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useGlobal();
  const pathname = usePathname();

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
