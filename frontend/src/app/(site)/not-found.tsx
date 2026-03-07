"use client";

import { Button } from "antd";
import { useRouter } from "next/navigation";
import "./not-found.css";
import NotFoundSVG from "../components/SVG/NotFoundSVG";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="not-found-container">
      {/* Left: custom 404 image */}
      <div className="not-found-image">
        {/* <img src="/404.svg" alt="404" /> */}
        {/* Or use your inline SVG here */}
        <NotFoundSVG />
      </div>

      {/* Right: text + button */}
      <div className="not-found-content">
        <h1>404</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Button type="primary" onClick={() => router.push("/")}>
          Back to Home
        </Button>
      </div>
    </div>
  );
}
