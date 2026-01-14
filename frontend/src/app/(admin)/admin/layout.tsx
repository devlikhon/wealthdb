"use client";

import { Layout } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import "./layout.css";
import PageLoader from "@/app/components/PageLoader";
import LeftSidebar from "@/app/components/Dashboard/LseftSideBar/LseftSideBar";
import RightSide from "@/app/components/Dashboard/RightSide/RightSide";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`, {
          withCredentials: true,
        });
        setLoading(false);
      } catch {
        router.replace("/");
      }
    };
    checkAuth();
  }, [router]);

  if (loading) return <PageLoader />;

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
      <LeftSidebar logout={logout} pathname={pathname} />
      <RightSide>{children}</RightSide>
    </Layout>
  );
};

export default AdminLayout;

// "use client";

// import { Layout, Menu, Button, Image } from "antd";
// import {
//   DashboardOutlined,
//   UserOutlined,
//   TeamOutlined,
//   LogoutOutlined,
//   CalendarOutlined,
//   FileTextOutlined,
//   DollarOutlined,
//   MailOutlined,
// } from "@ant-design/icons";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { usePathname } from "next/navigation";
// import PageLoader from "../components/PageLoader";

// const { Sider, Content, Footer } = Layout;

// const AdminLayout = ({ children }: { children: React.ReactNode }) => {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const pathname = usePathname();

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`, {
//           withCredentials: true,
//         });
//         setLoading(false);
//       } catch {
//         router.replace("/");
//       }
//     };
//     checkAuth();
//   }, [router]);

//   if (loading) return <PageLoader />;

//   const logout = async () => {
//     await axios.post(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`,
//       {},
//       { withCredentials: true }
//     );
//     router.replace("/");
//   };

//   const menuItems = [
//     {
//       key: "/admin/dashboard",
//       label: "Dashboard",
//       icon: <DashboardOutlined />,
//     },
//     {
//       key: "/admin/deal-tickets",
//       label: "Deal Tickets",
//       icon: <FileTextOutlined />,
//     },
//     { key: "/admin/crm", label: "CRM", icon: <TeamOutlined /> },
//     { key: "/admin/calendar", label: "Calendar", icon: <CalendarOutlined /> },
//     {
//       key: "/admin/applications",
//       label: "Account Applications",
//       icon: <FileTextOutlined />,
//     },
//     { key: "/admin/clients", label: "Clients", icon: <UserOutlined /> },
//     { key: "/admin/funding", label: "Funding", icon: <DollarOutlined /> },
//     { key: "/admin/invoices", label: "Invoices", icon: <FileTextOutlined /> },
//     {
//       key: "/admin/calculator",
//       label: "Investment Calculator",
//       icon: <DollarOutlined />,
//     },
//     { key: "/admin/messages", label: "Email Messages", icon: <MailOutlined /> },
//     {
//       key: "/admin/leaderboard",
//       label: "Sales Leaderboard",
//       icon: <TeamOutlined />,
//     },
//   ];

//   return (
//     <Layout style={{ minHeight: "100vh" }}>
//       {/* Sidebar */}
//       <Sider width={250} className="SideBarContainer BoxShadow">
//         <div
//           className="BrandingLogo"
//           style={{ padding: "20px", textAlign: "center" }}
//         >
//           <Image
//             src="/asset-brand/lkMUZLi51d9K.png"
//             alt="Aviva Wealth"
//             title="Aviva Wealth"
//             style={{ width: "150px" }}
//           />
//         </div>

//         <Menu
//           theme="dark"
//           mode="inline"
//           selectedKeys={[pathname]}
//           items={menuItems}
//           onClick={({ key }) => router.push(key)}
//           style={{ borderRight: 0 }}
//         />

//         <Footer
//           className="FooterContainer"
//           style={{ color: "#fff", textAlign: "center" }}
//         >
//           © 2026 Aviva Wealth. All Rights Reserved.
//         </Footer>
//       </Sider>
//       {/* Main content */}
//       <Layout className="MainContentContainer">
//         <div
//           className="HeaderInformationBar ClearFix"
//           style={{ padding: "10px 24px" }}
//         >
//           <ul
//             className="ClearFix"
//             style={{ display: "flex", gap: "20px", listStyle: "none" }}
//           >
//             <li>
//               <i className="fad fa-map-marker-minus"></i> Europe/London
//             </li>
//             <li>
//               <i className="fad fa-calendar-alt"></i> Tuesday 13 Jan 2026
//             </li>
//             <li>
//               <i className="fad fa-clock"></i> 05:22:16 GMT
//             </li>
//             <li>
//               <i className="fad fa-user-circle"></i>{" "}
//               alex.whitmore@avivaonlineportal.com
//             </li>
//           </ul>
//           <Button
//             icon={<LogoutOutlined />}
//             onClick={logout}
//             style={{ float: "right", marginTop: -30 }}
//           >
//             Logout
//           </Button>
//         </div>

//         <Content
//           style={{ margin: "24px", background: "#fff", padding: "24px" }}
//         >
//           {children}
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default AdminLayout;

// "use client";

// import { Layout, Menu, Button } from "antd";
// import {
//   DashboardOutlined,
//   TeamOutlined,
//   LogoutOutlined,
// } from "@ant-design/icons";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { usePathname } from "next/navigation";
// import PageLoader from "../components/PageLoader";

// const { Sider, Content } = Layout;

// const AdminLayout = ({ children }: { children: React.ReactNode }) => {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);

//   const pathname = usePathname();

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`, {
//           withCredentials: true,
//         });
//         setLoading(false); // ✅ auth ok
//       } catch {
//         router.replace("/"); // ❌ not logged in
//       }
//     };

//     checkAuth();
//   }, [router]);

//   // 🚫 BLOCK UI RENDER (THIS FIXES THE FLASH)
//   if (loading) {
//     return <PageLoader />;
//   }

//   const logout = async () => {
//     await axios.post(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`,
//       {},
//       { withCredentials: true }
//     );
//     router.replace("/");
//   };

//   return (
//     <Layout style={{ minHeight: "100vh" }}>
//       <Sider>
//         <Menu
//           theme="dark"
//           mode="inline"
//           selectedKeys={[pathname]}
//           items={[
//             { key: "/admin/dashboard", label: "Dashboard" },
//             { key: "/admin/applications", label: "Deal Tickets" },
//             { key: "/admin/crm", label: "CRM" },
//             { key: "/admin/calendar", label: "Calendar" },
//             { key: "/admin/applications", label: "Account Applications" },
//             { key: "/admin/clients", label: "Clients" },
//             { key: "/admin/funding", label: "Funding" },
//             { key: "/admin/invoices", label: "Invoices" },
//             { key: "/admin/calculator", label: "Investment Calculator" },
//             { key: "/admin/messages", label: "Email Messages" },
//             { key: "/admin/leaderboard", label: "Sales Leaderboard" },
//           ]}
//           onClick={({ key }) => router.push(key)}
//         />
//       </Sider>

//       <Layout>
//         <Content style={{ padding: 24 }}>
//           <Button
//             icon={<LogoutOutlined />}
//             onClick={logout}
//             style={{ float: "right", marginBottom: 10 }}
//           >
//             Logout
//           </Button>
//           {children}
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default AdminLayout;
