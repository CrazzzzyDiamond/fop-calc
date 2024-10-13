import {
	Select,
	MenuItem,
	SelectChangeEvent,
} from '@mui/material'
import { LANGS_OPTIONS } from '@src/constants/langs'
import { useTranslation } from 'react-i18next'

export const LangSelect = () => {
	const { i18n } = useTranslation()
	const lang = localStorage.getItem('lang') || 'en'

	const handleChange = (event: SelectChangeEvent) => {
		localStorage.setItem('lang', event.target.value as string)
		i18n.changeLanguage(event.target.value as string)
	}

	return (
		<Select
			labelId="demo-simple-select-label"
			id="demo-simple-select"
			value={lang}
			label="Age"
			onChange={handleChange}
			size='small'
			variant='outlined'
			sx={{
				backgroundColor: 'white',
			}}
		>
			{LANGS_OPTIONS.map(lang => (
				<MenuItem
					key={lang.value}
					value={lang.value}
				>
					{lang.label}
				</MenuItem>
			))}
		</Select>
	)
}