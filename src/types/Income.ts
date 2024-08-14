import { Quarter } from "../enums/Quarter";
import { Month } from "../enums/Month";

export interface Income {
    sum: string;
    date: string;
    currency: string;
    uahSum: number;
    rate: number;
}

export interface ParsedIncomeTable {
    [Quarter.Q1]: {
        [Month.January]: Income[];
        [Month.February]: Income[];
        [Month.March]: Income[];
    };
    [Quarter.Q2]: {
        [Month.April]: Income[];
        [Month.May]: Income[];
        [Month.June]: Income[];
    };
    [Quarter.Q3]: {
        [Month.July]: Income[];
        [Month.August]: Income[];
        [Month.September]: Income[];
    };
    [Quarter.Q4]: {
        [Month.October]: Income[];
        [Month.November]: Income[];
        [Month.December]: Income[];
    };
}