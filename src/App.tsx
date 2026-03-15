import { useEffect } from 'react'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'

import 'dayjs/locale/uk'
import 'dayjs/locale/en'

import { useBooks } from './hooks/useBooks'
import { AppBar } from './components/AppBar'
import { Incomes } from './components/Incomes'

function App() {
	const { i18n } = useTranslation()
	const { books, activeBook, activeBookId, setActiveBookId, createBook, deleteBook, setActiveBookIncomes, clearActiveBook } = useBooks()

	useEffect(() => {
		const lang = localStorage.getItem('lang')

		if (lang === 'ua') {
			i18n.changeLanguage('ua')
			dayjs.locale('uk')
		}
	}, [i18n])

	return (
		<div style={{ background: 'linear-gradient(135deg, #a2c0cc, #fceea7)', minHeight: '100vh' }}>
			<AppBar
				books={books}
				activeBookId={activeBookId}
				onSelectBook={setActiveBookId}
				onCreateBook={createBook}
				onDeleteBook={deleteBook}
				onClear={clearActiveBook}
			/>
			<Incomes
				incomes={activeBook?.incomes ?? []}
				setIncomes={setActiveBookIncomes}
			/>
		</div>
	)
}

export default App
