import type { Note } from '@/data/interfaces'
import { useFetch } from '../use-fetch'
import { cleanObject } from '@/lib/utils'
import { useDebounce } from '../use-debounce'
import { useLocalNote } from './use-local-note'

export function useRemoteNote() {
	const fetch = useFetch(import.meta.env.VITE_API_PROXY)
	const { readLocalNote } = useLocalNote()

	const create = useDebounce(async (note: Omit<Note, 'gid'>) => {
		const response = await fetch({
			method: 'POST',
			subUrl: '/notes',
			body: JSON.stringify(note),
		})

		if (!response.ok) throw new Error('Failed to create remote note')
		return 1
	}, 4_000)

	const update = useDebounce(async (note: Partial<Note> & { gid: number }) => {
		const noteCleaned = cleanObject(note)

		const response = await fetch({
			method: 'PATCH',
			subUrl: `/notes/${noteCleaned.gid}`,
			body: JSON.stringify(noteCleaned),
		})

		// if (!response.ok) throw new Error('Failed to update note')
		console.log(await response.json())
		return 1
	}, 4_000)

	const upsert = async (note: Partial<Note>) => {
		if (note.gid) {
			return await update({ ...note, gid: note.gid })
		} else {
			const [localNote] = await readLocalNote(note.cid)
			return await create(localNote)
		}
	}

	const remove = async () => {}

	return {
		createRemoteNote: create,
		updateRemoteNote: update,
		upsertRemoteNote: upsert,
		deleteRemoteNote: remove,
	}
}
