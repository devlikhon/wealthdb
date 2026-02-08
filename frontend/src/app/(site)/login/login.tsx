"use client";

import { useEffect, useState } from "react";
import PageLoader from "../../components/PageLoader";
import LoginForm from "../../components/LoginForm/LoginForm";
import ForgotModal from "../../components/ForgotModal/ForgotModal";
import LoginIllustration from "../../components/SVG/LoginIllustrationSVG";

const Login = () => {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"email" | "password" | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100); // small delay for UX (optional)

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <main className="login-content">
      <div className="login-left">
        <h1 className="login-title">Deutsche Wealth Online UK</h1>

        <LoginForm />

        <div className="forgot">
          Forgot{" "}
          <a
            onClick={() => {
              setType("email");
              setOpen(true);
            }}
          >
            Email
          </a>{" "}
          or{" "}
          <a
            onClick={() => {
              setType("password");
              setOpen(true);
            }}
          >
            Password?
          </a>
        </div>

        <ForgotModal open={open} type={type} onClose={() => setOpen(false)} />
      </div>

      {/* Right Illustration */}
      <div className="login-right">
        <LoginIllustration />
      </div>
    </main>
  );
};

export default Login;
