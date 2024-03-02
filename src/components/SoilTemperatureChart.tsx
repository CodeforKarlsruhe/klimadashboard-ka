"use client";

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import { useData1 } from "@/app/data";
import PlotFigure from "./PlotFigure";

const SoilTemperatureChart: React.FC = () => {
  const { data, isError, isLoading } = useData1();

  if (isLoading) return <>Loading...</>;

  const d = d3.map(data.data, (x) => ({ ...x, time: new Date(x.time) }));

  return (
    <PlotFigure
      title="Bodentemperatur (Jahr 2023)"
      description="Beschreibung hier"
      options={{
        x: { padding: 0.4 },
        marks: [
          Plot.line(d, {
            x: "time",
            y: "min",
            stroke: "blue",
          }),
          Plot.line(d, {
            x: "time",
            y: "max",
            stroke: "red",
          }),
          Plot.line(d, {
            x: "time",
            y: "mean",
          }),
          Plot.ruleY([0]),
        ],
      }}
    ></PlotFigure>
  );
};

export default SoilTemperatureChart;
