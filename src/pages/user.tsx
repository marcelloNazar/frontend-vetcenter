import { parseCookies } from "nookies";
import { GetServerSidePropsContext } from "next";
import Header from "../components/partials/Header";
import Head from "next/head";
import Atendimento from "@/components/user/Atendimento";
import PropUser from "@/components/user/PropUser";
import AnimalUser from "@/components/user/AnimalUser";
import Anamnsese from "@/components/user/Anamnese";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { token } = parseCookies(context);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const UserHomePage = () => {
  return (
    <div>
      <Head>
        <title>Vetcenter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full flex  bg-white dark:bg-black text-black">
        <header className="h-10 w-full absolute items-center top-0">
          <Header />
        </header>
        <div className="w-full flex max-w-7xl mx-auto">
          <main className="flex pt-10 w-screen h-screen">
            <div className="w-1/3 flex flex-col overflow-hidden p-2 pr-0">
              <Atendimento />
            </div>
            <div className="w-2/3 flex flex-col h-full">
              <div className="w-full h-1/4 p-2 pb-0">
                <PropUser />
              </div>
              <div className="w-full h-1/4 p-2 pb-0">
                <AnimalUser />
              </div>
              <div className="w-full h-2/4 p-2">
                <div className="h-full w-full">
                  <Anamnsese />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;
