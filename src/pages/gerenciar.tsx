import React, { useState, useEffect } from "react";
import Header from "@/components/partials/Header";
import VeterinarioComponent from "@/components/admin/partials/Veterinario/Veterinario";
import ProdutoComponent from "@/components/admin/partials/Produto/Produto";
import ServicoComponent from "@/components/admin/partials/Servico/Servico";
import { useRouter } from "next/router";
import AtendimentosMes from "@/components/admin/AtendimentoMes";
import AtendimentosMesPagos from "@/components/admin/AtendimentosMesPagos";
import AtendimentosMesPagosFalse from "@/components/admin/AtendimentosMesPagosFalse";

const Gerenciamento: React.FC = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/admin");
  };
  return (
    <div className="w-screen flex h-screen bg-white dark:bg-black dark:text-white text-black">
      <header className="h-10 w-full absolute items-center top-0">
        <Header />
      </header>
      <div className="w-full h-full flex max-w-7xl mx-auto overflow-hidden">
        <main className="flex flex-col pt-10 w-full h-full">
          <div className="flex justify-between p-2 pt-4">
            <h1 className="flex border-b w-1/2">Area Administrativa</h1>
            <button onClick={handleClick} className="vet-botao">
              Voltar
            </button>
          </div>
          <div className="flex w-full justify-between gap-2 p-2 pt-0">
            <div className="w-1/3 ">
              <VeterinarioComponent />
            </div>
            <div className="w-1/3">
              <ProdutoComponent />
            </div>
            <div className="w-1/3">
              <ServicoComponent />
            </div>
          </div>
          <div className="flex w-full p-2">
            <h1 className="flex border-b w-1/2">Financeiro</h1>
          </div>
          <div className="flex w-full h-3/4 justify-between gap-2 p-2 pt-0 pb-3">
            <div className=" w-1/3 h-full">
              <AtendimentosMes />
            </div>
            <div className="w-1/3 h-full">
              <AtendimentosMesPagos />
            </div>
            <div className="w-1/3 h-full">
              <AtendimentosMesPagosFalse />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Gerenciamento;
