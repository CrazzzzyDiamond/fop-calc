import { describe, it, expect } from 'vitest'
import { parseIncomesSums } from '../helpers/parseIncomes'
import { Income } from '../types/Income'

const income = (uahSum: number, date: string): Income => ({
	id: '1',
	sum: String(uahSum),
	date,
	currency: 'UAH',
	uahSum,
	rate: 1,
})

describe('parseIncomesSums', () => {
	it('повертає нулі для порожнього масиву', () => {
		const result = parseIncomesSums([])
		expect(result.year.sum).toBe(0)
		expect(result.year.percentage1).toBe(0)
		expect(result.year.percentage3).toBe(0)
		expect(result.year.percentage5).toBe(0)
	})

	it('правильно розраховує відсотки', () => {
		const result = parseIncomesSums([income(10000, '15.01.2024')])
		expect(result.year.sum).toBe(10000)
		expect(result.year.percentage1).toBe(100)
		expect(result.year.percentage3).toBe(300)
		expect(result.year.percentage5).toBe(500)
	})

	it('розподіляє по кварталах', () => {
		const incomes = [
			income(1000, '15.01.2024'), // Q1
			income(2000, '15.04.2024'), // Q2
			income(3000, '15.07.2024'), // Q3
			income(4000, '15.10.2024'), // Q4
		]
		const result = parseIncomesSums(incomes)
		expect(result.quarter.Q1.sum).toBe(1000)
		expect(result.quarter.Q2.sum).toBe(2000)
		expect(result.quarter.Q3.sum).toBe(3000)
		expect(result.quarter.Q4.sum).toBe(4000)
		expect(result.year.sum).toBe(10000)
	})

	it('розподіляє по півроках', () => {
		const incomes = [
			income(1000, '15.03.2024'), // перша половина
			income(2000, '15.06.2024'), // перша половина
			income(3000, '15.09.2024'), // друга половина
		]
		const result = parseIncomesSums(incomes)
		expect(result.half.firstHalf.sum).toBe(3000)
		expect(result.half.secondHalf.sum).toBe(3000)
	})

	it('гранична дата: 31 березня — Q1, 1 квітня — Q2', () => {
		const result = parseIncomesSums([
			income(1000, '31.03.2024'),
			income(2000, '01.04.2024'),
		])
		expect(result.quarter.Q1.sum).toBe(1000)
		expect(result.quarter.Q2.sum).toBe(2000)
	})

	it('правильно підсумовує кілька доходів в одному кварталі', () => {
		const incomes = [
			income(1000.50, '10.01.2024'),
			income(2000.25, '20.02.2024'),
			income(500.25, '05.03.2024'),
		]
		const result = parseIncomesSums(incomes)
		expect(result.quarter.Q1.sum).toBe(3501)
		expect(result.year.sum).toBe(3501)
	})

	it('округлює відсотки до 2 знаків', () => {
		const result = parseIncomesSums([income(333, '15.01.2024')])
		expect(result.year.percentage3).toBe(9.99)
		expect(result.year.percentage1).toBe(3.33)
	})
})
