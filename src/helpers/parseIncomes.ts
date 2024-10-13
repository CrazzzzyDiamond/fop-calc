import { Income } from '../types/Income'
import dayjs from 'dayjs'
import CustomParseFormat from 'dayjs/plugin/customParseFormat'
import { Quarter } from '../enums/Quarter'
import { Month } from '../enums/Month'
import { ParsedIncomeTable, TotalSums } from '../types/Income'
import { defaultTable } from '../constants/defaultTable'
import { evaluate, round, add } from 'mathjs'
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

const sortByDate = (a: Income, b: Income) => {
	const aDate = dayjs(a.date, 'DD/MM/YYYY')
	const bDate = dayjs(b.date, 'DD/MM/YYYY')

	return aDate.isBefore(bDate) ? -1 : 1
}

export const parseeIncomesSimple = (incomes: Income[]) => {
	const parsedIncomes = incomes
		.map(income => ({
			...income,
			date: dayjs(income.date, 'DD.MM.YYYY').format('DD MMM YYYY'),
			month: monthNames[dayjs(income.date, 'DD.MM.YYYY').month()]
		}))
		.sort(sortByDate)

	return parsedIncomes
}

export const parseIncomes = (incomes: Income[]) => {
	const parsedIncomes: ParsedIncomeTable = { ...defaultTable }

	incomes.forEach(income => {
		const date = dayjs(income.date, 'DD/MM/YYYY')
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
		const date = dayjs(income.date, 'DD/MM/YYYY')
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

	return {
		quarter: {
			[Quarter.Q1]: {
				sum: round(firstQuarterSum, 2),
				percentage3: round(evaluate(`(${firstQuarterSum} * 3) / 100`), 2),
				percentage5: round(evaluate(`(${firstQuarterSum} * 5) / 100`), 2)
			},
			[Quarter.Q2]: {
				sum: round(secondQuarterSum, 2),
				percentage3: round(evaluate(`(${secondQuarterSum} * 3) / 100`), 2),
				percentage5: round(evaluate(`(${secondQuarterSum} * 5) / 100`), 2)
			},
			[Quarter.Q3]: {
				sum: round(thirdQuarterSum, 2),
				percentage3: round(evaluate(`(${thirdQuarterSum} * 3) / 100`), 2),
				percentage5: round(evaluate(`(${thirdQuarterSum} * 5) / 100`), 2)
			},
			[Quarter.Q4]: {
				sum: round(fourthQuarterSum, 2),
				percentage3: round(evaluate(`(${fourthQuarterSum} * 3) / 100`), 2),
				percentage5: round(evaluate(`(${fourthQuarterSum} * 5) / 100`), 2)
			}
		},
		half: {
			firstHalf: {
				sum: round(firstHalfSum, 2),
				percentage3: round(evaluate(`(${firstHalfSum} * 3) / 100`), 2),
				percentage5: round(evaluate(`(${firstHalfSum} * 5) / 100`), 2)
			},
			secondHalf: {
				sum: round(secondHalfSum, 2),
				percentage3: round(evaluate(`(${secondHalfSum} * 3) / 100`), 2),
				percentage5: round(evaluate(`(${secondHalfSum} * 5) / 100`), 2)
			}
		},
		year: {
			sum: round(yearSum, 2),
			percentage3: round(evaluate(`(${yearSum} * 3) / 100`), 2),
			percentage5: round(evaluate(`(${yearSum} * 5) / 100`), 2)
		}
	}
}