export interface DateTime {
    dates: number[];
    firstDate: string;
}

export interface DateProps {
    from: string;
    to: string;
}

export interface StartEndInDay {
    start: string;
    end: string;
}

export interface GetTotalItemOfProductOnTime extends StartEndInDay {
    ID: string;
}
