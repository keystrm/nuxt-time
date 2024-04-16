const useTimeFormatter = ( date: Date, relativeDate: Date, unit : "best fit" | "year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second") => {
    const timeDifference = computed(()=>date.getTime()-relativeDate.getTime())

    const getValuesForTimeDifference = (timeDifference: number, unit :"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second") => {
        switch (unit) {
            case "year":
                return timeDifference / (1000 * 60 * 60 * 24 * 365)
            case "quarter":
                return timeDifference / (1000 * 60 * 60 * 24 * 91.25)
            case "month":
                return timeDifference / (1000 * 60 * 60 * 24 * 30.44)
            case "week":
                return timeDifference / (1000 * 60 * 60 * 24 * 7)
            case "day":
                return timeDifference / (1000 * 60 * 60 * 24)
            case "hour":
                return timeDifference / (1000 * 60 * 60)
            case "minute":
                return timeDifference / (1000 * 60)
            case "second":
                return timeDifference / 1000
            default:
                return null
        }
    }

    const findBestFitUnit = (timeDifference:number) : "year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"  => {
        const seconds = timeDifference / 1000
        const minutes = seconds / 60
        const hours = minutes / 60
        const days = hours / 24
        const weeks = days / 7
        const months = days / 30.44
        const years = days / 365

        if (years >= 1) {
            return "year" 
        } else if (months >= 1) {
            return "month" 
        } else if (weeks >= 1) {
            return "week" 
        } else if (days >= 1) {
            return "day" 
        } else if (hours >= 1) {
            return "hour" 
        } else if (minutes >= 1) {
            return "minute"
        } else {
            return "second"
        }
    }
    
}
