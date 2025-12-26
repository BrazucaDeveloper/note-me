import { IndexDB } from '@/data/db.client'
import { useLiveQuery } from 'dexie-react-hooks'
import { useState } from 'react'

export function useLiveQueryTag() {
	const [noteIdToSearch, setNoteIdToSearch] = useState<number | null>(null)
	const handleNoteIdToSearch = (id: number | null) => setNoteIdToSearch(id)

	const tags = useLiveQuery(async () => await IndexDB.tag.toArray(), [])

	const tagsByNote = useLiveQuery(async () => {
		if (!noteIdToSearch) return []
		const noteTag = await IndexDB.noteTag
			.where('note')
			.equals(noteIdToSearch)
			.toArray()
		return await IndexDB.tag.bulkGet(noteTag.map(item => item.tag))
	}, [noteIdToSearch])

	return {
		tags,
		tagsByNote,
		handleNoteIdToSearch,
	}
}
