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
    min: number;
    max: number;
    mean: number;
  }[] = [];

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

    const groups = d3.group(
      data4,
      (row) => d3.utcDay.floor(row.time),
    );

    const groups2 = d3.map(
      groups,
      ([l, r]) => ({ key: l, val: d3.map(r, (x) => x.bodentemperatur) }),
    );

    const agg2 = d3.map(
      groups2,
      (r) => ({
        time: r.key.toJSON(),
        min: d3.min(r.val)!,
        max: d3.max(r.val)!,
        mean: d3.mean(r.val)!,
      }),
    );

    agg = [...agg, ...agg2];
  }

  // day min, avg, max

  return NextResponse.json({
    data: agg,
  });
}
