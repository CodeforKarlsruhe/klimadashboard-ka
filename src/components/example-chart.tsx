"use client";

import { ElementRef, useEffect, useRef } from "react";
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import { useData1 } from "@/app/data";
import PlotFigure from "./PlotFigure";

const ExampleChart: React.FC = () => {
  const chartRef = useRef<ElementRef<"div">>(null);

  const { data, isError, isLoading } = useData1();

  if (isLoading) return <></>;

  console.log(data.data);

  return (
    <PlotFigure
      options={{
        x: { padding: 0.4 },
        y: { unit: "" },
        marks: [
          Plot.lineY(
            data.data,
            Plot.binX({ y: "mean" }, {
              x: "time",
              y: "bodentemperatur",
              interval: d3.utcDay,
            }),
          ),
          Plot.ruleY([0]),
        ],
      }}
    >
    </PlotFigure>
  );
};

export default ExampleChart;
