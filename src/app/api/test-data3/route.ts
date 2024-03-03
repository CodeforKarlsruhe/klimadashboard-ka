import * as d3 from "d3";
import * as dsv from "d3-dsv";
import {NextRequest, NextResponse} from "next/server";
import {SRC} from "./mobile Feinstaubdaten Hackathon";
import {FeinstaubDataEntry, FeinstaubDataEntryOriginal} from "@/app/api/models";

const fmt = dsv.dsvFormat(",");

export async function GET(req: NextRequest): Promise<NextResponse> {
    const rawData: FeinstaubDataEntryOriginal[] = fmt.parse(SRC);

    const dataFilteredByIDs = d3.filter(
        rawData,
        (x) => Number.parseInt(x["ID"]) >= 0 && Number.parseInt(x["ID"]) <= 4,
    );

    const dataWithCombinedTime: FeinstaubDataEntry[] = d3.map(dataFilteredByIDs, (row) => ({
        ...row,
        combinedTime: Date.parse(row.Datum + "T" + row.Zeit + ".000Z"),
    }));

    const sortedData: FeinstaubDataEntry[] = d3.sort(dataWithCombinedTime, (x, y) => x.combinedTime - y.combinedTime);

    return NextResponse.json({
        data: sortedData,
    });
}
