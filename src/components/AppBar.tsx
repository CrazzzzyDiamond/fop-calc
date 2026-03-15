import { useState, useEffect, useRef } from 'react'
import { Info } from 'lucide-react'
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
	const [showInfo, setShowInfo] = useState(false)
	const infoRef = useRef<HTMLDivElement>(null)

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

	return (
		<header className="sticky top-0 z-50 bg-[#1071f2] shadow-md">
			<div className="flex justify-between items-center w-full px-4 py-2">
				<div ref={infoRef} className="relative flex items-center gap-1.5">
					<span className="text-white text-lg font-medium">FOP Calculator</span>
					<button onClick={() => setShowInfo(v => !v)} className="cursor-pointer text-white/70 hover:text-white transition-colors">
						<Info size={18} />
					</button>
					{showInfo && (
						<div className="absolute top-full left-0 mt-2 w-72 rounded-lg bg-white shadow-lg p-3 text-xs text-gray-600 leading-relaxed z-50">
							{t('privacy')}
						</div>
					)}
				</div>
				<div className="flex items-center">
					<BookSelector
						books={books}
						activeBookId={activeBookId}
						onSelect={onSelectBook}
						onCreate={onCreateBook}
						onDelete={onDeleteBook}
					/>
					<ClearButton onClear={onClear} />
					<LangSelect />
				</div>
			</div>
		</header>
	)
}
