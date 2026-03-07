// /* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Layout, Menu, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import "./LeftSideBar.css";
import HeaderLogo from "../../SVG/HeaderLogoSVG";

const { Sider } = Layout;

interface LeftSidebarProps {
  pathname: string;
  logout?: () => void;
}

const menuItems = [
  { key: "/admin/dashboard", label: "Dashboard" },
  { key: "/admin/deal-tickets", label: "Deal Tickets" },
  {
    key: "/admin/crm",
    label: "CRM",
    children: [
      { key: "/admin/crm/all-leads", label: "All Leads" },
      { key: "/admin/crm/assigned-leads", label: "My Leads" },
      { key: "/admin/crm/prospect-leads", label: "Prospects" },
      { key: "/admin/crm/client-leads", label: "Clients" },
      { key: "/admin/crm/dead-leads", label: "Deads" },
      {
        key: "/admin/crm/prospect-future",
        label: "Prospects for the Future",
      },
      {
        key: "/admin/crm/all-lead-notes",
        label: "Latest Lead Notes",
      },
    ],
  },
  // {
  //   key: "/admin/calendar",
  //   label: "Calendar",
  //   children: [
  //     {
  //       key: "/admin/calendar/upcoming-calender-appointments",
  //       label: "Scheduled Calendar Appointments",
  //     },
  //     {
  //       key: "/admin/calendar/past-calender-appointments",
  //       label: "Past Calendar Appointments",
  //     },
  //     {
  //       key: "/admin/calendar/all-calendar-appointments",
  //       label: "All Calendar Appointments",
  //     },
  //   ],
  // },
  {
    key: "/admin/applications",
    label: "Account Applications",
    children: [
      {
        key: "/admin/applications/rejected-applications",
        label: "Rejected Applications",
      },
      {
        key: "/admin/applications/incomplete-applications",
        label: "Incomplete Applications",
      },
      {
        key: "/admin/applications/completed-applications",
        label: "Completed Applications",
      },
      {
        key: "/admin/applications/all-applications",
        label: "All Applications",
      },
    ],
  },
  {
    key: "/admin/clients",
    label: "Clients",
    children: [
      {
        key: "/admin/clients/all-clients",
        label: "All Clients",
      },
    ],
  },
  {
    key: "/admin/funding",
    label: "Funding",
    children: [
      {
        key: "/admin/funding/open-funding",
        label: "Open Funding",
      },
      {
        key: "/admin/funding/completed-funding",
        label: "Completed Funding",
      },
    ],
  },
  {
    key: "/admin/invoices",
    label: "Invoices",
    children: [
      {
        key: "/admin/invoices/open-invoices",
        label: "Open Invoices",
      },
      {
        key: "/admin/invoices/paid-invoices",
        label: "Paid Invoices",
      },
      {
        key: "/admin/invoices/all-invoices",
        label: "All Invoices",
      },
    ],
  },
  { key: "/admin/investment-calculator", label: "Investment Calculator" },
  {
    key: "/admin/email-messages",
    label: "Email Messages",
    // children: [
    //   {
    //     key: "/admin/email/all-email-messages",
    //     label: "All Email Messages",
    //   },
    // ],
  },
  { key: "/admin/leaderboard", label: "Sales Leaderboard" },
  { key: "logout", label: "Logout" },
];

