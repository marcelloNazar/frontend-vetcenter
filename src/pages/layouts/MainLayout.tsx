import React, { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaHome, FaUsers } from "react-icons/fa";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const router = useRouter();

  const navItems = [
    { name: "Home", icon: <FaHome />, route: "/" },
    { name: "Proprietários", icon: <FaUsers />, route: "/about" },
    // Adicione mais itens de navegação conforme necessário
  ];

  return (
    <div className="flex min-h-screen">
      <aside className="w-1/6 bg-gray-800 p-4">
        <ul className="space-y-4">
          {navItems.map((item, index) => (
            <li
              key={index}
              className={`text-white cursor-pointer ${
                router.pathname === item.route ? "font-semibold" : ""
              }`}
            >
              <Link href={item.route}>
                <div className="flex items-center space-x-2">
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <main className="w-5/6 p-8">
        <div className="container mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default MainLayout;
