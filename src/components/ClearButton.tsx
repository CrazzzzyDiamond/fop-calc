import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ConfirmDialog } from './ConfirmDialog'

interface ClearButtonProps {
	onClear: () => void;
}

export const ClearButton = ({ onClear }: ClearButtonProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const { t } = useTranslation()

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
				onConfirm={onClear}
			/>
		</>
	)
}
