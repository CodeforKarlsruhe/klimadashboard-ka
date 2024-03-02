import PenguinChart from "@/components/PenguinChart";
import ExampleChart from "@/components/example-chart";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <ExampleChart></ExampleChart>
        <PenguinChart />
      </div>
    </main>
  );
}
