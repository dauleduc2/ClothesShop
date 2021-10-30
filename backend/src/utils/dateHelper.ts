export const splitDateIntoEqualIntervals = (
    startDate: Date,
    endDate: Date,
    numberOfIntervals: number
): { start: string; end: string }[] => {
    const intervalLength =
        (endDate.getTime() - startDate.getTime()) / numberOfIntervals;
    return [...new Array(numberOfIntervals)].map((e, i) => {
        return {
            start: new Date(
                startDate.getTime() + i * intervalLength
            ).toLocaleDateString(),
            end: new Date(
                startDate.getTime() + (i + 1) * intervalLength
            ).toLocaleDateString(),
        };
    });
};
