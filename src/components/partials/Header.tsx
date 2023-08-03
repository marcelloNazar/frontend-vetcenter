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

  const handleClick = () => {
    router.push("/gerenciar");
  };

  const handleHomeClick = () => {
    router.push("/admin");
  };

  return (
    <header className=" bg-orange-600 w-full flex justify-center">
      <div className="p-1 px-2 w-full max-w-7xl flex justify-between items-center text-white">
        {role === "ADMIN" ? (
          <button onClick={handleHomeClick}>
            <h1>Administrador</h1>
          </button>
        ) : (
          <h1>Veterinario</h1>
        )}
        {role === "ADMIN" ? (
          <button
            className="vet-botao transform transition duration-200 hover:scale-110"
            onClick={handleClick}
          >
            Gerenciar
          </button>
        ) : (
          <div></div>
        )}
        <div className="flex w-28 justify-between">
          <ToggleTheme />
          <button
            className="vet-botao transform transition duration-200 hover:scale-110"
            onClick={handleLogout}
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
