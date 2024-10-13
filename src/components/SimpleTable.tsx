import { useState } from 'react'
import {
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	IconButton
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useTranslation } from 'react-i18next'

import { Income } from '../types/Income'
import { parseeIncomesSimple } from '../helpers/parseIncomes'
import { ConfirmDialog } from './ConfirmDialog'

interface SimpleTableProps {
    incomes: Income[];
    setIncomes: (incomes: Income[]) => void;
    setEditId: (id: string) => void;
	tableRef: React.RefObject<HTMLDivElement>;
}

export const SimpleTable = ({
	incomes,
	setIncomes,
	setEditId,
	tableRef,
}: SimpleTableProps) => {
	const { t } = useTranslation()
	const [idToDelete, setIdToDelete] = useState<string>('')

	const parsedIncomes = parseeIncomesSimple(incomes)

	const handleDelete = (id: string) => {
		const newIncomes = incomes.filter(income => income.id !== id)

		setIncomes(newIncomes)
		localStorage.setItem('incomes', JSON.stringify(newIncomes))
	}

	return (
		<>
			<TableContainer ref={tableRef}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell variant='head'>{t('date')}</TableCell>
							<TableCell variant='head'>{t('sum')}</TableCell>
							<TableCell variant='head'>{t('currency')}</TableCell>
							<TableCell variant='head'>{t('rate')}</TableCell>
							<TableCell variant='head'>{t('uahSum')}</TableCell>
							<TableCell />
						</TableRow>
					</TableHead>
					<TableBody>
						{parsedIncomes.map((income, id) => (
							<TableRow
								key={income.date + id}
								hover
							>
								<TableCell>{income.date}</TableCell>
								<TableCell>{income.sum}</TableCell>
								<TableCell>{income.currency}</TableCell>
								<TableCell>{income.rate}</TableCell>
								<TableCell>{income.uahSum.toFixed(2)}</TableCell>
								<TableCell align='center'>
									<IconButton
										onClick={() => {
											setEditId(income.id)
										}}
									>
										<EditIcon />
									</IconButton>
									<IconButton
										onClick={() => {
											setIdToDelete(income.id)
										}}
									>
										<DeleteIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			<ConfirmDialog
				isOpen={!!idToDelete}
				onCancel={() => setIdToDelete('')}
				onConfirm={() => handleDelete(idToDelete)}
			/>
		</>
	)
}