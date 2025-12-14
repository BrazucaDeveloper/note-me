import { useLiveQuery } from 'dexie-react-hooks'
import { IndexDB } from '@/services/db.client'
import { useAuth } from '@clerk/clerk-react'
import Dexie from 'dexie'
import { useRef } from 'react'

export function useTag(noteIdToSearch: number | null = null) {
	const { userId } = useAuth()
	const noteIdToSearchRef = useRef<number | null>(noteIdToSearch)

	const create = async (title: string) => {
		return await IndexDB.tag.put({
			gid: null,
			title,
			owner: Number(userId) || null,
			createdAt: Date.now(),
			updatedAt: Date.now(),
		})
	}

	const tags = useLiveQuery(async () => await IndexDB.tag.toArray(), [])

	const tagsByNote = useLiveQuery(async () => {
		if (!noteIdToSearchRef.current) return []
		const noteTag = await IndexDB.noteTag
			.where('note')
			.equals(noteIdToSearchRef.current)
			.toArray()
		return await IndexDB.tag.bulkGet(noteTag.map(item => item.tag))
	}, [noteIdToSearchRef.current])

	const handleNoteToSearch = (note: number | null) =>
		(noteIdToSearchRef.current = note)

	const update = async (cid: number, title: string) => {
		return await IndexDB.tag.update(cid, {
			title,
			updatedAt: Date.now(),
		})
	}

	const remove = async (cid: number) => {
		console.log('Deleting tag with ID:', cid)
		return await IndexDB.transaction('rw', ['tag', 'noteTag'], async () => {
			await IndexDB.noteTag
				.where('[note+tag]')
				.between([Dexie.minKey, cid], [Dexie.maxKey, cid])
				.delete()
			await IndexDB.tag.delete(cid)
		})
	}

	const toggleTagNote = async (note: number, tag: number) => {
		const noteTag = IndexDB.noteTag.where('[note+tag]').equals(`${note}-${tag}`)

		if ((await noteTag.count()) > 0) return await noteTag.delete()
		const now = Date.now()

		return await IndexDB.noteTag.add({
			note,
			tag,
			createdAt: now,
			updatedAt: now,
			owner: Number(userId) || null,
		})
	}

	return {
		tags,
		toggleTagNote,
		tagsByNote,
		handleNoteToSearch,
		createTag: create,
		updateTag: update,
		removeTag: remove,
	}
}
