export function useDates () {
    const correctDate = (date) => {
        return date ?
            `${date.getDate()}.${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}.${date.getFullYear()}`
            : '';
    }

    return {correctDate};
}