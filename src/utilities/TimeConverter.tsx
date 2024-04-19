// Unix Timestamp converter into human readable date string

// Hour
export function unixHourConverter(timestamp: number) {
    let date = new Date(timestamp * 1000);
    let hour = date.getHours();
    if (hour >= 0 && hour <= 9) return "0" + hour;
    return "" + hour;
}

// Minutes
export function unixMinutesConverter(timestamp: number) {
    let date = new Date(timestamp * 1000);
    let minute = date.getMinutes();
    if (minute >= 0 && minute <= 9) return "0" + minute;
    return "" + minute;
}

// Seconds
export function unixSecondsConverter(timestamp: number) {
    let date = new Date(timestamp * 1000);
    let minute = date.getSeconds();
    if (minute >= 0 && minute <= 9) return "0" + minute;
    return "" + minute;
}

// Day
export function unixDayConverter(timestamp: number) {
    let date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-us", {day: "numeric"});
}

// Day of week: Monday...Sunday
export function unixWeekNameConverter(timestamp: number) {
    let date = new Date(timestamp * 1000);
    return date.toLocaleString("en-us", { weekday: "long" });
}

// Month name: Jan...Dec
export function unixMonthNameConverter(timestamp: number) {
    let date = new Date(timestamp * 1000);
    return date.toLocaleString("en-us", { month: "short" });
}

// Date: DD/MM/YY
export function unixDateConverter(timestamp: number) {
    let date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
}

// Date without year and hour+minutes: DD/MM HH:MM
export function unixDateHourConverter(timestamp: number) {
    return unixDateConverter(timestamp).slice(0, -5) + " " + unixHourConverter(timestamp) + ":" + unixMinutesConverter(timestamp);
}

// Complete date and hour: DD/MM/YY, HH:MM:SS
export function unixAllInfoConverter(timestamp: number) {
    let date = new Date(timestamp * 1000);
    return date.toLocaleString("en-us", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",hourCycle: "h23"});
}