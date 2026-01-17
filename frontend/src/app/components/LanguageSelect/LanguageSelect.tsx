"use client";

import { useState } from "react";
import "./LanguageSelect.css";

export default function LanguageSelect() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("English");

  const options = ["English", "Dutch"];

  return (
    <div className="lang-select">
      <button
        className="lang-select__trigger"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{value}</span>

        <svg
          className={`arrow ${open ? "open" : ""}`}
          width="100%"
          height="100%"
          viewBox="0 0 20 14"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M3 3l7 7 7-7"
            fill="none"
            stroke="var(--background)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <ul className="lang-select__menu">
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => {
                setValue(opt);
                setOpen(false);
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
