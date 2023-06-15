import Head from "next/head";
import { SelectedOwnerProvider } from "../contexts/SelectedOwnerContext";
import { AnimalProvider } from "../contexts/AnimalContext";
import Proprietario from "@/components/Proprietario";
import Animal from "@/components/Animal";
import ProdServ from "@/components/ProdServ";
import Historico from "@/components/Historico";
import Adicionar from "@/components/Adicionar";
import ToggleTheme from "@/components/toggleTheme/ToggleTheme";

export default function Home() {
  return (
    <SelectedOwnerProvider>
      <AnimalProvider>
        <Head>
          <title>Vetcenter</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="h-screen w-full flex ">
          <header className="h-10 w-full bg-black absolute items-center top-0">
            <div className="flex justify-between items-center h-full p-1 px-4">
              <div>Header</div>
              <div className="">
                <ToggleTheme />
              </div>
            </div>
          </header>
          <div className="h-screen w-full flex ">
            <main className="flex flex-col pt-10 bg-white w-screen h-screen">
              <div
                className="w-screen flex max-h-full overflow-auto"
                style={{ height: "30vh" }}
              >
                <div className="w-1/2 h-full p-2 pl-4 pt-4">
                  <Proprietario />
                </div>
                <div className="w-1/2 h-full p-2 pt-4 pr-4">
                  <Animal />
                </div>
              </div>
              <div
                className="w-screen flex max-h-full overflow-auto"
                style={{ height: "70vh" }}
              >
                <div className="w-1/4 h-full p-2">
                  <ProdServ />
                </div>
                <div className="w-1/4 h-full p-2">
                  <Historico />
                </div>
                <div className="w-1/2 h-full p-2 pr-4">
                  <Adicionar />
                </div>
              </div>
            </main>
          </div>
        </div>
      </AnimalProvider>
    </SelectedOwnerProvider>
  );
}
