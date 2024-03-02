import * as d3 from "d3";
import * as geo from "d3-geo";
import * as dsv from "d3-dsv";
import { NextRequest, NextResponse } from "next/server";
import { SRC } from "./mobile Feinstaubdaten Hackathon";

const fmt = dsv.dsvFormat(",");

export async function GET(req: NextRequest): Promise<NextResponse> {
  let agg: {
    time: string;
    min: number;
    max: number;
    mean: number;
  }[] = [];

  const data = fmt.parse(SRC);

  const data2 = d3.filter(
    data,
    (x) => Number.parseInt(x["ID"]) >= 0 && Number.parseInt(x["ID"]) <= 4,
  );

  const data3 = d3.map(data2, (row) => ({
    ...row,
    combinedTime: Date.parse(row["Datum"] + "T" + row["Zeit"] + ".000Z"),
  }));

  const data4 = d3.sort(data3, (x, y) => x["combinedTime"] - y["combinedTime"]);

  return NextResponse.json({
    data: data4,
  });
}
