import { useEffect } from 'react'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { AppBar } from './components/AppBar'
import { Incomes } from './components/Incomes'

function App() {
	const { i18n } = useTranslation()
	
	useEffect(() => {
		const lang = localStorage.getItem('lang')

		if (lang === 'ua') {
			i18n.changeLanguage('ua')
		}
	}, [i18n])

	return (
		<Box
			sx={{
				backgroundColor: '#efd9b4',
				minHeight: '100vh',
			}}
		>
			<AppBar />
			<Incomes />
		</Box>
	)
}

export default App