const LeftSidebar: React.FC<LeftSidebarProps> = ({ pathname, logout }) => {
  const router = useRouter();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const rootSubmenuKeys = menuItems
    .filter((item) => item.children)
    .map((item) => item.key);

  const onMenuClick = ({ key }: { key: string }) => {
    if (key === "logout") {
      logout?.();
    } else {
      router.push(key);
    }
    setDrawerVisible(false);
  };

  const onOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find((key) => !openKeys.includes(key));

    if (latestOpenKey && rootSubmenuKeys.includes(latestOpenKey)) {
      setOpenKeys([latestOpenKey]); // close others
    } else {
      setOpenKeys(keys);
    }
  };

  return (
    <>
      {/* Mobile Logo */}
      <div className="mobile-logo-container">
        {/* <img
          src="/img/aviva logo.png"
          alt="Aviva Wealth"
          className="mobile-logo"
        /> */}
        <HeaderLogo />
      </div>

      {/* Mobile Hamburger + Dropdown menu */}
      <div className="mobile-menuWrapper">
        <Button
          className="mobile-hamburger"
          onClick={() => setDrawerVisible(!drawerVisible)}
        >
          <MenuOutlined className="hamburger-icon" />

          {/* Custom SVG arrow */}
          <svg
            className={`arrow ${drawerVisible ? "open" : ""}`}
            width="16"
            height="16"
            viewBox="0 0 20 14"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              d="M3 3l7 7 7-7"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>

        {/* Dropdown menu under button with smooth animation */}
        <div className={`mobile-dropdown-menu ${drawerVisible ? "open" : ""}`}>
          <Menu
            mode="inline"
            selectedKeys={[pathname]}
            items={menuItems}
            onClick={onMenuClick}
          />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <Sider
        width={225}
        className="sidebar-container desktop-sidebar"
        breakpoint="lg"
        collapsedWidth={0}
      >
        <div className="branding-logo">
          {/* <img src="/img/aviva logo.png" alt="Aviva Wealth" /> */}
          <HeaderLogo />
        </div>

        {/* <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
          onClick={onMenuClick}
          style={{ border: 0 }}
        /> */}

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          items={menuItems}
          onClick={onMenuClick}
          style={{ border: 0 }}
        />

        {/* <Footer className="footer-container">
          © {new Date().getFullYear()} Aviva Wealth. All Rights Reserved.
        </Footer> */}
      </Sider>
    </>
  );
};

export default LeftSidebar;

// /* eslint-disable @next/next/no-img-element */
// "use client";

// import { useState } from "react";
// import { Layout, Menu, Button } from "antd";
// import { MenuOutlined } from "@ant-design/icons";
// import { useRouter } from "next/navigation";
// import "./LseftSideBar.css";

// const { Sider, Footer } = Layout;

// interface LeftSidebarProps {
//   pathname: string;
//   logout?: () => void;
// }

// const LeftSidebar: React.FC<LeftSidebarProps> = ({ pathname, logout }) => {
//   const router = useRouter();
//   const [drawerVisible, setDrawerVisible] = useState(false);

//   const menuItems = [
//     { key: "/admin/dashboard", label: "Dashboard" },
//     { key: "/admin/deal-tickets", label: "Deal Tickets" },
//     {
//       key: "/admin/crm",
//       label: "CRM",
//       children: [
//         { key: "/admin/crm/all-leads", label: "All Leads" },
//         { key: "/admin/crm/my-leads", label: "My Leads" },
//         { key: "/admin/crm/prospects", label: "Prospects" },
//         { key: "/admin/crm/clients", label: "Clients" },
//       ],
//     },
//     { key: "/admin/calendar", label: "Calendar" },
//     { key: "/admin/applications", label: "Account Applications" },
//     { key: "/admin/clients", label: "Clients" },
//     { key: "/admin/funding", label: "Funding" },
//     { key: "/admin/invoices", label: "Invoices" },
//     { key: "/admin/calculator", label: "Investment Calculator" },
//     { key: "/admin/messages", label: "Email Messages" },
//     { key: "/admin/leaderboard", label: "Sales Leaderboard" },
//     { key: "logout", label: "Logout" },
//   ];

//   const onMenuClick = ({ key }: { key: string }) => {
//     if (key === "logout") {
//       logout?.();
//     } else {
//       router.push(key);
//     }
//     setDrawerVisible(false);
//   };

//   return (
//     <>
//       {/* Mobile Logo */}
//       <div className="MobileLogoContainer">
//         <img
//           src="/img/aviva logo.png"
//           alt="Aviva Wealth"
//           className="MobileLogo"
//         />
//       </div>

//       {/* Mobile Hamburger + Dropdown menu */}
//       <div className="MobileMenuWrapper">
//         <Button
//           className="MobileHamburger"
//           onClick={() => setDrawerVisible(!drawerVisible)}
//         >
//           <MenuOutlined className="HamburgerIcon" />

