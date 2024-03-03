"use client";

import {ElementRef, useEffect, useRef} from "react";
import * as Plot from "@observablehq/plot";
import {useData4} from "@/app/data";
import Card from "./Card";
import {GreenHouseGasEntryImproved} from "@/app/api/models";

const GreenhouseGasesChart: React.FC = () => {
    const {data, isError, isLoading} = useData4();

    const containerRef = useRef<ElementRef<"div">>(null);

    useEffect(() => {
        if (isLoading || !data) return;

        const betterData: GreenHouseGasEntryImproved[] = data.data.map(({co2, ...x}) => ({
            co2: parseInt(co2),
            ...x,
        }));

        const plot = Plot.plot({
            color: {legend: true},
            marks: [
                Plot.rectY(betterData, {x: "year", y: "co2", fill: "category"}),
                Plot.crosshair(betterData, {x: "year", y: "co2"}),
            ],
        });

        containerRef.current!.append(plot);
        return () => plot.remove();
    }, [isLoading, data]);

    return (
        <Card
            title="Treibhaus Gase"
            description="Treibhaus Gase von verschiedenen Quellen in den letzten Jahren"
        >
            <div ref={containerRef}/>
        </Card>
    );
};

export default GreenhouseGasesChart;
