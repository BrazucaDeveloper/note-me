import { cleanObject } from '@/lib/utils'
import { IndexDB } from '@/data/db.client'
import type { Note, UpdateNote } from '@/data/interfaces'
import { nanoid } from 'nanoid'

export function useLocalNote(owner?: string) {
	const create = async (existingNote?: Note) => {
		const newNote: Note = {
			id: nanoid(),
			title: 'Give a title to your new note :)',
			content: '🌱 Sprout your ideias here!',
			isPinned: false,
			status: 'active',
			owner,
			createdAt: Date.now(),
			updatedAt: Date.now(),
		}
		return await IndexDB.note.add(existingNote || newNote)
	}

	const update = async (note: UpdateNote) => {
		const noteCleaned = cleanObject(note)
		const rowsAffected = await IndexDB.note.update(note.id, noteCleaned)
		return rowsAffected > 0
	}

	const pull = async (notesToPull: Note[]) => {
		const rowsAffected = await IndexDB.note.bulkPut(notesToPull, {
			allKeys: true,
		})

		if (rowsAffected.length !== notesToPull.length)
			await IndexDB.note.bulkDelete(notesToPull.map(note => note.id))

		return rowsAffected
	}

	const read = async (id?: string, gteUpdatedAt?: number) => {
		if (id) {
			const noteById = await IndexDB.note.get(id)
			return noteById ? [noteById] : []
		}

		if (gteUpdatedAt) {
			return await IndexDB.note
				.where('updatedAt')
				.aboveOrEqual(gteUpdatedAt)
				.and(note => note.status === 'active')
				.toArray()
		}

		return await IndexDB.note.where('status').equals('active').toArray()
	}

	const remove = async (id: string) => {
		await IndexDB.note.delete(id)
		return (await IndexDB.note.where({ id }).count()) <= 0
	}

	return {
		createLocalNote: create,
		updateLocalNote: update,
		readLocalNote: read,
		pullNotesFromRemote: pull,
		deleteLocalNote: remove,
	}
}
