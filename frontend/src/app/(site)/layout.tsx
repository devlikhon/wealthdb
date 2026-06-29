"use client";

import PageLoader from "../components/PageLoader";
import { Layout } from "antd";
import "./layout.css";
import GlobalHeader from "../components/GlobalHeader/GlobalHeader";
import { useGlobal } from "../Auth/GlobalProvider/GlobalProvider";

const { Footer } = Layout;

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [loading, setLoading] = useState(true);
  const { loading } = useGlobal();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 100);

  //   return () => clearTimeout(timer);
  // }, []);

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
