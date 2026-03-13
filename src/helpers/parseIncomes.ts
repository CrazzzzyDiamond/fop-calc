import { Income } from '../types/Income'
import dayjs from 'dayjs'
import CustomParseFormat from 'dayjs/plugin/customParseFormat'
import { Quarter } from '../enums/Quarter'
import { Month } from '../enums/Month'
import { ParsedIncomeTable, TotalSums } from '../types/Income'
import { defaultTable } from '../constants/defaultTable'
import { round, add } from 'mathjs'
dayjs.extend(CustomParseFormat)

const monthNames = [
	'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December'
]

const getQuarter = (month: number): Quarter => {
	if (month < 3) {
		return Quarter.Q1
	} else if (month < 6) {
		return Quarter.Q2
	} else if (month < 9) {
		return Quarter.Q3
	} else {
		return Quarter.Q4
	}
}

const DATE_FORMAT = 'DD.MM.YYYY'

const sortByDate = (a: Income, b: Income) => {
	const aDate = dayjs(a.date, DATE_FORMAT)
	const bDate = dayjs(b.date, DATE_FORMAT)

	if (aDate.isBefore(bDate)) return -1
	if (aDate.isAfter(bDate)) return 1
	return 0
}

export const parseIncomesSimple = (incomes: Income[]) => {
	return incomes
		.map(income => ({
			...income,
			date: dayjs(income.date, DATE_FORMAT).format('DD MMM YYYY'),
			month: monthNames[dayjs(income.date, DATE_FORMAT).month()]
		}))
		.sort(sortByDate)
}

export const parseIncomes = (incomes: Income[]) => {
	const parsedIncomes: ParsedIncomeTable = { ...defaultTable }

	incomes.forEach(income => {
		const date = dayjs(income.date, DATE_FORMAT)
		const month = date.month()
		const quarter = getQuarter(month)
		const monthName = monthNames[month] as Month

		(parsedIncomes[quarter] as { [key: string]: Income[] })[monthName]
			.push(income)
	})

	return parsedIncomes
}

export const parseIncomesSums = (incomes: Income[]): TotalSums => {
	let firstQuarterSum = 0
	let secondQuarterSum = 0
	let thirdQuarterSum = 0
	let fourthQuarterSum = 0
	let firstHalfSum = 0
	let secondHalfSum = 0
	let yearSum = 0

	incomes.forEach(income => {
		const date = dayjs(income.date, DATE_FORMAT)
		const month = date.month()
		const uahSum = income.uahSum

		if (month < 3) {
			firstQuarterSum = add(firstQuarterSum, uahSum)
		} else if (month < 6) {
			secondQuarterSum = add(secondQuarterSum, uahSum)
		} else if (month < 9) {
			thirdQuarterSum = add(thirdQuarterSum, uahSum)
		} else {
			fourthQuarterSum = add(fourthQuarterSum, uahSum)
		}

		if (month < 6) {
			firstHalfSum = add(firstHalfSum, uahSum)
		} else {
			secondHalfSum = add(secondHalfSum, uahSum)
		}

		yearSum = add(yearSum, uahSum)
	})

	const pct = (sum: number) => ({
		sum: round(sum, 2),
		percentage1: round(sum * 0.01, 2),
		percentage3: round(sum * 0.03, 2),
		percentage5: round(sum * 0.05, 2),
	})

	return {
		quarter: {
			[Quarter.Q1]: pct(firstQuarterSum),
			[Quarter.Q2]: pct(secondQuarterSum),
			[Quarter.Q3]: pct(thirdQuarterSum),
			[Quarter.Q4]: pct(fourthQuarterSum),
		},
		half: {
			firstHalf: pct(firstHalfSum),
			secondHalf: pct(secondHalfSum),
		},
		year: pct(yearSum),
	}
}