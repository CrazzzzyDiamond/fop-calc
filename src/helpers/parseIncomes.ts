import { Income } from '../types/Income'
import dayjs from 'dayjs'
import CustomParseFormat from 'dayjs/plugin/customParseFormat'
import { Quarter } from '../enums/Quarter'
import { Month } from '../enums/Month'
import { ParsedIncomeTable, TotalSums } from '../types/Income'
import { defaultTable } from '../constants/defaultTable'
import { getPercent } from './getPercent'
dayjs.extend(CustomParseFormat)

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
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
			firstQuarterSum += uahSum
		} else if (month < 6) {
			secondQuarterSum += uahSum
		} else if (month < 9) {
			thirdQuarterSum += uahSum
		} else {
			fourthQuarterSum += uahSum
		}

		if (month < 6) {
			firstHalfSum += uahSum
		} else {
			secondHalfSum += uahSum
		}

		yearSum = yearSum + uahSum
	})

	return {
		quarter: {
			[Quarter.Q1]: {
				sum: firstQuarterSum,
				percentage3: getPercent(firstQuarterSum, 3),
				percentage5: getPercent(firstQuarterSum, 5)
			},
			[Quarter.Q2]: {
				sum: secondQuarterSum,
				percentage3: getPercent(secondQuarterSum, 3),
				percentage5: getPercent(secondQuarterSum, 5)
			},
			[Quarter.Q3]: {
				sum: thirdQuarterSum,
				percentage3: getPercent(thirdQuarterSum, 3),
				percentage5: getPercent(thirdQuarterSum, 5)
			},
			[Quarter.Q4]: {
				sum: fourthQuarterSum,
				percentage3: getPercent(fourthQuarterSum, 3),
				percentage5: getPercent(fourthQuarterSum, 5)
			}
		},
		half: {
			first: {
				sum: firstHalfSum,
				percentage3: getPercent(firstHalfSum, 3),
				percentage5: getPercent(firstHalfSum, 5)
			},
			second: {
				sum: secondHalfSum,
				percentage3: getPercent(secondHalfSum, 3),
				percentage5: getPercent(secondHalfSum, 5)
			}
		},
		year: {
			sum: yearSum,
			percentage3: getPercent(yearSum, 3),
			percentage5: getPercent(yearSum, 5)
		}
	}
}