import { useTheme } from "@mui/material/styles";
import React from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    Annotation,
    ZoomableGroup,
    Marker,
} from "react-simple-maps";


const connectorSx = (a: string) => ({
    stroke: a,
    strokeWidth: 0,
    strokeLinecap: "round"
});

const geographySx = (mainColor: string) => ({
    default: {
        fill: "#EEE",
        outline: "none",
    },
    hover: {
        fill: mainColor,
        outline: "none"
    },
    pressed: {
        fill: "#fff",
    },
});

const storeCoordinates = (xValue: number, yValue: number, arr: any[]) => {
    arr.push({ x: xValue, y: yValue });
}


const RMap = () => {

    const theme = useTheme();
    const geoUrl =
        "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

    var coords: any = [];
    storeCoordinates(-97, 40, coords);
    storeCoordinates(-0, 23, coords);
    storeCoordinates(130, 0, coords);
    storeCoordinates(-73, 0, coords);
    storeCoordinates(83, 26, coords);
    storeCoordinates(97, 23, coords);
    storeCoordinates(78, 24, coords);
    storeCoordinates(20, 0, coords);
    storeCoordinates(20, 50, coords);

    const mapProps = {
        markerCoordinates: coords,
        zoomLevel: 1
    };

    return (
        <ComposableMap>
            <ZoomableGroup zoom={mapProps.zoomLevel}>
                <Geographies geography={geoUrl}>
                    {({ geographies }: any) =>
                        geographies.map((geo: any) => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                style={geographySx(theme.palette.primary.main)}
                            />
                        ))
                    }
                </Geographies>
                <Annotation
                    subject={[
                        mapProps.markerCoordinates[0].x,
                        mapProps.markerCoordinates[0].y
                    ]}
                    dx={-90}
                    dy={-30}
                    // stroke line is disabled here atm
                    connectorProps={connectorSx(theme.palette.primary.main)}
                >
                    <text x="-1" y="50" fill="#F53">
                        {"United States"}
                    </text>
                </Annotation>
                <Marker coordinates={[
                    mapProps.markerCoordinates[1].x,
                    mapProps.markerCoordinates[1].y
                ]}>
                    <circle r={3} fill="#FF5533" />
                </Marker>

                {
                    mapProps.markerCoordinates.map((coords: any) => (
                        <Marker coordinates={[
                            coords.x,
                            coords.y
                        ]}>
                            <circle r={3} fill="#FF5533" />
                        </Marker>
                    ))
                }

            </ZoomableGroup>
        </ComposableMap>
    )
};

export default RMap;