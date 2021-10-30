import { string } from "joi";

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
