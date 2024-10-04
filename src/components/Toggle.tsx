"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { FaRegMoon, FaMoon } from "react-icons/fa6";

export default function Toggle() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  });
  return (
    <div className="">
      <div
        className="dark:text-white text-very-dark-blue flex gap-1 items-center cursor-pointer"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? <FaMoon className="" /> : <FaRegMoon className="" />}

        <p className="text-[14px] dark:text-white text-very-dark-blue">
          Dark Mode
        </p>
      </div>
    </div>
  );
}
