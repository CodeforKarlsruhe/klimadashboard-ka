import PenguinChart from "@/components/PenguinChart";
import PlotFigure from "@/components/PlotFigure";
import * as Plot from "@observablehq/plot";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <PenguinChart />
      </div>
    </main>
  );
}
