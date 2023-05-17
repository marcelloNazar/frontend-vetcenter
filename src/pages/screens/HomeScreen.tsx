import Proprietario from "../components/Proprietario/Proprietario";

export default function HomeScreen() {
  return (
    <>
      <main className="h-full w-full flex flex-col pt-10 bg">
        <div style={{ height: "30%" }} className="w-full flex">
          <div className="h-full w-1/2 bg-red-500">
            <Proprietario />
          </div>
          <div className="h-full w-1/2 bg-yellow-500">Div 2</div>
        </div>
        <div className="h-full w-full flex">
          <div className="h-full w-1/4 bg-pink-500">Div 3</div>
          <div className="h-full w-1/4 bg-purple-500">Div 4</div>
          <div className="h-full w-1/2 bg-orange-500">Div 5</div>
        </div>
      </main>
    </>
  );
}
