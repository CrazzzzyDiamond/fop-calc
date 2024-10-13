import { useEffect, useState } from 'react'

export const useElementRect = (elementRef: React.RefObject<HTMLDivElement>) => {
	const [position, setPosition] = useState({
		right: 0,
		bottom: 0,
		left: 0,
		top: 0,
		width: 0,
		height: 0,
	})

	const checkElementPosition = () => {
		if (elementRef.current) {
			const elementRect = elementRef.current.getBoundingClientRect()

			console.log(elementRect)

			setPosition(elementRect)
		}
	}

	useEffect(() => {
		checkElementPosition()
		window.addEventListener('resize', checkElementPosition)

		return () => {
			window.removeEventListener('resize', checkElementPosition)
		}
	}, [])

	return position
}