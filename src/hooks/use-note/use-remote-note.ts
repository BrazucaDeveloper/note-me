import type { Note } from '@/data/interfaces'
import { useFetch } from '../use-fetch'
import { cleanObject } from '@/lib/utils'
import { useDebounce } from '../use-debounce'
import { useLocalNote } from './use-local-note'

export function useRemoteNote() {
	const { readLocalNote } = useLocalNote()
	const fetch = useFetch(import.meta.env.VITE_API_PROXY)

	const create = useDebounce(async (note: Omit<Note, 'gid'>) => {
		const response = await fetch({
			method: 'POST',
			subUrl: '/note',
			body: JSON.stringify(note),
		})

		if (!response.ok) throw new Error('Failed to create remote note')
		const { status, data, message } = await response.json<{ gid: number }>()
    
		console.error(message)
		
		if (status !== 201) throw new Error('Failed to create remote note')
		return data.gid
	}, 4_000)

	const update = useDebounce(async (note: Partial<Note> & { gid: number }) => {
		const noteCleaned = cleanObject(note)

		const response = await fetch({
			method: 'PATCH',
			subUrl: `/notes/${noteCleaned.gid}`,
			body: JSON.stringify(noteCleaned),
		})

		if (!response.ok) throw new Error('Failed to update note')
    const { status, data, message } = await response.json<{ gid: number }>()
    
    console.error(message)
		
		if (status !== 201) throw new Error('Failed to create remote note')
		return data.gid
	}, 4_000)

	const upsert = async (note: Partial<Note>) => {
		if (note.gid) {
			return await update({ ...note, gid: note.gid })
		} else {
			const [localNote] = await readLocalNote(note.cid)
			return await create(localNote)
		}
	}

	const remove = async () => { }

	return {
		createRemoteNote: create,
		updateRemoteNote: update,
		upsertRemoteNote: upsert,
		deleteRemoteNote: remove,
	}
}
