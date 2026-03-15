import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'

import { LANGS_OPTIONS } from '@src/constants/langs'

const LANG = {
	ua: 'uk',
	en: 'en',
}

export const LangSelect = ({ className }: { className?: string }) => {
	const { i18n } = useTranslation()
	const lang = localStorage.getItem('lang') || 'en'

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const lang = e.target.value as keyof typeof LANG

		localStorage.setItem('lang', lang)
		i18n.changeLanguage(lang)
		dayjs.locale(LANG[lang])
	}

	return (
		<select
			value={lang}
			onChange={handleChange}
			className={className ?? "px-2 py-1 bg-white text-gray-900 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"}
		>
			{LANGS_OPTIONS.map(lang => (
				<option key={lang.value} value={lang.value}>
					{lang.label}
				</option>
			))}
		</select>
	)
}
