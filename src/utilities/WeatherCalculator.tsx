// Converts temperature from Kelvin scale to Celsius or Farenheit
export function temperatureConverter(temp: number, unit: string) {

    let newTemp = "";

    switch (unit) {
        case "C":
            newTemp = (Math.round(temp - 273.15)) + " °C";
            break;

        case "F":
            newTemp = (Math.round(temp * 1.8 - 459.67)) + " °F";
            break;
            
        default:
            newTemp = (Math.round(temp)) + " K";
            break;
    }

    return newTemp;
}

export function temperatureShortConverter(temp: number, unit: string) {

    let newTemp = "";

    switch (unit) {
        case "C":
            newTemp = (Math.round(temp - 273.15))+"°";
            break;

        case "F":
            newTemp = (Math.round(temp * 1.8 - 459.67))+"°";
            break;
            
        default:
            newTemp = (Math.round(temp))+"";
            break;
    }

    return newTemp;
}

// Percentage calculator
export function percentageCalculator(pop: number) {
    return (Math.round(pop * 100)) + "%";
}

// UVI Scale calculator
export function uviScaleCalculator(uvi: number) {

    let scale: string;

    switch (true) {
        case uvi >= 0 && uvi < 3:
            scale = "Low";
            break;

        case uvi >= 3 && uvi < 6:
            scale = "Moderate";
            break;

        case uvi >= 6 && uvi < 8:
            scale = "High";
            break;

        case uvi >= 8 && uvi < 11:
            scale = "Very high";
            break;

        default:
            scale = "Extreme";
            break;
    }

    return scale;
}

// Beaufort scale calculator (wind speed)
export function beaufortScaleCalculator(unit: number) {

    let scale = [];

    switch (true) {
        case unit >= 0 && unit < 0.3:
            scale[0] = 0;
            scale[1] = "Calm";
            break;

        case unit >= 0.3 && unit < 1.6:
            scale[0] = 1;
            scale[1] = "Light air";
            break;

        case unit >= 1.6 && unit < 3.4:
            scale[0] = 2;
            scale[1] = "Light breeze";
            break;

        case unit >= 3.4 && unit < 5.5:
            scale[0] = 3;
            scale[1] = "Gentle breeze";
            break;

        case unit >= 5.5 && unit < 8:
            scale[0] = 4;
            scale[1] = "Moderate breeze";
            break;

        case unit >= 8 && unit < 10.8:
            scale[0] = 5;
            scale[1] = "Fresh breeze";
            break;

        case unit >= 10.8 && unit < 13.9:
            scale[0] = 6;
            scale[1] = "Strong breeze";
            break;

        case unit >= 13.9 && unit < 17.2:
            scale[0] = 7;
            scale[1] = "Near gale";
            break;

        case unit >= 17.2 && unit < 20.8:
            scale[0] = 8;
            scale[1] = "Gale";
            break;

        case unit >= 20.8 && unit < 24.5:
            scale[0] = 9;
            scale[1] = "Strong gale";
            break;

        case unit >= 24.5 && unit < 28.5:
            scale[0] = 10;
            scale[1] = "Storm";
            break;

        case unit >= 28.5 && unit < 32.7:
            scale[0] = 11;
            scale[1] = "Violent storm";
            break;

        case unit >= 32.7:
            scale[0] = 12;
            scale[1] = "Hurricane";
            break;

        default: break;
    }

    return scale;
}

// Moon phase calculator
export function moonPhaseCalculator(moonPhase: number) {

    const normalizedMoonPhase = (moonPhase + 1) % 1;
    let moonPhaseDesc = [];

    switch (true) {
        case normalizedMoonPhase === 0 || normalizedMoonPhase === 1:
            moonPhaseDesc[0] = "new-moon";
            moonPhaseDesc[1] = "New moon";
            break;
        case normalizedMoonPhase === 0.25:
            moonPhaseDesc[0] = "first-quarter-moon";
            moonPhaseDesc[1] = "First ¼ moon";
            break;
        case normalizedMoonPhase === 0.5:
            moonPhaseDesc[0] = "full-moon";
            moonPhaseDesc[1] = "Full moon";
            break;
        case normalizedMoonPhase === 0.75:
            moonPhaseDesc[0] = "last-quarter-moon";
            moonPhaseDesc[1] = "Last ¼ moon";
            break;
        default:
            if (normalizedMoonPhase < 0.25) {
                moonPhaseDesc[0] = "waxing-crescent";
                moonPhaseDesc[1] = "Waxing crescent";
            } else if (normalizedMoonPhase < 0.5) {
                moonPhaseDesc[0] = "waxing-gibbous";
                moonPhaseDesc[1] = "Waxing gibbous";
            } else if (normalizedMoonPhase < 0.75) {
                moonPhaseDesc[0] = "waning-gibbous";
                moonPhaseDesc[1] = "Waning gibbous";
            } else {
                moonPhaseDesc[0] = "waning-crescent";
                moonPhaseDesc[1] = "Waning crescent";
            }
            break;
    }
    return moonPhaseDesc;

}

// Wind direction calculator
export function windDirectionCalculator(degrees: number) {

    degrees = (degrees % 360 + 360) % 360;
    //const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    const directions = [0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
}

