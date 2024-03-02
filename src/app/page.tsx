import EnergyMixChart from "@/components/EnergyMixChart";
import ExampleChart from "@/components/example-chart";
import ExampleChart2 from "@/components/example-chart2";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-zinc-200 text-black">
      <h1 className="mb-12 text-4xl font-bold">
        Klimadashboard der Stadt <span className="text-sky-500">Karlsruhe</span>
      </h1>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        <ExampleChart />
        <ExampleChart2 />
        <EnergyMixChart />
      </div>
    </main>
  );
}
