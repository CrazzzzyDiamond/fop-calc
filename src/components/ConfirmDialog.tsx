import { Button } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { useTranslation } from 'react-i18next'

interface ConfirmDialogProps {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

export const ConfirmDialog = ({
	isOpen,
	onCancel,
	onConfirm,
}: ConfirmDialogProps) => {
	const { t } = useTranslation()

	const handleConfirm = () => {
		onConfirm()
		onCancel()
	}

	return (
		<Dialog
			open={isOpen}
			onClose={onCancel}
		>
			<DialogTitle>
				{t('areYouSure')}
			</DialogTitle>
			<DialogContent>
				{t('canNotBeUndone')}
			</DialogContent>
			<DialogActions>
				<Button
					onClick={onCancel}
				>
					{t('cancel')}
				</Button>
				<Button
					onClick={handleConfirm}
					color='error'
				>
					{t('confirm')}
				</Button>
			</DialogActions>
		</Dialog>
	)
}