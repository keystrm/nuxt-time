const useTimeFormatter = ( date: Date, relativeDate: Date, unit : "best fit" | "year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second") => {
    const timeDifference = computed(()=>date.getTime()-relativeDate.getTime())

    const getValuesForTimeDifference = (timeDifference: number, unit :"best fit" | "year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second") => {
        switch (unit) {
            case "year":
                return timeDifference / (1000 * 60 * 60 * 24 * 365);
            case "quarter":
                return timeDifference / (1000 * 60 * 60 * 24 * 91.25);
            case "month":
                return timeDifference / (1000 * 60 * 60 * 24 * 30.44);
            case "week":
                return timeDifference / (1000 * 60 * 60 * 24 * 7);
            case "day":
                return timeDifference / (1000 * 60 * 60 * 24);
            case "hour":
                return timeDifference / (1000 * 60 * 60);
            case "minute":
                return timeDifference / (1000 * 60);
            case "second":
                return timeDifference / 1000;
            default:
                return null;
        }
    }
    
}
