import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const RMap = () => {

    const geoUrl =
        "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";


    return (
        <ComposableMap>
            <Geographies geography={geoUrl}>
                {({ geographies }: any) =>
                    geographies.map((geo: any) => (
                        <Geography key={geo.rsmKey} geography={geo} />
                    ))
                }
            </Geographies>
        </ComposableMap>
    )
};

export default RMap;