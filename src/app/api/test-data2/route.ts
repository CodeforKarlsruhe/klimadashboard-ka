import * as d3 from "d3";
import * as geo from "d3-geo";
import * as dsv from "d3-dsv";
import { NextRequest, NextResponse } from "next/server";

const fmt = dsv.dsvFormat(";");

export async function GET(
  req: NextRequest,
): Promise<NextResponse> {
  let agg: {
    time: string;
    bodentemperatur: number;
  }[] = [];

  /*
    TODO: unterschiedliche Tiefe, auch bodenfeuchte, lat & lon.
  */

  const f = await fetch(
    "https://transparenz.karlsruhe.de/api/3/action/package_show?id=sensordaten-karlsruhe",
  ).then((x) => x.json());

  const urls = f["result"]["resources"].filter((x) => x.mimetype == "text/csv")
    .map((x) => x.url);

  for (
    const url of urls
  ) {
    const response = await fetch(url);

    const data = fmt.parse(await response.text());

    const data2 = d3.map(
      data,
      (row) => ({
        "bodentemperatur": row["bodentemperatur"],
        "combinedTime": Date.parse(
          row["Datum"].split("-").toReversed().join("-") + "T" +
            row["Uhrzeit"] +
            ":00.000Z",
        ),
      }),
    );

    const data3 = d3.map(
      data2,
      (row) => ({
        time: new Date(row["combinedTime"]),
        bodentemperatur: Number.parseFloat(
          row["bodentemperatur"].replace(",", "."),
        ),
      }),
    );

    const data4 = d3.filter(
      data3,
      (row) => row.bodentemperatur < 100 && row.bodentemperatur > -100,
    );

    const data5 = d3.map(
      data4,
      (r) => ({
        time: r.time.toJSON(),
        bodentemperatur: r.bodentemperatur,
      }),
    );

    agg = [...agg, ...data5];
  }

  // day min, avg, max

  return NextResponse.json({
    data: agg,
  });
}
