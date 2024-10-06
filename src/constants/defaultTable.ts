import { Quarter } from '../enums/Quarter'
import { Month } from '../enums/Month'

export const defaultTable = {
    [Quarter.Q1]: {
        [Month.January]: [],
        [Month.February]: [],
        [Month.March]: [],
    },
    [Quarter.Q2]: {
        [Month.April]: [],
        [Month.May]: [],
        [Month.June]: [],
    },
    [Quarter.Q3]: {
        [Month.July]: [],
        [Month.August]: [],
        [Month.September]: [],
    },
    [Quarter.Q4]: {
        [Month.October]: [],
        [Month.November]: [],
        [Month.December]: [],
    },
}