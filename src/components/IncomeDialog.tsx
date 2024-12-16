import { Box, Button } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
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
	date: dayjs.Dayjs;
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

	console.log(currentIncome)

	const {
		control,
		handleSubmit
	} = useForm({
		defaultValues: {
			sum: currentIncome ? currentIncome.sum : '',
			date: currentIncome ? dayjs(currentIncome.date, 'DD.MM.YYYY') : dayjs(),
			currency: currentIncome ? currentIncome.currency : 'UAH',
		}
	})

	const submitFormData = async (data: FormData) => {
		const isUah = data.currency === 'UAH'
		let rate = 1
	
		if (!isUah) {
			rate = await getExchangeRate(
				data.currency,
				data.date.format('YYYYMMDD')
			)
		}

		// TODO: Refactor this
		if (!editId) {
			setIncomes((prevIncomes: Income[]) => {
				const newIncome: Income = {
					sum: data.sum,
					date: data.date.format('DD.MM.YYYY'),
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
							date: data.date.format('DD.MM.YYYY'),
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
		<Dialog open={true}>
			<form onSubmit={handleSubmit(submitFormData)}>
				<DialogTitle>{t('addIncome')}</DialogTitle>
				<DialogContent
					sx={{
						padding: 2,
					}}
				>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: 2,
							padding: 1,
						}}
					>
						<Controller
							name="sum"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									label={t('sum')}
									required
								/>
							)}
						/>
						<Controller
							name="date"
							control={control}
							render={({ field }) => (
								<DatePicker
									{...field}
									label={t('date')}
									views={['day', 'month']}
								/>
							)}
						/>

						<Controller
							name="currency"
							control={control}
							render={({ field }) => (
								<FormControl>
									<InputLabel
										id="demo-simple-select-autowidth-label"
									>
										{t('currency')}
									</InputLabel>
									<Select
										labelId="demo-simple-select-autowidth-label"
										id="demo-simple-select-autowidth"
										fullWidth
										label={t('currency')}
										{...field}
									>
										{CURRENCY_OPTIONS.map((currency) => (
											<MenuItem key={currency} value={currency}>
												{currency}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							)}
						/>
					</Box>
				</DialogContent>
				<DialogActions
					sx={{
						padding: 2,
					}}
				>
					<Button
						onClick={handleCancelClick}
						color="secondary"
						variant="outlined"
					>
						{t('cancel')}
					</Button>
					<Button
						color="primary"
						variant="contained"
						type="submit"
					>
						{t('add')}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	)
}