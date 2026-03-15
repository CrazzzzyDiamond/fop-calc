import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ConfirmDialog } from './ConfirmDialog'

interface ClearButtonProps {
	onClear: () => void;
	className?: string;
	bookName?: string;
}

export const ClearButton = ({ onClear, className, bookName }: ClearButtonProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const { t } = useTranslation()

	return (
		<>
			<button
				className={className ?? "mr-4 px-4 py-2 bg-[#1071f2] text-white rounded cursor-pointer hover:bg-blue-700 transition-colors text-sm font-medium"}
				onClick={() => setIsOpen(true)}
			>
				{t('clear')}
			</button>

			<ConfirmDialog
				isOpen={isOpen}
				title={bookName ? t('clearTitleBook', { name: bookName }) : t('clearTitle')}
				onCancel={() => setIsOpen(false)}
				onConfirm={onClear}
			/>
		</>
	)
}
