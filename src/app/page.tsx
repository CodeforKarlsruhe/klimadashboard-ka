import EnergyMixChart from "@/components/EnergyMixChart";
import EnergySectorChart from "@/components/EnergySectorChart";
import ExampleChart2 from "@/components/example-chart2";
import ExampleChart from "@/components/example-chart";
import ExampleChart3 from "@/components/example-chart3";
import GreenhouseGasesChart from "@/components/GreenhouseGasesChart";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-zinc-200 text-black">
      <header className="p-12">
        <h1 className="text-4xl font-bold">
          Klimadashboard der Stadt{" "}
          <span className="text-sky-500">Karlsruhe</span>
        </h1>
      </header>
      <div className="flex flex-col gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-2">Klima</h2>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
            <ExampleChart2 />
            <GreenhouseGasesChart />
            <ExampleChart />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Energieträger</h2>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
            <EnergyMixChart />
            <EnergySectorChart />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Verkehr</h2>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12"></div>
          <ExampleChart3 />
        </div>
      </div>
      <footer className="bg-white w-full mt-auto flex justify-between items-center py-10 px-20 gap-4 border-t-gray-300 border-t-2">
        Made with &#10084;&#65039; @"Open Data Days 2024"
        <img className="h-20 w-20" src="cfka.svg" alt="Code for Karlsruhe" />
      </footer>
    </main>
  );
}
