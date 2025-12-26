import { useAuth } from '@clerk/clerk-react'

function useFetch(baseUrl: string) {
	const { getToken } = useAuth()

	return async (options?: RequestInit & { subUrl?: string }) => {
		const token = await getToken()
		const headers = {
			Authorization: `Bearer ${token}`,
			...options?.headers,
		}

		const { subUrl } = options || {}
		const url = `${baseUrl}${subUrl || ''}`

		return fetch(url, { ...options, headers })
	}
}

export { useFetch }
