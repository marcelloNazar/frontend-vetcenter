import React, { useState, useEffect } from "react";
import Header from "@/components/partials/Header";
import VeterinarioComponent from "@/components/admin/partials/Veterinario";
import ProdutoComponent from "@/components/admin/partials/Produto";
import ServicoComponent from "@/components/admin/partials/Servico";
import { useRouter } from "next/router";
import ProprietarioComponent from "@/components/admin/partials/ProprietarioAdmin";

const Gerenciamento: React.FC = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/admin");
  };
  return (
    <div className="w-full flex  bg-white dark:bg-black dark:text-white text-black">
      <header className="h-10 w-full absolute items-center top-0">
        <Header />
      </header>
      <div className="w-full flex max-w-7xl mx-auto">
        <main className="flex flex-col pt-10 w-screen h-screen">
          <div className="flex justify-between p-4">
            <h1 className="flex border-b w-1/2">Area Administrativa</h1>
            <button onClick={handleClick} className="vet-botao">
              Voltar
            </button>
          </div>
          <div className="flex w-full justify-between gap-4 p-4 pt-0">
            <div className="w-1/3">
              <VeterinarioComponent />
            </div>
            <div className="w-1/3">
              <ProdutoComponent />
            </div>
            <div className="w-1/3">
              <ServicoComponent />
            </div>
          </div>
          <div className="flex flex-col w-full h-full p-4 pt-0">
            <h1 className="flex border-b w-1/2">Financeiro</h1>
            <div className="flex w-full h-full">
              <div className=" w-1/2 h-full"></div>
              <div className="w-1/2 h-full"></div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Gerenciamento;
