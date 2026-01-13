import LoginHeader from "../components/LoginHeader/LoginHeader";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LoginHeader />
      {children}
    </>
  );
}
