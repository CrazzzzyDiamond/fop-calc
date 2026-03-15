import { useState, useEffect, useRef } from 'react'
import { Info, Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Book } from '@src/types/Book'
import { BookSelector } from './BookSelector'
import { LangSelect } from './LangSelect'
import { ClearButton } from './ClearButton'

interface AppBarProps {
	books: Book[];
	activeBookId: string;
	onSelectBook: (id: string) => void;
	onCreateBook: (name: string) => void;
	onDeleteBook: (id: string) => void;
	onClear: () => void;
}

export const AppBar = ({ books, activeBookId, onSelectBook, onCreateBook, onDeleteBook, onClear }: AppBarProps) => {
	const { t } = useTranslation()
	const activeBookName = books.find(b => b.id === activeBookId)?.name
	const [showInfo, setShowInfo] = useState(false)
	const [showMenu, setShowMenu] = useState(false)
	const infoRef = useRef<HTMLDivElement>(null)
	const menuRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!showInfo) return
		const handler = (e: MouseEvent) => {
			if (infoRef.current && !infoRef.current.contains(e.target as Node)) {
				setShowInfo(false)
			}
		}
		document.addEventListener('mousedown', handler)
		return () => document.removeEventListener('mousedown', handler)
	}, [showInfo])

	useEffect(() => {
		if (!showMenu) return
		const handler = (e: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setShowMenu(false)
			}
		}
		document.addEventListener('mousedown', handler)
		return () => document.removeEventListener('mousedown', handler)
	}, [showMenu])

	return (
		<header className="sticky top-0 z-50 bg-[#1071f2] shadow-md">
			<div className="flex justify-between items-center w-full px-4 py-2">
				{/* Left: title + info */}
				<div ref={infoRef} className="relative flex items-center gap-1.5">
					<span className="text-white text-lg font-medium whitespace-nowrap">FOP Calculator</span>
					<button onClick={() => setShowInfo(v => !v)} className="cursor-pointer text-white/70 hover:text-white transition-colors">
						<Info size={20} />
					</button>
					{showInfo && (
						<div className="absolute top-full left-0 mt-2 w-72 rounded-lg bg-white shadow-lg p-3 text-xs text-gray-600 leading-relaxed z-50">
							{t('privacy')}
						</div>
					)}
				</div>

				{/* Desktop controls */}
				<div className="hidden sm:flex items-center">
					<BookSelector
						books={books}
						activeBookId={activeBookId}
						onSelect={onSelectBook}
						onCreate={onCreateBook}
						onDelete={onDeleteBook}
					/>
					<ClearButton onClear={onClear} bookName={activeBookName} />
					<LangSelect />
				</div>

				{/* Mobile: hamburger */}
				<div ref={menuRef} className="relative sm:hidden">
					<button
						onClick={() => setShowMenu(v => !v)}
						className="cursor-pointer text-white p-1"
					>
						{showMenu ? <X size={22} /> : <Menu size={22} />}
					</button>

					{showMenu && (
						<div className="absolute top-full right-0 mt-2 w-56 rounded-lg bg-white shadow-lg p-3 flex flex-col gap-3 z-50">
							<BookSelector
								books={books}
								activeBookId={activeBookId}
								onSelect={onSelectBook}
								onCreate={onCreateBook}
								onDelete={onDeleteBook}
								fullWidth
							/>
							<ClearButton
								onClear={onClear}
								bookName={activeBookName}
								className="w-full px-4 py-2 bg-[#1071f2] text-white rounded cursor-pointer hover:bg-blue-700 transition-colors text-sm font-medium"
							/>
							<LangSelect className="w-full px-2 py-1 bg-white text-gray-900 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
						</div>
					)}
				</div>
			</div>
		</header>
	)
}
