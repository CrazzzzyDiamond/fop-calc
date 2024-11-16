import { useState } from 'react'
import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { ConfirmDialog } from './ConfirmDialog'

export const ClearButton = () => {
	const [isOpen, setIsOpen] = useState(false)
	const { t } = useTranslation()

	const handleClear = () => {
		localStorage.setItem('incomes', JSON.stringify(null))
	}

	return (
		<>
			<Button
				sx={{
					marginRight: '1rem',
					backgroundColor: '#1071f2',
					color: 'white',
				}}
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