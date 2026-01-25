"use client";

import { useState } from "react";
import axios from "axios";
import { message } from "antd";
import PageLoader from "@/app/components/PageLoader";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
        formData,
        { withCredentials: true },
      );

      message.success("Successfully login");

      // 🔥 Trigger proxy & navigation
      window.location.href = "/admin/dashboard";
    } catch {
      message.error("Invalid credentials");
      setLoading(false); // allow retry
    }
  };

  // 🔥 Show full-page loader during login
  if (loading) {
    return <PageLoader />;
  }

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;

// "use client";

// import { useEffect, useState } from "react";
// import PageLoader from "../../components/PageLoader";
// import LoginForm from "../../components/LoginForm/LoginForm";
// import ForgotModal from "../../components/ForgotModal/ForgotModal";
// import LoginIllustration from "../../components/SVG/LoginIllustrationSVG";

// const Login = () => {
//   const [loading, setLoading] = useState(true);
//   const [open, setOpen] = useState(false);
//   const [type, setType] = useState<"email" | "password" | null>(null);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 100); // small delay for UX (optional)

//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return <PageLoader />;
//   }

//   return (
//     <main className="login-content">
//       <div className="login-left">
//         <h1 className="login-title">Deutsche Wealth Online UK</h1>

//         <LoginForm />

//         <div className="forgot">
//           Forgot{" "}
//           <a
//             onClick={() => {
//               setType("email");
//               setOpen(true);
//             }}
//           >
//             Email
//           </a>{" "}
//           or{" "}
//           <a
//             onClick={() => {
//               setType("password");
//               setOpen(true);
//             }}
//           >
//             Password?
//           </a>
//         </div>

//         <ForgotModal open={open} type={type} onClose={() => setOpen(false)} />
//       </div>

//       {/* Right Illustration */}
//       <div className="login-right">
//         <LoginIllustration />
//       </div>
//     </main>
//   );
// };

// export default Login;
