"use client";

import { ElementRef, useEffect, useRef } from "react";
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import { useData1 } from "@/app/data";
import PlotFigure from "./PlotFigure";

const ExampleChart: React.FC = () => {
  const { data, isError, isLoading } = useData1();

  if (isLoading) return <>Loading...</>;

  const d = d3.map(data.data, (x) => ({ ...x, time: new Date(x.time) }));
  console.log(d);

  return (
    <PlotFigure
      options={{
        x: { padding: 0.4 },
        marks: [
          Plot.lineY(
            d,
            {
              x: "time",
              y: "min",
              stroke: "blue",
            },
          ),
          Plot.lineY(
            d,
            {
              x: "time",
              y: "max",
              stroke: "red",
            },
          ),
          Plot.lineY(
            d,
            {
              x: "time",
              y: "mean",
            },
          ),
          Plot.ruleY([0]),
        ],
      }}
    >
    </PlotFigure>
  );
};

export default ExampleChart;
