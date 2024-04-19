import { unixHourConverter, unixMinutesConverter, unixWeekNameConverter } from "./TimeConverter"

// First letter of a string uppercase
export function upperCaseFormat(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function cityNameFormat(city: string, state: string) {

    let completeName = city + (state ? " (" + state + ")" : "");
    return completeName;

}

export function timeIntervalFormat(start: number, end: number) {

    let startDate = new Date(start * 1000);
    let endDate = new Date(end * 1000);

    let finalInterval = [];

    let startMonth = startDate.toLocaleString("en-us", { month: "long" });;
    let endMonth = endDate.toLocaleString("en-us", { month: "long" });;

    let startDay = startDate.toLocaleDateString("en-us", { day: "numeric" });;
    let endDay = endDate.toLocaleDateString("en-us", { day: "numeric" });;

    let startWeekDay = unixWeekNameConverter(start).slice(0,3);
    let endWeekDay = unixWeekNameConverter(end).slice(0,3);

    let startHour = unixHourConverter(start) + ":" + unixMinutesConverter(start);
    let endHour = unixHourConverter(end) + ":" + unixMinutesConverter(end);

    if ((startMonth === endMonth) && (startDay === endDay)) {
        finalInterval[0] = startMonth + " " + startWeekDay + " " + startDay;
        finalInterval[1] = startHour;
        finalInterval[2] = endHour;
    }
    else if((startMonth === endMonth) && (startDay !== endDay)) {
        finalInterval[0] = startMonth;
        finalInterval[1] = startWeekDay + " " + startDay + ", " + startHour;
        finalInterval[2] = endWeekDay + " " + endDay + ", " + endHour;
    }
    else if (startMonth !== endMonth) {
        finalInterval[0] = "";
        finalInterval[1] = startMonth + " " + startWeekDay + " " + startDay + ", " + startHour;
        finalInterval[2] = endMonth + " " + endWeekDay + " " + endDay + ", " + endHour;
    }

    return finalInterval;
}