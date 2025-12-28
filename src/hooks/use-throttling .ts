import { useRef } from 'react'

export function useThrottle<T extends (...args: any[]) => void>(
	callback: T,
	delay: number
) {
	let lastCallRef = useRef<number>(0)

	return (...args: any[]) => {
		const now = Date.now()

		const timeSinceLastCall = now - lastCallRef.current
		const hasPassedDelay = delay <= timeSinceLastCall

		if (hasPassedDelay) {
			callback(...args)
			lastCallRef.current = now
		}
	}
}
