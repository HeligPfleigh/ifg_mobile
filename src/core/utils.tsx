import React from "react";
import { StormImg, SunImg, MoonImg } from "../assets/images";

export const showWeatherIcon = (score: number) => {
    if (-2 > score && score >= -5) {
        return <StormImg />
    } else if (score > 2 && score <= 5) {
        return <SunImg />
    }
    return <MoonImg />
};
