import type { Note, UpdateNote } from '@/data/interfaces'
import { useFetch } from '../utils/use-fetch'
import { cleanObject } from '@/lib/utils'

export function useRemoteNote() {
	const fetch = useFetch(`${import.meta.env.VITE_API_PROXY}/note`)

	const push = async (notesToPush: Note[], lastSync: number) => {
		const response = await fetch({
			method: 'PUT',
			subUrl: `/sync/${lastSync}`,
			body: JSON.stringify({ notes: notesToPush }),
		})

		const { data, status, message } = await response.json<{ notes: Note[] }>()

		if (status !== 200) throw new Error(message)
		return data.notes
	}

	const create = async (note: Note) => {
		const response = await fetch({
			method: 'POST',
			body: JSON.stringify(note),
		})

		if (!response.ok) throw new Error('Failed to create remote note')
		const { status, data } = await response.json<{ id: string }>()

		if (status !== 201) throw new Error('Failed to create remote note')
		return data.id
	}

	const update = async (note: UpdateNote) => {
		const noteCleaned = cleanObject(note)

		const response = await fetch({
			method: 'PATCH',
			subUrl: `/${noteCleaned.id}`,
			body: JSON.stringify(noteCleaned),
		})

		if (!response.ok) throw new Error('Failed to update note')
		const { status, data, message } = await response.json<{ id: string }>()

		if (status !== 200) throw new Error(message)
		return data.id !== null
	}

	const remove = async () => {}

	return {
		pushNotesToRemote: push,
		createRemoteNote: create,
		updateRemoteNote: update,
		deleteRemoteNote: remove,
	}
}
