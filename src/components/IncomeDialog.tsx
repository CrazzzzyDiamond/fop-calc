import { useForm, Controller } from 'react-hook-form'
import dayjs from 'dayjs'
import { multiply } from 'mathjs'
import { useTranslation } from 'react-i18next'

import { Income, TotalSums } from '@src/types/Income'

import { getExchangeRate } from '../helpers/getExchangeRate'
import { uid } from '../helpers/generateId'

interface IncomeDialogProps {
	onCancel: () => void;
	setIncomes: React.Dispatch<React.SetStateAction<Income[]>>;
	editId?: string;
	setEditId?: (id: string) => void;
	parsedIncomesSums: TotalSums;
	incomes: Income[];
}

interface FormData {
	sum: string;
	date: string;
	currency: string;
}

const CURRENCY_OPTIONS = ['UAH', 'USD', 'EUR']

export const IncomeDialog = ({
	onCancel,
	setIncomes,
	editId,
	setEditId,
	incomes,
}: IncomeDialogProps) => {
	const { t } = useTranslation()
	let currentIncome: Income | null = null

	if (editId) {
		currentIncome = incomes.find(income => income.id === editId) || null
	}

	const lastCurrency = localStorage.getItem('lastCurrency') || 'UAH'

	const { control, handleSubmit } = useForm({
		defaultValues: {
			sum: currentIncome ? currentIncome.sum : '',
			date: currentIncome
				? dayjs(currentIncome.date, 'DD.MM.YYYY').format('YYYY-MM-DD')
				: dayjs().format('YYYY-MM-DD'),
			currency: currentIncome ? currentIncome.currency : lastCurrency,
		}
	})

	const submitFormData = async (data: FormData) => {
		localStorage.setItem('lastCurrency', data.currency)
		const isUah = data.currency === 'UAH'
		let rate = 1

		if (!isUah) {
			rate = await getExchangeRate(
				data.currency,
				dayjs(data.date).format('YYYYMMDD')
			)
		}

		// TODO: Refactor this
		if (!editId) {
			setIncomes((prevIncomes: Income[]) => {
				const newIncome: Income = {
					sum: data.sum,
					date: dayjs(data.date).format('DD.MM.YYYY'),
					currency: data.currency,
					uahSum: multiply(Number(data.sum), rate) as unknown as number,
					rate,
					id: uid(),
				}

				const newIncomes = [...prevIncomes, newIncome]

				localStorage.setItem('incomes', JSON.stringify(newIncomes))

				return newIncomes
			})
		} else {
			setIncomes((prevIncomes: Income[]) => {
				const newIncomes = prevIncomes.map(income => {
					if (income.id === editId) {
						return {
							...income,
							sum: data.sum,
							date: dayjs(data.date).format('DD.MM.YYYY'),
							currency: data.currency,
							uahSum: multiply(Number(data.sum), rate) as unknown as number,
							rate,
						}
					}

					return income
				})

				localStorage.setItem('incomes', JSON.stringify(newIncomes))

				return newIncomes
			})
		}

		onCancel()

		if (editId && setEditId) {
			setEditId('')
		}
	}

	const handleCancelClick = () => {
		onCancel()

		if (editId && setEditId) {
			setEditId('')
		}
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
			<div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
				<form onSubmit={handleSubmit(submitFormData)}>
					<div className="px-6 py-4 text-lg font-medium border-b border-gray-200">
						{t('addIncome')}
					</div>

					<div className="px-6 py-4 flex flex-col gap-4">
						<Controller
							name="sum"
							control={control}
							render={({ field }) => (
								<div className="flex flex-col gap-1">
									<label className="text-sm font-medium text-gray-700">{t('sum')}</label>
									<input
										{...field}
										type="text"
										required
										className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
								</div>
							)}
						/>

						<Controller
							name="date"
							control={control}
							render={({ field }) => (
								<div className="flex flex-col gap-1">
									<label className="text-sm font-medium text-gray-700">{t('date')}</label>
									<input
										{...field}
										type="date"
										required
										className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
								</div>
							)}
						/>

						<Controller
							name="currency"
							control={control}
							render={({ field }) => (
								<div className="flex flex-col gap-1">
									<label className="text-sm font-medium text-gray-700">{t('currency')}</label>
									<select
										{...field}
										className="px-3 py-2 border border-gray-300 rounded text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
									>
										{CURRENCY_OPTIONS.map((currency) => (
											<option key={currency} value={currency}>
												{currency}
											</option>
										))}
									</select>
								</div>
							)}
						/>
					</div>

					<div className="flex justify-end gap-2 px-6 pb-4">
						<button
							type="button"
							className="px-4 py-2 text-sm rounded border border-gray-300 hover:bg-gray-50 cursor-pointer"
							onClick={handleCancelClick}
						>
							{t('cancel')}
						</button>
						<button
							type="submit"
							className="px-4 py-2 text-sm rounded bg-[#1071f2] text-white hover:bg-blue-700 cursor-pointer"
						>
							{t('add')}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
