import { useEffect } from 'react'
import dayjs from 'dayjs'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import 'dayjs/locale/uk'
import 'dayjs/locale/en'

import { AppBar } from './components/AppBar'
import { Incomes } from './components/Incomes'

const mainBoxStyle = {
	background: 'linear-gradient(135deg, #a2c0cc, #fceea7)',
	minHeight: '100vh',
}

function App() {
	const { i18n } = useTranslation()
	
	useEffect(() => {
		const lang = localStorage.getItem('lang')

		if (lang === 'ua') {
			i18n.changeLanguage('ua')
			dayjs.locale('uk')
		}
	}, [i18n])

	return (
		<Box
			sx={mainBoxStyle}
		>
			<AppBar />
			<Incomes />
		</Box>
	)
}

export default App
