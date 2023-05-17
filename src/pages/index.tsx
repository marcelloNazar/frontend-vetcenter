import Head from "next/head";
import Proprietario from "./components/Proprietario/Proprietario";
import HomeScreen from "./screens/HomeScreen";

export default function Home() {
  return (
    <>
      <Head>
        <title>Exemplo Next.js e Tailwind</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen w-full flex">
        <header className="h-10 w-full bg-blue-500 absolute top-0">
          Header
        </header>
        <aside className="h-full w-16 bg-green-500 flex-shrink-0 pt-10">
          Sidebar
        </aside>
        <HomeScreen />
      </div>
    </>
  );
}
