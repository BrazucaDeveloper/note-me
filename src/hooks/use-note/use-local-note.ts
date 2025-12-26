import { cleanObject } from '@/lib/utils'
import { IndexDB } from '@/data/db.client'
import type { Note } from '@/data/interfaces'
import { useDebounce } from '../use-debounce'

export function useLocalNote() {
	const create = useDebounce(async (note: Omit<Note, 'cid'>) => {
		return await IndexDB.note.add(note)
	}, 500)

	const update = async (note: Partial<Note> & { cid: number }) => {
		const noteCleaned = cleanObject(note)
		return await IndexDB.note.update(note.cid, {
			...noteCleaned,
			updatedAt: Date.now(),
		})
	}

	const read = async (cid?: number) => {
		if (!cid) return IndexDB.note.toArray()
		const noteFoundById = await IndexDB.note.get(cid)
		return noteFoundById ? [noteFoundById] : []
	}

	const remove = async (cid: number) => {
		await IndexDB.note.delete(cid)
		return (await IndexDB.note.where({ cid }).count()) <= 0
	}

	return {
		createLocalNote: create,
		updateLocalNote: update,
		readLocalNote: read,
		deleteLocalNote: remove,
	}
}
