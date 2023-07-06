import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import ToggleTheme from "../toggleTheme/ToggleTheme";

const Header = () => {
  const router = useRouter();
  const { signOut, isAuthenticated, role } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    signOut();
  };

  return (
    <header className=" bg-orange-600 w-full flex justify-center">
      <div className="p-1 px-4 w-full max-w-7xl flex justify-between items-center text-white">
        <h1>{role}</h1>
        <div className="flex w-28 justify-between">
          <ToggleTheme />
          <button className="vet-botao" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
