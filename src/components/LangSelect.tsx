import {
	Select,
	MenuItem,
	SelectChangeEvent,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'

import { LANGS_OPTIONS } from '@src/constants/langs'

const LANG = {
	ua: 'uk',
	en: 'en',
}

const langSelectorStyle = {
	backgroundColor: 'white',
}

export const LangSelect = () => {
	const { i18n } = useTranslation()
	const lang = localStorage.getItem('lang') || 'en'

	const handleChange = (event: SelectChangeEvent) => {
		const lang = event.target.value as keyof typeof LANG

		localStorage.setItem('lang', lang)
		i18n.changeLanguage(lang)
		dayjs.locale(LANG[lang])
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
			sx={langSelectorStyle}
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