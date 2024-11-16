import { useState, useEffect, useRef, useCallback } from 'react'
import {
	Box,
	Button,
	Paper,
} from '@mui/material'
import { useTranslation } from 'react-i18next'

import { IncomeDialog } from './IncomeDialog'
import { Income } from '@src/types/Income'
import { SimpleTable } from './SimpleTable'
import { parseIncomesSums } from '../helpers/parseIncomes'
import { EmptyWarner } from './EmptyWarner'
import { Total } from './Total'
import { useElementRect }   from '@src/hooks/useElementRect'

export const Incomes = () => {
	const { t } = useTranslation()
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [isTableFullHeight, setIsTableFullHeight] = useState(false)
	const [editId, setEditId] = useState<string>('')
	const [incomes, setIncomes] = useState<Income[]>([])
	const tableRef = useRef<HTMLDivElement | null>(null)
	const buttonRef = useRef<HTMLButtonElement | null>(null)

	const parsedIncomesSums = parseIncomesSums(incomes)
	const { position, checkElementPosition } = useElementRect()
	const buttonWidth = buttonRef.current?.offsetWidth || 0

	const tableRefCallback = useCallback((node: HTMLDivElement) => {
		if (node) {
			tableRef.current = node
			checkElementPosition(node)
		}
	}, [])

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

	useEffect(() => {
		const storedIncomes = localStorage.getItem('incomes')

		if (storedIncomes && storedIncomes !== 'null') {
			setIncomes(JSON.parse(storedIncomes))
		}
	}, [])

	return (
		<Box
			sx={{
				padding: 4,
				paddingBottom: 10,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				['@media (max-width: 1230px)']: {
					padding: 2,
					paddingBottom: 10,
				},
			}}
		>
			{incomes.length === 0 && (
				<EmptyWarner
					handleAdd={() => setIsDialogOpen(true)}
				/>
			)}

			{incomes.length > 0 && (
				<Box
					sx={{
						display: 'flex',
						gap: 4,
						alignItems: 'flex-start',
						['@media (max-width: 1230px)']: {
							display: 'block',
							width: '100%',
						},
					}}
				>
					<Paper
						elevation={3}
						sx={{	
							position: 'sticky',
							top: 80,
							padding: 2,
							['@media (max-width: 1230px)']: {
								position: 'static',
								marginBottom: 4,
							},
						}}
					>
						<Total parsedIncomesSums={parsedIncomesSums} />
					</Paper>
					<Box
						sx={{
							display: 'flex',
							gap: 4,
							['@media (max-width: 1230px)']: {
								display: 'block',
								width: '100%',
							},
						}}
					>
						<Paper
							elevation={3}
							sx={{
								padding: 2,
							}}
						>
							<SimpleTable
								incomes={incomes}
								setIncomes={setIncomes}
								setEditId={setEditId}
								tableRef={tableRefCallback}
							/>

							<Box
								sx={{
									display: 'flex',
									justifyContent: 'flex-end',
									marginTop: 2,
								}}
							>
								<Button
									ref={addButtonRefCallback}
									variant="contained"
									color="primary"
									onClick={() => setIsDialogOpen(true)}
									sx={{
										backgroundColor: '#1071f2',
										// color: '#29323d',
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
						</Paper>
					</Box>
				</Box>
			)}

			<IncomeDialog
				isOpen={isDialogOpen}
				onCancel={() => setIsDialogOpen(false)}
				setIncomes={setIncomes}
				editId={editId}
				setEditId={setEditId}
				parsedIncomesSums={parsedIncomesSums}
			/>
		</Box>
	)
}