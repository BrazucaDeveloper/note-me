import { useRef } from 'react'

/**
 * Debounce a function call
 * @param callback The function to be called
 * @param delay The delay in milliseconds
 * @returns A function that can be called to debounce the original function
 */
export function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // biome-ignore lint/complexity/useArrowFunction: <It's more readable this way>
  return function (...args: Parameters<T>): void {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      callback(...args)
    }, delay)
  } as T
}
