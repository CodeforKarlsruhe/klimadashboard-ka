import * as d3 from "d3";
import * as geo from "d3-geo";
import * as dsv from "d3-dsv";
import { NextRequest, NextResponse } from "next/server";

const fmt = dsv.dsvFormat(";");

export async function GET(
  req: NextRequest,
): Promise<NextResponse> {
  const response = await fetch(
    "https://transparenz.karlsruhe.de/dataset/ad0659b0-9e4b-408a-8840-3f19d5ec743d/resource/df843a83-b3f6-4929-b6a8-96471508f6f2/download/sensordaten_karlsruhe_bodentemperatur_bodenfeuchte_oct_2023.csv",
  );

  const data = fmt.parse(await response.text());

  const data2 = d3.map(
    data,
    (row) => ({
      "bodentemperatur": row["bodentemperatur"],
      "combinedTime": Date.parse(
        row["Datum"].split("-").toReversed().join("-") + "T" + row["Uhrzeit"] +
          ":00.000Z",
      ),
    }),
  );

  const data3 = d3.map(
    data2,
    (row) => ({
      time: row["combinedTime"],
      bodentemperatur: Number.parseFloat(
        row["bodentemperatur"].replace(",", "."),
      ),
    }),
  );

  return NextResponse.json({
    data: data3,
  });
}
