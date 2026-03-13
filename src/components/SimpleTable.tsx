import { useState, useCallback, useRef, useEffect } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useElementRect } from '@src/hooks/useElementRect'

import { Income } from '../types/Income'
import { parseeIncomesSimple } from '../helpers/parseIncomes'
import { ConfirmDialog } from './ConfirmDialog'

interface SimpleTableProps {
	incomes: Income[];
	setIncomes: (incomes: Income[]) => void;
	setEditId: (id: string) => void;
	setIsAddDialogOpen: (isOpen: boolean) => void;
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
		setIncomes(incomes.filter(income => income.id !== id))
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

		checkElementPosition(tableRef.current as HTMLDivElement)
	}

	const addButtonRefCallback = useCallback((node: HTMLButtonElement) => {
		if (node) {
			buttonRef.current = node
			checkTableHeight()
		}
	}, [])

	// TODO: refactor behavior
	useEffect(() => {
		window.addEventListener('resize', checkTableHeight)

		return () => {
			window.removeEventListener('resize', checkTableHeight)
		}
	}, [incomes])

	const buttonFixedStyle: React.CSSProperties = isTableFullHeight
		? { position: 'fixed', bottom: 20, left: position.right - buttonWidth }
		: {}

	const buttonMobileStyle: React.CSSProperties = window.innerWidth <= 1372
		? { position: 'fixed', bottom: 20, left: position?.left, width: position?.width }
		: {}

	return (
		<div>
			<div className="rounded-lg shadow-md bg-white p-4">
				<div ref={tableRefCallback} className="overflow-x-auto">
					<table className="min-w-180 w-full text-sm border-collapse">
						<thead>
							<tr className="border-b border-gray-200">
								<th className="text-left px-4 py-3 font-semibold text-gray-700">{t('date')}</th>
								<th className="text-left px-4 py-3 font-semibold text-gray-700">{t('sum')}</th>
								<th className="text-left px-4 py-3 font-semibold text-gray-700">{t('currency')}</th>
								<th className="text-left px-4 py-3 font-semibold text-gray-700">{t('rate')}</th>
								<th className="text-left px-4 py-3 font-semibold text-gray-700">{t('uahSum')}</th>
								<th />
							</tr>
						</thead>
						<tbody>
							{parsedIncomes.map((income, id) => (
								<tr key={income.date + id} className="border-b border-gray-100 hover:bg-gray-50">
									<td className="px-4 py-2">{income.date}</td>
									<td className="px-4 py-2">{income.sum}</td>
									<td className="px-4 py-2">{income.currency}</td>
									<td className="px-4 py-2">{income.rate}</td>
									<td className="px-4 py-2">{income.uahSum.toFixed(2)}</td>
									<td className="px-4 py-2 text-center whitespace-nowrap">
										<button
											className="p-1 rounded hover:bg-gray-100 text-gray-600 cursor-pointer"
											onClick={() => setEditId(income.id)}
										>
											<Pencil size={16} />
										</button>
										<button
											className="p-1 rounded hover:bg-gray-100 text-gray-600 cursor-pointer"
											onClick={() => setIdToDelete(income.id)}
										>
											<Trash2 size={16} />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className="flex justify-end mt-4">
					<button
						ref={addButtonRefCallback}
						className="px-4 py-2 bg-[#1071f2] text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium cursor-pointer"
						onClick={() => setIsAddDialogOpen(true)}
						style={{ ...buttonFixedStyle, ...buttonMobileStyle }}
					>
						{t('addIncome')}
					</button>
				</div>

				<ConfirmDialog
					isOpen={!!idToDelete}
					onCancel={() => setIdToDelete('')}
					onConfirm={() => handleDelete(idToDelete)}
				/>
			</div>
		</div>
	)
}
