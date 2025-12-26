import type { Note } from '@/data/interfaces'
import { useFetch } from '../use-fetch'
import { cleanObject } from '@/lib/utils'
import { useDebounce } from '../use-debounce'

export function useRemoteNote() {
	const fetch = useFetch(import.meta.env.VITE_API_PROXY)

	const create = useDebounce(async (note: Omit<Note, 'gid'>) => {
		const response = await fetch({
			method: 'POST',
			subUrl: '/notes',
			body: JSON.stringify(note),
		})

		if (!response.ok) {
			throw new Error('Failed to create note')
		}
		console.log(await response.json())
		return 1
	}, 5_000)

	const update = async (note: Partial<Note> & { gid: number }) => {
		const x = cleanObject(note)
		const response = await fetch({
			method: 'PATCH',
			subUrl: '/notes',
			body: JSON.stringify(x),
		})

		if (!response.ok) {
			throw new Error('Failed to create note')
		}
		console.log(await response.json())
		return 1
	}

	const remove = async () => {}

	return {
		createRemoteNote: create,
		updateRemoteNote: update,
		deleteRemoteNote: remove,
	}
}
