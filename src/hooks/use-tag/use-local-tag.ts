import { IndexDB } from '@/data/db.client'
import { useAuth } from '@clerk/clerk-react'
import Dexie from 'dexie'

export function useLocalTag() {
	const { userId } = useAuth()

	const create = async (title: string) => {
		return await IndexDB.tag.put({
			gid: null,
			title,
			status: 'active',
			owner: Number(userId) || null,
			createdAt: Date.now(),
			updatedAt: Date.now(),
		})
	}

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
		toggleLocalTagNote: toggleTagNote,
		createLocalTag: create,
		updateLocalTag: update,
		removeLocalTag: remove,
	}
}
