import { LangSelect } from './LangSelect'
import { ClearButton } from './ClearButton'

export const AppBar = () => {
	return (
		<header className="sticky top-0 z-50 bg-[#1071f2] shadow-md">
			<div className="flex justify-between items-center w-full px-4 py-2">
				<span className="text-white text-lg font-medium">
					FOP Calculator
				</span>
				<div className="flex items-center">
					<ClearButton />
					<LangSelect />
				</div>
			</div>
		</header>
	)
}
