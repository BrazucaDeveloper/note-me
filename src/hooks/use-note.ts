import { cleanObject } from '@/lib/utils'
import { IndexDB, type Note } from '@/services/db.client'
import type { NoteToUpdate } from '@/services/interfaces'
import { useAuth } from '@clerk/clerk-react'
import { getNoteContext } from '@/global/note-context.tsx'
import { useLiveQuery } from 'dexie-react-hooks'

export function useNote() {
	const { userId } = useAuth()
	const { query, selectedTags } = getNoteContext()

	const create = async (): Promise<number> => {
		return await IndexDB.note.add({
			gid: null,
			title: 'Give a title to your new note :)',
			content: '🌱 Sprout your ideias here!',
			isPined: false,
			owner: Number(userId) || null,
			createdAt: Date.now(),
			updatedAt: Date.now(),
		})
	}

	const notes = useLiveQuery(async () => {
		if (query === '' && selectedTags.has('0'))
			return sortDefault(await IndexDB.note.toArray())

		let result: Note[] = []
		if (query !== '') {
			result = await IndexDB.note
				.filter(note => note.title.toLowerCase().includes(query.toLowerCase()))
				.toArray()
		}

		if (!selectedTags.has('0')) {
			const noteTag = await IndexDB.noteTag
				.filter(item => selectedTags.has(item.tag.toString()))
				.toArray()
			const notesByTag = (
				await IndexDB.note.bulkGet(noteTag.map(item => item.note))
			).filter(note => note !== undefined)

			result = [...result, ...notesByTag]
		}
		return sortDefault(result)
	}, [query, selectedTags.size])

	const sortDefault = (notes: Note[]) => {
		return notes.sort((a, b) => {
			if ((a.isPined === true) === (b.isPined === true))
				return b.createdAt - a.createdAt

			if (a.isPined) return b.createdAt - a.createdAt
			if (b.isPined) return b.createdAt - a.createdAt

			return b.createdAt - a.createdAt
		})
	}

	const findById = async (cid: number): Promise<Note | undefined> => {
		return await IndexDB.note.get(cid)
	}

	const update = async (note: NoteToUpdate): Promise<number> => {
		const noteCleaned = cleanObject(note)
		return await IndexDB.note.update(note.cid, {
			...noteCleaned,
			updatedAt: Date.now(),
		})
	}

	const remove = async (cid: number): Promise<boolean> => {
		await IndexDB.note.delete(cid)
		return (await IndexDB.note.where({ cid }).count()) <= 0
	}

	const togglePin = async (cid: number) => {
		const note = await findById(cid)
		if (!note) return

		await update({
			cid,
			isPined: !note.isPined,
		})
	}

	return {
		notes,
		findNoteById: findById,
		togglePin,
		createNote: create,
		updateNote: update,
		deleteNote: remove,
	}
}
