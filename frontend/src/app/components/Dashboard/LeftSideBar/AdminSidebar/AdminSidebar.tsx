"use client";
import { Layout, Menu } from "antd";
import { useRouter } from "next/navigation";
import { useGlobal } from "@/app/Auth/GlobalProvider/GlobalProvider";
import HeaderLogo from "@/app/components/SVG/HeaderLogoSVG";

const { Sider } = Layout;

const adminMenu = [
  { key: "/admin/dashboard", label: "Dashboard" },
  { key: "/admin/deal-tickets", label: "Deal Tickets" },
  { key: "/admin/leaderboard", label: "Sales Leaderboard" },
  { key: "logout", label: "Logout" },
];

interface AdminSidebarProps {
  pathname: string;
  logout?: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ pathname, logout }) => {
  const router = useRouter();

  const onMenuClick = ({ key }: { key: string }) => {
    if (key === "logout") logout?.();
    else router.push(key);
  };

  return (
    <Sider width={225} className="sidebar-container desktop-sidebar">
      <div className="branding-logo">
        <HeaderLogo />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[pathname]}
        items={adminMenu}
        onClick={onMenuClick}
      />
    </Sider>
  );
};

export default AdminSidebar;
