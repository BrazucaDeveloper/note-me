import { getNoteContext } from '@/global/note-context.tsx'
import { useLiveQuery } from 'dexie-react-hooks'
import { IndexDB, type Note } from '@/data/db.client'

export function useLiveQueryNote() {
	const { query, selectedTags } = getNoteContext()

	const sortDefault = (notes: Note[]) => {
		return notes.sort((a, b) => {
			if ((a.isPined === true) === (b.isPined === true))
				return b.createdAt - a.createdAt

			if (a.isPined) return b.createdAt - a.createdAt
			if (b.isPined) return b.createdAt - a.createdAt

			return b.createdAt - a.createdAt
		})
	}

	return useLiveQuery(async () => {
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
}
