import { useRef, useCallback } from 'react'

export function useDebounce<T extends (...args: any[]) => any>(
	callback: T,
	delay: number
) {
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
	const handlersRef = useRef<{
		resolve: (value: ReturnType<T>) => void
		reject: (reason?: any) => void
	} | null>(null)

	return useCallback(
		(...args: Parameters<T>): Promise<ReturnType<T>> => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current)

			return new Promise((resolve, reject) => {
				// Criamos um objeto de handlers para identificar esta chamada específica
				const currentHandlers = { resolve, reject }
				handlersRef.current = currentHandlers

				timeoutRef.current = setTimeout(async () => {
					try {
						const result = await callback(...args)

						// Só resolve se esta ainda for a chamada mais recente (debounce)
						if (handlersRef.current === currentHandlers) resolve(result)
					} catch (error) {
						// Só rejeita se esta ainda for a chamada mais recente
						if (handlersRef.current === currentHandlers) reject(error)
					}
				}, delay)
			})
		},
		[callback, delay]
	)
}
