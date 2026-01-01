import { getNoteContext } from '@/global/note-context.tsx'
import { useLiveQuery } from 'dexie-react-hooks'
import { IndexDB, type Note } from '@/data/db.client'

export function useLiveQueryNote() {
	const { query, selectedTags } = getNoteContext()

	const sortDefault = (notes: Note[]) => {
		return notes.sort((a, b) => {
			if ((a.isPinned === true) === (b.isPinned === true))
				return b.createdAt - a.createdAt

			if (a.isPinned) return b.createdAt - a.createdAt
			if (b.isPinned) return b.createdAt - a.createdAt

			return b.createdAt - a.createdAt
		})
	}

	return useLiveQuery(async () => {
		if (query === '' && selectedTags.has('0')) return sortDefault(
			await IndexDB.note.where('status').equals('active').toArray()
		)

		let result: Note[] = []
		if (query !== '') {
			result = await IndexDB.note
			  .where('status')
				.equals('active')
				.filter(note => note.title.toLowerCase().includes(query.toLowerCase()))
				.toArray()
		}

		if (!selectedTags.has('0')) {
			const noteTag = await IndexDB.noteTag
				.filter(item => selectedTags.has(item.tag.toString()))
				.toArray()
			const notesByTag = (
				await IndexDB.note.bulkGet(noteTag.map(item => item.note))
			).filter(note => note !== undefined && note.status === 'active') as Note[]

			result = [...result, ...notesByTag]
		}
		return sortDefault(result)
	}, [query, selectedTags.size])
}
