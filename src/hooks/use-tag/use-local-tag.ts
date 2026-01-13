import { IndexDB } from '@/data/db.client'
import { useAuth } from '@clerk/clerk-react'
import Dexie from 'dexie'

export function useLocalTag() {
	const { userId } = useAuth()

	const create = async (title: string) => {
		return await IndexDB.tag.add({
			title,
			status: 'active',
			owner: userId || undefined,
			createdAt: Date.now(),
			updatedAt: Date.now(),
		})
	}

	const update = async (id: string, title: string) => {
		return await IndexDB.tag.update(id, {
			title,
			updatedAt: Date.now(),
		})
	}

	const remove = async (id: string) => {
		return await IndexDB.transaction('rw', ['tag', 'noteTag'], async () => {
			await IndexDB.noteTag
				.where('[note+tag]')
				.between([Dexie.minKey, id], [Dexie.maxKey, id])
				.delete()
			await IndexDB.tag.delete(id)
		})
	}

	const toggleTagNote = async (noteId: string, tagId: string) => {
		const noteTag = IndexDB.noteTag
			.where('[note+tag]')
			.equals(`${noteId}-${tagId}`)

		if ((await noteTag.count()) > 0) return await noteTag.delete()
		const now = Date.now()

		return await IndexDB.noteTag.add({
			note: noteId,
			tag: tagId,
			createdAt: now,
			updatedAt: now,
			owner: userId || undefined,
		})
	}

	return {
		toggleLocalTagNote: toggleTagNote,
		createLocalTag: create,
		updateLocalTag: update,
		removeLocalTag: remove,
	}
}
