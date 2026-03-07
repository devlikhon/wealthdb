"use client";
import { Layout, Menu } from "antd";
import { useRouter } from "next/navigation";
import { useGlobal } from "@/app/Auth/GlobalProvider/GlobalProvider";
import HeaderLogo from "@/app/components/SVG/HeaderLogoSVG";

const { Sider } = Layout;

const userMenu = [
  { key: "/user/dashboard", label: "Dashboard" },
  { key: "/user/applications", label: "Applications" },
  { key: "/user/invoices", label: "Invoices" },
  { key: "logout", label: "Logout" },
];

interface UserSidebarProps {
  pathname: string;
  logout?: () => void;
}

const UserSidebar: React.FC<UserSidebarProps> = ({ pathname, logout }) => {
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
        items={userMenu}
        onClick={onMenuClick}
      />
    </Sider>
  );
};

export default UserSidebar;
