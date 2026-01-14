import LoginHeader from "../components/LoginHeader/LoginHeader";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LoginHeader />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
}