//           {/* Custom SVG arrow */}
//           <svg
//             className={`arrow ${drawerVisible ? "open" : ""}`}
//             width="16"
//             height="16"
//             viewBox="0 0 20 14"
//             preserveAspectRatio="xMidYMid meet"
//           >
//             <path
//               d="M3 3l7 7 7-7"
//               fill="none"
//               stroke="#fff"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         </Button>

//         {/* Dropdown menu under button */}
//         {drawerVisible && (
//           <div className="MobileDropdownMenu">
//             <Menu
//               mode="inline"
//               selectedKeys={[pathname]}
//               items={menuItems}
//               onClick={onMenuClick}
//             />
//           </div>
//         )}
//       </div>

//       {/* Desktop Sidebar */}
//       <Sider
//         width={225}
//         className="SideBarContainer BoxShadow DesktopSidebar"
//         breakpoint="lg"
//         collapsedWidth={0}
//       >
//         <div className="branding-logo">
//           <img src="/img/aviva logo.png" alt="Aviva Wealth" />
//         </div>

//         <Menu
//           theme="dark"
//           mode="inline"
//           selectedKeys={[pathname]}
//           items={menuItems}
//           onClick={onMenuClick}
//           style={{ border: 0 }}
//         />

//         <Footer className="FooterContainer">
//           © {new Date().getFullYear()} Aviva Wealth. All Rights Reserved.
//         </Footer>
//       </Sider>
//     </>
//   );
// };

// export default LeftSidebar;

// /* eslint-disable @next/next/no-img-element */
// "use client";

// import { useState } from "react";
// import { Layout, Menu, Drawer, Button } from "antd";
// import { DownOutlined, MenuOutlined, UpOutlined } from "@ant-design/icons";
// import { useRouter } from "next/navigation";
// import "./LseftSideBar.css";

// const { Sider, Footer } = Layout;
// const { SubMenu } = Menu;

// interface LeftSidebarProps {
//   pathname: string;
//   logout?: () => void;
// }

// const LeftSidebar: React.FC<LeftSidebarProps> = ({ pathname, logout }) => {
//   const router = useRouter();
//   const [drawerVisible, setDrawerVisible] = useState(false);

//   const menuItems = [
//     { key: "/admin/dashboard", label: "Dashboard" },
//     { key: "/admin/deal-tickets", label: "Deal Tickets" },
//     {
//       key: "/admin/crm",
//       label: "CRM",
//       children: [
//         { key: "/admin/crm/all-leads", label: "All Leads" },
//         { key: "/admin/crm/my-leads", label: "My Leads" },
//         { key: "/admin/crm/prospects", label: "Prospects" },
//         { key: "/admin/crm/clients", label: "Clients" },
//       ],
//     },
//     { key: "/admin/calendar", label: "Calendar" },
//     { key: "/admin/applications", label: "Account Applications" },
//     { key: "/admin/clients", label: "Clients" },
//     { key: "/admin/funding", label: "Funding" },
//     { key: "/admin/invoices", label: "Invoices" },
//     { key: "/admin/calculator", label: "Investment Calculator" },
//     { key: "/admin/messages", label: "Email Messages" },
//     { key: "/admin/leaderboard", label: "Sales Leaderboard" },
//     {
//       key: "logout",
//       label: "Logout",
//     },
//   ];

//   const onMenuClick = ({ key }: { key: string }) => {
//     if (key === "logout") {
//       logout?.();
//     } else {
//       router.push(key);
//     }
//     setDrawerVisible(false); // close drawer on mobile
//   };

//   return (
//     <>
//       {/* Hamburger for mobile */}

//       <Button
//         className="MobileHamburger"
//         onClick={() => setDrawerVisible(true)}
//         // onClick={() => setDrawerVisible(!drawerVisible)}
//       >
//         {/* Left: Hamburger */}
//         <MenuOutlined style={{ fontSize: "16px" }} />

//         {/* Right: Arrow changes based on drawer */}
//         {drawerVisible ? (
//           <UpOutlined style={{ fontSize: "16px" }} />
//         ) : (
//           <DownOutlined style={{ fontSize: "16px" }} />
//         )}
//       </Button>

