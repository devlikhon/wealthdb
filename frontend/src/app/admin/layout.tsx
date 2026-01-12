"use client";

import { Layout, Menu, Button } from "antd";
import {
  DashboardOutlined,
  TeamOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PageLoader from "../components/PageLoader";

const { Sider, Content } = Layout;

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`, {
          withCredentials: true,
        });
        setLoading(false); // ✅ auth ok
      } catch {
        router.replace("/"); // ❌ not logged in
      }
    };

    checkAuth();
  }, [router]);

  // 🚫 BLOCK UI RENDER (THIS FIXES THE FLASH)
  if (loading) {
    return <PageLoader />;
  }

  const logout = async () => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`,
      {},
      { withCredentials: true }
    );
    router.replace("/");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <Menu
          theme="dark"
          mode="inline"
          items={[
            { key: "1", icon: <DashboardOutlined />, label: "Dashboard" },
            { key: "2", icon: <TeamOutlined />, label: "Leads" },
          ]}
        />
      </Sider>

      <Layout>
        <Content style={{ padding: 24 }}>
          <Button
            icon={<LogoutOutlined />}
            onClick={logout}
            style={{ float: "right", marginBottom: 10 }}
          >
            Logout
          </Button>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
