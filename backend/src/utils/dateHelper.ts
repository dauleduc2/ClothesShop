import { StartEndInDay } from "../interfaces/common/dateTime";

export const splitDateIntoEqualIntervals = (
    startDate: Date,
    endDate: Date,
    numberOfIntervals: number
): StartEndInDay[] => {
    const intervalLength =
        (endDate.getTime() - startDate.getTime()) / numberOfIntervals;
    return [...new Array(numberOfIntervals)].map((e, i) => {
        return {
            start: new Date(
                startDate.getTime() + (i + 1) * intervalLength
            ).toLocaleDateString(),
            end: new Date(
                startDate.getTime() + (i + 1 + 1) * intervalLength
            ).toLocaleDateString(),
        };
    });
};
