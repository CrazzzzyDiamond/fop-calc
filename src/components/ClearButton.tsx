import { useState } from 'react'
import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { ConfirmDialog } from './ConfirmDialog'

const clearButtonStyle = {
	marginRight: '1rem',
	backgroundColor: '#1071f2',
	color: 'white',
}

export const ClearButton = () => {
	const [isOpen, setIsOpen] = useState(false)
	const { t } = useTranslation()

	const handleClear = () => {
		localStorage.setItem('incomes', JSON.stringify(null))
		window.dispatchEvent(new Event('storage'))
	}

	return (
		<>
			<Button
				sx={clearButtonStyle}
				onClick={() => setIsOpen(true)}
			>
            	{ t('clear')}
			</Button>

			<ConfirmDialog 
				isOpen={isOpen}
				title={t('clearTitle')}
				onCancel={() => setIsOpen(false)}
				onConfirm={handleClear}
			/>
		</>
	)
}