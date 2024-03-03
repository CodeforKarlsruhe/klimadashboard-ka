"use client";

import {ElementRef, useEffect, useRef} from "react";
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {useData1} from "@/app/data";
import Card from "./Card";

const ExampleChart: React.FC = () => {
    const {data, isError, isLoading} = useData1();

    const containerRef = useRef<ElementRef<"div">>(null);

    useEffect(() => {
        const dataFactory = () => d3.map(data.data, (x) => ({...x, time: new Date(x.time)}));

        if (isLoading || !data) return;
        const plot = Plot.plot({
            color: {legend: true, scheme: "BuRd"},
            marks: [
                Plot.cellX(dataFactory(), {
                    x: (d) => d.time.getUTCDate(),
                    y: (d) => d.time.getUTCMonth(),
                    fill: "max",
                }),
            ],
        });
        containerRef.current!.append(plot);
        return () => plot.remove();
    }, [isLoading, data]);

    return (
        <Card
            title="Jahresverlauf Temperatur"
            description="Verlauf der Temperatur an jedem Tag"
        >
            <div ref={containerRef}/>
        </Card>
    );
};

export default ExampleChart;
