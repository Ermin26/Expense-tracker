export function getFormattedDate(date){
    return date.toLocaleDateString();
}

export function getDateMinusDays(date, days){
    return (
        new Date(date.getFullYear(), date.getMonth(), date.getDate() - days)
    )
}
