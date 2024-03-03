import * as d3 from "d3";
import * as dsv from "d3-dsv";
import {NextRequest, NextResponse} from "next/server";
import {PortalResponse, SensorDataEntry, SensorDataEntryJSON} from "@/app/api/models";

const fmt = dsv.dsvFormat(";");

export async function GET(
    req: NextRequest,
): Promise<NextResponse> {
    let agg: SensorDataEntry[] = [];

    /*
      TODO: unterschiedliche Tiefe, auch bodenfeuchte, lat & lon.
    */

    const fetchResponse = await fetch("https://transparenz.karlsruhe.de/api/3/action/package_show?id=sensordaten-karlsruhe")
    const portalResponse: PortalResponse = await fetchResponse.json();

    const portalResourceURLs = portalResponse.result.resources.filter(portalResource => portalResource.mimetype == "text/csv").map(({url}) => url);

    for (const url of portalResourceURLs) {
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
            ([l, r]) => ({key: l, val: d3.map(r, (x) => x.bodentemperatur)}),
        );

        const agg2 = d3.map(
            groups2,
            (r) => ({
                time: r.key,
                min: d3.min(r.val)!,
                max: d3.max(r.val)!,
                mean: d3.mean(r.val)!,
            }),
        );

        agg = [...agg, ...agg2];
    }

    const agg2 = d3.sort(agg, (l, r) => l.time.getTime() - r.time.getTime());
    const agg3: SensorDataEntryJSON[] = d3.map(agg2, (x) => ({...x, time: x.time.toJSON()}));

    return NextResponse.json({data: agg3});
}
