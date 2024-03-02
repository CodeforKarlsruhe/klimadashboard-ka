import PenguinChart from "@/components/PenguinChart";
import ExampleChart from "@/components/example-chart";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Klimadashboard Karlsruhe</h1>
      <div>
        <ExampleChart />
        <PenguinChart />
      </div>
    </main>
  );
}
