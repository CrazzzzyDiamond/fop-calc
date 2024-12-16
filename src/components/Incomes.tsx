import { useState, useEffect } from 'react'
import { Box } from '@mui/material'

import { Income } from '@src/types/Income'

import { IncomeDialog } from './IncomeDialog'
import { SimpleTable } from './SimpleTable'
import { parseIncomesSums } from '../helpers/parseIncomes'
import { EmptyWarner } from './EmptyWarner'
import { Total } from './Total'

const incomesWrapperStyle = {
	padding: 4,
	paddingBottom: 10,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	['@media (max-width: 1230px)']: {
		padding: 2,
		paddingBottom: 10,
	},
}

const incomesContainerStyle = {
	display: 'flex',
	gap: 4,
	alignItems: 'flex-start',
	['@media (max-width: 1230px)']: {
		display: 'block',
		width: '100%',
	},
}

export const Incomes = () => {
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
	const [editId, setEditId] = useState<string>('')
	const [incomes, setIncomes] = useState<Income[]>([])
	const parsedIncomesSums = parseIncomesSums(incomes)

	useEffect(() => {
		const storedIncomes = localStorage.getItem('incomes')

		if (storedIncomes && storedIncomes !== 'null') {
			setIncomes(JSON.parse(storedIncomes))
		}
	}, [])

	return (
		<Box sx={incomesWrapperStyle}>
			{incomes.length === 0 && (
				<EmptyWarner handleAdd={() => setIsAddDialogOpen(true)} />
			)}

			{incomes.length > 0 && (
				<Box sx={incomesContainerStyle}>
					<Total parsedIncomesSums={parsedIncomesSums} />

					<SimpleTable
						incomes={incomes}
						setIncomes={setIncomes}
						setEditId={setEditId}
						setIsAddDialogOpen={setIsAddDialogOpen}
					/>
				</Box>
			)}

			{(!!editId || isAddDialogOpen) && (
				<IncomeDialog
					onCancel={() => setIsAddDialogOpen(false)}
					setIncomes={setIncomes}
					editId={editId}
					setEditId={setEditId}
					parsedIncomesSums={parsedIncomesSums}
					incomes={incomes}
				/>
			)}
		</Box>
	)
}