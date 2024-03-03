export interface PortalResponse {
    help: string,
    success: boolean,
    result: {
        license_title: string,
        maintainer: string,
        resources: PortalResource[],
    }
}

export interface PortalResource {
    mimetype: string;
    url: string;
}

export interface SensorDataEntry {
    time: Date;
    min: number;
    max: number;
    mean: number;
}

export interface SensorDataEntryJSON {
    time: string;
    min: number;
    max: number;
    mean: number;
}

export interface FeinstaubDataEntryOriginal {
    ID: string;
    Datum: string;
    Zeit: string;
    Breitengrad: string;
    Laengengrad: string;
    "PM2.5": string;
    PM10: string;
    temp: string;
    humi: string;
    pres: string;
    WSpeed: string;
    WAngle: string;
    clouds: string;
}

export interface FeinstaubDataEntry {
    ID: string;
    Datum: string;
    Zeit: string;
    Breitengrad: string;
    Laengengrad: string;
    "PM2.5": string;
    PM10: string;
    temp: string;
    humi: string;
    pres: string;
    WSpeed: string;
    WAngle: string;
    clouds: string;
    combinedTime: number;
}

export interface GreenHouseGasEntry {
    year: string;
    category: string;
    type: string;
    co2: string;
    note: string;
}

export interface GreenHouseGasEntryImproved {
    year: string;
    category: string;
    type: string;
    co2: number;
    note: string;
}