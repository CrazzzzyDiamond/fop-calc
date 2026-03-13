import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useBooks } from '../hooks/useBooks'

beforeEach(() => {
	localStorage.clear()
})

describe('useBooks', () => {
	it('створює дефолтну книгу при першому запуску', () => {
		const { result } = renderHook(() => useBooks())
		expect(result.current.books).toHaveLength(1)
		expect(result.current.books[0].name).toMatch(/ФОП \d{4}/)
		expect(result.current.activeBook).toBeDefined()
	})

	it('завантажує збережені книги з localStorage', () => {
		const books = [
			{ id: 'abc', name: 'ФОП 2024', incomes: [] },
			{ id: 'def', name: 'ФОП 2025', incomes: [] },
		]
		localStorage.setItem('books', JSON.stringify(books))
		localStorage.setItem('activeBookId', 'def')

		const { result } = renderHook(() => useBooks())
		expect(result.current.books).toHaveLength(2)
		expect(result.current.activeBookId).toBe('def')
		expect(result.current.activeBook.name).toBe('ФОП 2025')
	})

	it('createBook додає нову книгу і робить її активною', () => {
		const { result } = renderHook(() => useBooks())

		act(() => {
			result.current.createBook('ФОП 2026')
		})

		expect(result.current.books).toHaveLength(2)
		expect(result.current.activeBook.name).toBe('ФОП 2026')
	})

	it('deleteBook видаляє книгу', () => {
		const { result } = renderHook(() => useBooks())

		act(() => {
			result.current.createBook('ФОП 2026')
		})

		const idToDelete = result.current.books[0].id

		act(() => {
			result.current.deleteBook(idToDelete)
		})

		expect(result.current.books).toHaveLength(1)
		expect(result.current.books.find(b => b.id === idToDelete)).toBeUndefined()
	})

	it('deleteBook створює нову книгу якщо видаляється остання', () => {
		const { result } = renderHook(() => useBooks())
		const onlyBookId = result.current.books[0].id

		act(() => {
			result.current.deleteBook(onlyBookId)
		})

		expect(result.current.books).toHaveLength(1)
		expect(result.current.books[0].id).not.toBe(onlyBookId)
	})

	it('setActiveBookIncomes зберігає доходи тільки в активній книзі', () => {
		const { result } = renderHook(() => useBooks())

		act(() => {
			result.current.createBook('ФОП 2026')
		})

		const firstBookId = result.current.books[0].id

		act(() => {
			result.current.setActiveBookId(firstBookId)
		})

		const income = { id: '1', sum: '1000', date: '01.01.2024', currency: 'UAH', uahSum: 1000, rate: 1 }

		act(() => {
			result.current.setActiveBookIncomes([income])
		})

		expect(result.current.books[0].incomes).toHaveLength(1)
		expect(result.current.books[1].incomes).toHaveLength(0)
	})

	it('clearActiveBook очищає доходи активної книги', () => {
		const { result } = renderHook(() => useBooks())
		const income = { id: '1', sum: '1000', date: '01.01.2024', currency: 'UAH', uahSum: 1000, rate: 1 }

		act(() => {
			result.current.setActiveBookIncomes([income])
		})

		act(() => {
			result.current.clearActiveBook()
		})

		expect(result.current.activeBook.incomes).toHaveLength(0)
	})

	it('зберігає стан в localStorage після змін', () => {
		const { result } = renderHook(() => useBooks())

		act(() => {
			result.current.createBook('Нова книга')
		})

		const stored = JSON.parse(localStorage.getItem('books') || '[]')
		expect(stored).toHaveLength(2)
		expect(stored[1].name).toBe('Нова книга')
	})
})
