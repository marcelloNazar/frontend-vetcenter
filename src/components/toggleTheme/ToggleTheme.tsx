import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import { useTheme } from "next-themes";
import React, { useState } from "react";

const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "ligth")}>
      {theme === "ligth" ? (
        <MoonIcon className="h-8 text-gray-100" />
      ) : (
        <SunIcon className="h-8 text-gray-100" />
      )}
    </button>
  );
};

export default ToggleTheme;
