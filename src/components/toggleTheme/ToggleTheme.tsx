import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import React, { useState, useEffect } from "react";

const ToggleTheme = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <button onClick={() => setDarkMode((p) => !p)}>
      {darkMode ? (
        <SunIcon className="h-8 vet-botao transform transition duration-200 hover:scale-110" />
      ) : (
        <MoonIcon className="h-8 vet-botao transform transition duration-200 hover:scale-110" />
      )}
    </button>
  );
};

export default ToggleTheme;
