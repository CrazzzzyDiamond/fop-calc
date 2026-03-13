import { useState, useEffect } from 'react'

import { Income } from '@src/types/Income'

import { IncomeDialog } from './IncomeDialog'
import { SimpleTable } from './SimpleTable'
import { parseIncomesSums } from '../helpers/parseIncomes'
import { EmptyWarner } from './EmptyWarner'
import { Total } from './Total'

export const Incomes = () => {
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
	const [editId, setEditId] = useState<string>('')
	const [incomes, setIncomes] = useState<Income[]>([])
	const parsedIncomesSums = parseIncomesSums(incomes)

	const updateIncomes = () => {
		const storedIncomes = localStorage.getItem('incomes')

		if (storedIncomes && storedIncomes !== 'null') {
			setIncomes(JSON.parse(storedIncomes))
		}

		if (storedIncomes === 'null') {
			setIncomes([])
		}
	}

	useEffect(() => {
		updateIncomes()

		window.addEventListener('storage', updateIncomes)

		return () => {
			window.removeEventListener('storage', updateIncomes)
		}
	}, [])

	return (
		<div className="p-8 pb-10 flex justify-center items-center max-[1372px]:p-4 max-[1372px]:pb-10">
			{incomes.length === 0 && (
				<EmptyWarner handleAdd={() => setIsAddDialogOpen(true)} />
			)}

			{incomes.length > 0 && (
				<div className="flex gap-8 items-start max-[1372px]:block max-[1372px]:w-full">
					<Total parsedIncomesSums={parsedIncomesSums} />

					<SimpleTable
						incomes={incomes}
						setIncomes={setIncomes}
						setEditId={setEditId}
						setIsAddDialogOpen={setIsAddDialogOpen}
					/>
				</div>
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
		</div>
	)
}
