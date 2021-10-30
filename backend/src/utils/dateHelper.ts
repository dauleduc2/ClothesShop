import moment = require("moment");

export const generateRanges = (startDate, endDate) => {
    let current = moment(startDate, "DD/MM/YYYY");
    const end = moment(endDate, "DD/MM/YYYY");
    // A dictionary to track unique month+year combinations
    const daysByMonth = {};

    while (current < end) {
        // Construct key based on month+year
        const key = `${current.month()}${current.year()}`;
        const date = current.date();

        // If key already exists, then we push into the `dates` array
        if (key in daysByMonth) {
            daysByMonth[key].dates.push(date);
        }

        // Otherwise we construct a brand new sub-object
        else {
            daysByMonth[key] = {
                dates: [date],

                // Since this is the first time we encounter the key,
                // We can assume this is the earliest/first date of the month
                firstDate: current.format("YYYY/MM/DD"),
            };
        }

        // At the end of the while loop, increment by a week, rinse and repeat
        current.add(7, "days");
    }

    // Once done, we only want the values in the dictionary
    // We don't need to keep the unique month+year key
    let result = Object.values(daysByMonth);
    const firstDate = result[result.length - 1];
    result.splice(11, 1);
    result = [firstDate, ...result];
    return result;
};
