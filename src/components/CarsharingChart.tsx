"use client";
import PlotFigure from "@/components/PlotFigure";
import Card from "@/components/Card";
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import { useEffect, useMemo, useRef } from "react";
import useSWR from "swr";

const fetcher = (input: URL | RequestInfo, init?: RequestInit | undefined) =>
  fetch(input, init).then((res) => res.json());

const CarsharingChart = () => {
  const containerRef = useRef();

  const { data } = useSWR("api/test-data2", fetcher);

  const data2 = useMemo(
    () =>
      data?.data
        ?.filter((d) => d[1] === "Angemeldete Carsharing-Nutzer*")
        .map((d) => ({
          year: d[2],
          value: d[3],
        })),
    [data]
  );

  useEffect(() => {
    if (data2) {
      const plot = Plot.plot({
        color: { legend: true, scheme: "BuYlRd" },
        marks: [Plot.lineY(data2, { x: "year", y: "value" })],
      });
      containerRef.current.append(plot);
      return () => plot.remove();
    }
  }, [data2]);

  return (
    <Card title="Angemeldete Carsharing-Nutzer" description="Teilnehmer">
      <div ref={containerRef} />
    </Card>
  );
};

export default CarsharingChart;
