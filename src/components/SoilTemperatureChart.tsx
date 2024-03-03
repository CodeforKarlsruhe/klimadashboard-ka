"use client";

import {ElementRef, useEffect, useRef} from "react";
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {useData1} from "@/app/data";
import Card from "./Card";

const SoilTemperatureChart: React.FC = () => {
    const {data, isError, isLoading} = useData1();

    const containerRef = useRef<ElementRef<"div">>(null);

    useEffect(() => {
        const dataFactory = () =>
            d3.map(data.data, (x) => ({...x, time: new Date(x.time)}))
                .flatMap(
                    (x) => [{time: x.time, v: x.min, c: "min"}, {
                        time: x.time,
                        v: x.max,
                        c: "max",
                    }, {time: x.time, v: x.mean, c: "mean"}],
                );

        if (isLoading || !data) return;
        const plot = Plot.plot({
            color: {legend: true},
            marks: [
                Plot.line(dataFactory(), {
                    x: "time",
                    y: "v",
                    stroke: "c",
                }),
                Plot.ruleY([0]),
                Plot.crosshair(dataFactory(), {x: "time", y: "v"}),
            ],
        });
        containerRef.current!.append(plot);
        return () => plot.remove();
    }, [isLoading, data]);

    return (
        <Card title="Example chart 1" description="Description of example chart 1">
            <div ref={containerRef}/>
        </Card>
    );
};

export default SoilTemperatureChart;
