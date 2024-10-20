import { useState } from 'react'

export const useElementRect = () => {
	const [position, setPosition] = useState({
		right: 0,
		bottom: 0,
		left: 0,
		top: 0,
		width: 0,
		height: 0,
	})

	const checkElementPosition = (el: HTMLDivElement) => {
		if (el) {
			const elementRect = el.getBoundingClientRect()

			setPosition(elementRect)
		}
	}

	return { position, checkElementPosition }
}