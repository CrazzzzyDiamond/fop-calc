import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Book } from '@src/types/Book'
import { ConfirmDialog } from './ConfirmDialog'

interface BookSelectorProps {
	books: Book[];
	activeBookId: string;
	onSelect: (id: string) => void;
	onCreate: (name: string) => void;
	onDelete: (id: string) => void;
}

export const BookSelector = ({ books, activeBookId, onSelect, onCreate, onDelete }: BookSelectorProps) => {
	const { t } = useTranslation()
	const [isCreating, setIsCreating] = useState(false)
	const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false)
	const [newName, setNewName] = useState(`ФОП ${new Date().getFullYear()}`)

	const handleCreate = () => {
		if (newName.trim()) {
			onCreate(newName.trim())
			setIsCreating(false)
			setNewName(`ФОП ${new Date().getFullYear()}`)
		}
	}

	return (
		<div className="flex items-center gap-1 mr-3">
			<select
				value={activeBookId}
				onChange={e => onSelect(e.target.value)}
				className="px-2 py-1 bg-white text-gray-900 border border-gray-300 rounded text-sm focus:outline-none"
			>
				{books.map(book => (
					<option key={book.id} value={book.id}>{book.name}</option>
				))}
			</select>

			<button
				className="p-1 rounded text-white hover:bg-blue-700 cursor-pointer"
				onClick={() => setIsCreating(true)}
				title={t('newBook')}
			>
				<Plus size={18} />
			</button>

			{books.length > 1 && (
				<button
					className="p-1 rounded text-white hover:bg-blue-700 cursor-pointer"
					onClick={() => setIsConfirmDeleteOpen(true)}
					title={t('deleteBook')}
				>
					<Trash2 size={18} />
				</button>
			)}

			<ConfirmDialog
				isOpen={isConfirmDeleteOpen}
				title={t('deleteBookTitle')}
				onCancel={() => setIsConfirmDeleteOpen(false)}
				onConfirm={() => onDelete(activeBookId)}
			/>

			{isCreating && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
					<div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-4 p-6">
						<div className="text-lg font-medium mb-4">{t('newBook')}</div>
						<label className="text-sm font-medium text-gray-700 block mb-1">{t('bookName')}</label>
						<input
							type="text"
							value={newName}
							onChange={e => setNewName(e.target.value)}
							onKeyDown={e => e.key === 'Enter' && handleCreate()}
							autoFocus
							className="w-full px-3 py-2 border border-gray-300 rounded text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<div className="flex justify-end gap-2">
							<button
								className="px-4 py-2 text-sm rounded border border-gray-300 hover:bg-gray-50 cursor-pointer"
								onClick={() => setIsCreating(false)}
							>
								{t('cancel')}
							</button>
							<button
								className="px-4 py-2 text-sm rounded bg-[#1071f2] text-white hover:bg-blue-700 cursor-pointer"
								onClick={handleCreate}
							>
								{t('create')}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
