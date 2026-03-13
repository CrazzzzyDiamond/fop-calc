import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ConfirmDialog } from './ConfirmDialog'

export const ClearButton = () => {
	const [isOpen, setIsOpen] = useState(false)
	const { t } = useTranslation()

	const handleClear = () => {
		localStorage.setItem('incomes', JSON.stringify(null))
		window.dispatchEvent(new Event('storage'))
	}

	return (
		<>
			<button
				className="mr-4 px-4 py-2 bg-[#1071f2] text-white rounded cursor-pointer hover:bg-blue-700 transition-colors text-sm font-medium"
				onClick={() => setIsOpen(true)}
			>
				{t('clear')}
			</button>

			<ConfirmDialog
				isOpen={isOpen}
				title={t('clearTitle')}
				onCancel={() => setIsOpen(false)}
				onConfirm={handleClear}
			/>
		</>
	)
}
