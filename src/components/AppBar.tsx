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
	return (
		<header className="sticky top-0 z-50 bg-[#1071f2] shadow-md">
			<div className="flex justify-between items-center w-full px-4 py-2">
				<span className="text-white text-lg font-medium">
					FOP Calculator
				</span>
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
