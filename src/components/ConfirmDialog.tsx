import { useTranslation } from 'react-i18next'

interface ConfirmDialogProps {
	isOpen: boolean;
	onCancel: () => void;
	onConfirm: () => void;
	title?: string;
}

export const ConfirmDialog = ({
	isOpen,
	onCancel,
	onConfirm,
	title,
}: ConfirmDialogProps) => {
	const { t } = useTranslation()

	const handleConfirm = () => {
		onConfirm()
		onCancel()
	}

	if (!isOpen) return null

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onCancel}>
			<div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-4" onClick={e => e.stopPropagation()}>
				<div className="px-6 py-4 text-lg font-medium">
					{title || t('areYouSure')}
				</div>
				<div className="px-6 pb-4 text-gray-600 text-sm">
					{t('canNotBeUndone')}
				</div>
				<div className="flex justify-end gap-2 px-6 pb-4">
					<button
						className="px-4 py-2 text-sm rounded border border-gray-300 hover:bg-gray-50 cursor-pointer"
						onClick={onCancel}
					>
						{t('cancel')}
					</button>
					<button
						className="px-4 py-2 text-sm rounded bg-red-500 text-white hover:bg-red-600 cursor-pointer"
						onClick={handleConfirm}
					>
						{t('confirm')}
					</button>
				</div>
			</div>
		</div>
	)
}
