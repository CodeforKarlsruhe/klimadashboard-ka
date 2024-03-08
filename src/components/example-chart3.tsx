"use client";

import {ElementRef, useEffect, useRef} from "react";
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {useData3} from "@/app/data";
import Card from "./Card";

const ExampleChart: React.FC = () => {
    const {data, isError, isLoading} = useData3();

    const containerRef = useRef<ElementRef<"div">>(null);

    useEffect(() => {

        const dataFactory = () =>
            d3.map(data.data, (entry) => ({...entry, time: new Date(entry.combinedTime)}));

        if (isLoading || !data) return;
        const plot = Plot.plot({
            marks: [
                Plot.rectY(
                    dataFactory(),
                    Plot.binX({y: "p50"}, {
                        x: entry => entry.time,
                        // @ts-ignore
                        y: "PM10",
                        fill: "ID",
                    }),
                ),
                Plot.ruleY([0]),
            ],
        });
        containerRef.current!.append(plot);
        return () => plot.remove();
    }, [isLoading, data]);

    return (
        <Card
            title="Feinstaubdaten"
            description="Feinstaubdaten von CycleSense.de"
        >
            <div ref={containerRef}/>
        </Card>
    );
};

export default ExampleChart;
