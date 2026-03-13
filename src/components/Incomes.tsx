import { useState } from 'react'

import { Income } from '@src/types/Income'

import { IncomeDialog } from './IncomeDialog'
import { SimpleTable } from './SimpleTable'
import { parseIncomesSums } from '../helpers/parseIncomes'
import { EmptyWarner } from './EmptyWarner'
import { Total } from './Total'

interface IncomesProps {
	incomes: Income[];
	setIncomes: React.Dispatch<React.SetStateAction<Income[]>>;
}

export const Incomes = ({ incomes, setIncomes }: IncomesProps) => {
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
	const [editId, setEditId] = useState<string>('')
	const parsedIncomesSums = parseIncomesSums(incomes)

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
