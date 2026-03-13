import { useTranslation } from 'react-i18next'

interface EmptyWarnerProps {
	handleAdd: () => void;
}

export const EmptyWarner = ({ handleAdd }: EmptyWarnerProps) => {
	const { t } = useTranslation()

	return (
		<div className="p-8">
			<div className="rounded-lg shadow-md p-12 text-center bg-white">
				<h3 className="text-4xl font-light mb-8">
					{t('noIncomes')}
				</h3>
				<button
					className="px-6 py-3 bg-[#1071f2] text-white rounded cursor-pointer hover:bg-blue-700 transition-colors text-base font-medium"
					onClick={handleAdd}
				>
					{t('addIncome')}
				</button>
			</div>
		</div>
	)
}