//       {/* Drawer for mobile */}
//       <Drawer
//         title={
//           <img
//             src="/img/aviva logo.png"
//             alt="Aviva Wealth"
//             style={{ width: "150px" }}
//           />
//         }
//         placement="left"
//         onClose={() => setDrawerVisible(false)}
//         open={drawerVisible}
//         bodyStyle={{ padding: 0 }}
//       >
//         <Menu
//           mode="inline"
//           selectedKeys={[pathname]}
//           items={menuItems}
//           onClick={onMenuClick}
//         />
//       </Drawer>

//       {/* Sidebar for desktop */}
//       <Sider
//         width={225}
//         className="SideBarContainer BoxShadow DesktopSidebar"
//         breakpoint="lg"
//         collapsedWidth={0}
//       >
//         <div className="branding-logo">
//           <img src="/img/aviva logo.png" alt="Aviva Wealth" />
//         </div>

//         <Menu
//           theme="dark"
//           mode="inline"
//           selectedKeys={[pathname]}
//           items={menuItems}
//           onClick={onMenuClick}
//           style={{ border: 0 }}
//         />

//         <Footer className="FooterContainer">
//           © {new Date().getFullYear()} Aviva Wealth. All Rights Reserved.
//         </Footer>
//       </Sider>
//     </>
//   );
// };

// export default LeftSidebar;

// /* eslint-disable @next/next/no-img-element */
// "use client";

// import { Layout, Menu } from "antd";
// import { useRouter } from "next/navigation";
// import "./LseftSideBar.css";

// const { Sider, Footer } = Layout;

// interface LeftSidebarProps {
//   pathname: string;
//   logout: () => void;
// }

// const LeftSidebar: React.FC<LeftSidebarProps> = ({ pathname, logout }) => {
//   const router = useRouter();

//   const menuItems = [
//     { key: "/admin/dashboard", label: "Dashboard" },
//     { key: "/admin/deal-tickets", label: "Deal Tickets" },

//     // ✅ CRM with Submenu
//     {
//       key: "/admin/crm",
//       label: "CRM",
//       children: [
//         {
//           key: "/admin/crm/my-leads",
//           label: "My Leads",
//         },
//         {
//           key: "/admin/crm/prospects",
//           label: "Prospects",
//         },
//         {
//           key: "/admin/crm/clients",
//           label: "Clients",
//         },
//         {
//           key: "/admin/crm/dead-leads",
//           label: "Deads",
//         },
//         {
//           key: "/admin/crm/prospect-future",
//           label: "Prospects for the Future",
//         },
//         {
//           key: "/admin/crm/latest-lead-notes",
//           label: "Latest Lead Notes",
//         },
//       ],
//     },

//     { key: "/admin/calendar", label: "Calendar" },
//     { key: "/admin/applications", label: "Account Applications" },
//     { key: "/admin/clients", label: "Clients" },
//     { key: "/admin/funding", label: "Funding" },
//     { key: "/admin/invoices", label: "Invoices" },
//     { key: "/admin/calculator", label: "Investment Calculator" },
//     { key: "/admin/messages", label: "Email Messages" },
//     { key: "/admin/leaderboard", label: "Sales Leaderboard" },

//     {
//       key: "logout",
//       label: "Logout",
//     },
//   ];

//   return (
//     <Sider
//       // breakpoint="lg"
//       // collapsedWidth={0}
//       className="SideBarContainer BoxShadow"
//     >
//       <div className="branding-logo">
//         <img
//           src="/img/aviva logo.png"
//           alt="Aviva Wealth"
//           title="Aviva Wealth"
//         />
//       </div>

//       <Menu
//         theme="dark"
//         mode="inline"
//         selectedKeys={[pathname]}
//         // defaultOpenKeys={["/admin/crm"]}
//         items={menuItems}
//         onClick={({ key }) => {
//           if (key === "logout") {
//             logout?.();
//           } else {
//             router.push(key);
//           }
//         }}
//         style={{ border: 0 }}
//       />

//       <Footer className="FooterContainer">
//         © {new Date().getFullYear()} Aviva Wealth. All Rights Reserved.
//       </Footer>
//     </Sider>
//   );
// };

// export default LeftSidebar;
