import { useState, useCallback, useRef, useEffect } from 'react'
import {
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	IconButton,
	Box, 
	Button,
	Paper,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useTranslation } from 'react-i18next'
import { useElementRect }   from '@src/hooks/useElementRect'

import { Income } from '../types/Income'
import { parseeIncomesSimple } from '../helpers/parseIncomes'
import { ConfirmDialog } from './ConfirmDialog'

interface SimpleTableProps {
    incomes: Income[];
    setIncomes: (incomes: Income[]) => void;
    setEditId: (id: string) => void;
	setIsAddDialogOpen: (isOpen: boolean) => void;
}

const mainBoxStyle = {
	display: 'flex',
	gap: 4,
	['@media (max-width: 1230px)']: {
		display: 'block',
		width: '100%',
	},
}

const buttonWrapperStyle = {
	display: 'flex',
	justifyContent: 'flex-end',
	marginTop: 2,
}

export const SimpleTable = ({
	incomes,
	setIncomes,
	setEditId,
	setIsAddDialogOpen,
}: SimpleTableProps) => {
	const { t } = useTranslation()
	const [idToDelete, setIdToDelete] = useState<string>('')
	const buttonRef = useRef<HTMLButtonElement | null>(null)
	const tableRef = useRef<HTMLDivElement | null>(null)
	const [isTableFullHeight, setIsTableFullHeight] = useState(false)
	const { position, checkElementPosition } = useElementRect()
	const buttonWidth = buttonRef.current?.offsetWidth || 0

	const parsedIncomes = parseeIncomesSimple(incomes)

	const tableRefCallback = useCallback((node: HTMLDivElement) => {
		if (node) {
			tableRef.current = node
			checkElementPosition(node)
		}
	}, [])

	const handleDelete = (id: string) => {
		const newIncomes = incomes.filter(income => income.id !== id)

		setIncomes(newIncomes)
		localStorage.setItem('incomes', JSON.stringify(newIncomes))
	}

	const checkTableHeight = () => {
		if (tableRef.current) {
			const tableRect = tableRef.current.getBoundingClientRect()
			const tableHeight = tableRect.height

			if (tableHeight > window.innerHeight - 220) {
				setIsTableFullHeight(true)
			} else {
				setIsTableFullHeight(false)
			}
		}
	}

	const addButtonRefCallback = useCallback((node: HTMLButtonElement) => {
		if (node) {
			buttonRef.current = node
			checkTableHeight()
		}
	}, [])

	useEffect(() => {
		window.addEventListener('resize', checkTableHeight)

		return () => {
			window.removeEventListener('resize', checkTableHeight)
		}
	}, [incomes])

	return (
		<Box sx={mainBoxStyle}>
			<Paper
				elevation={3}
				sx={{ padding: 2 }}
			>
				<TableContainer 
					ref={tableRefCallback}
				>
					<Table sx={{ minWidth: 720 }}>
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

				<Box sx={buttonWrapperStyle}>
					<Button
						ref={addButtonRefCallback}
						variant="contained"
						color="primary"
						onClick={() => setIsAddDialogOpen(true)}
						sx={{
							backgroundColor: '#1071f2',
							['@media (min-width: 1230px)']: {
								...isTableFullHeight && {
									position: 'fixed',
									bottom: 20,
									left: position.right - buttonWidth,
								},
							},
							['@media (max-width: 1230px)']: {
								position: 'fixed',
								bottom: 20,
								left: position.left,
								width: position.width,
							}
						}}
					>
						{t('addIncome')}
					</Button>
				</Box>

				<ConfirmDialog
					isOpen={!!idToDelete}
					onCancel={() => setIdToDelete('')}
					onConfirm={() => handleDelete(idToDelete)}
				/>
			</Paper>
		</Box>
	)
}