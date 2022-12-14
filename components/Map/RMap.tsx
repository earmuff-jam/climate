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


const RMap = () => {

    const theme = useTheme();
    const geoUrl =
        "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";


    const mapProps = {
        markerCoordinates: [-97, 40],
        zoomLevel: 2
    };

    return (
        <ComposableMap>
            <ZoomableGroup center={mapProps.markerCoordinates} zoom={mapProps.zoomLevel}>
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
                    subject={mapProps.markerCoordinates}
                    dx={-90}
                    dy={-30}
                    // stroke line is disabled here atm
                    connectorProps={connectorSx(theme.palette.primary.main)}
                >
                    <text x="-1" y="50" fill="#F53">
                        {"United States"}
                    </text>
                </Annotation>
                <Marker coordinates={mapProps.markerCoordinates}>
                    <circle r={3} fill="#FF5533" />
                </Marker>
            </ZoomableGroup>
        </ComposableMap>
    )
};

export default RMap;