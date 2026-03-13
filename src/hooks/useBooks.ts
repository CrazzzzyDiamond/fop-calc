import { useState } from 'react'

import { Book } from '@src/types/Book'
import { Income } from '@src/types/Income'
import { uid } from '@src/helpers/generateId'

const DEFAULT_BOOK_NAME = `ФОП ${new Date().getFullYear()}`

const initBooks = (): Book[] => {
	const stored = localStorage.getItem('books')
	if (stored) {
		try {
			const parsed = JSON.parse(stored)
			if (Array.isArray(parsed) && parsed.length > 0) return parsed
		} catch {
			// fall through
		}
	}
	const defaultBook: Book = { id: uid(), name: DEFAULT_BOOK_NAME, incomes: [] }
	localStorage.setItem('books', JSON.stringify([defaultBook]))
	return [defaultBook]
}

const initActiveBookId = (books: Book[]): string => {
	const stored = localStorage.getItem('activeBookId')
	if (stored && books.find(b => b.id === stored)) return stored
	return books[0].id
}

export function useBooks() {
	const [books, setBooks] = useState<Book[]>(initBooks)
	const [activeBookId, setActiveBookIdState] = useState<string>(() =>
		initActiveBookId(books)
	)

	const activeBook = books.find(b => b.id === activeBookId) ?? books[0]

	const persistBooks = (newBooks: Book[]) => {
		localStorage.setItem('books', JSON.stringify(newBooks))
		setBooks(newBooks)
	}

	const setActiveBookId = (id: string) => {
		localStorage.setItem('activeBookId', id)
		setActiveBookIdState(id)
	}

	const createBook = (name: string) => {
		const newBook: Book = { id: uid(), name, incomes: [] }
		const newBooks = [...books, newBook]
		persistBooks(newBooks)
		setActiveBookId(newBook.id)
	}

	const deleteBook = (id: string) => {
		const newBooks = books.filter(b => b.id !== id)
		if (newBooks.length === 0) {
			const fallback: Book = { id: uid(), name: DEFAULT_BOOK_NAME, incomes: [] }
			newBooks.push(fallback)
		}
		persistBooks(newBooks)
		if (activeBookId === id) {
			setActiveBookId(newBooks[0].id)
		}
	}

	const setActiveBookIncomes: React.Dispatch<React.SetStateAction<Income[]>> = (incomesOrUpdater) => {
		setBooks(prevBooks => {
			const newBooks = prevBooks.map(book => {
				if (book.id === activeBook.id) {
					const newIncomes = typeof incomesOrUpdater === 'function'
						? incomesOrUpdater(book.incomes)
						: incomesOrUpdater
					return { ...book, incomes: newIncomes }
				}
				return book
			})
			localStorage.setItem('books', JSON.stringify(newBooks))
			return newBooks
		})
	}

	const clearActiveBook = () => {
		setActiveBookIncomes([])
	}

	return {
		books,
		activeBook,
		activeBookId,
		setActiveBookId,
		createBook,
		deleteBook,
		setActiveBookIncomes,
		clearActiveBook,
	}
}
