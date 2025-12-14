import { turso } from '@/services/db.server'
import type { NoteToUpload } from '@/services/interfaces'
import { useAuth } from '@clerk/clerk-react'
import { sqlQuerys } from './sql-querys'

export function useSyncCloud() {
	const { userId } = useAuth()
	const { uploadNoteQuery } = sqlQuerys

	const uploadNotes = async (note: NoteToUpload) => {
		if (!userId) return
		const rs = await turso.execute({
			sql: uploadNoteQuery,
			args: [
				note.cid,
				note.title,
				note.content || null,
				note.isPined,
				userId!,
				note.createdAt,
				note.updatedAt,
			],
		})
		console.log(`Note '${note.cid}' saved :p \n`, rs.toJSON())
	}

	const downloadNotes = () => {}

	const uploadTags = () => {}

	const downloadTags = () => {}

	const uploadNoteTag = () => {}

	const downloadNoteTag = () => {}

	return {
		upload: {
			note: uploadNotes,
			noteTag: uploadNoteTag,
			tags: uploadTags,
		},
		download: {
			note: downloadNotes,
			noteTag: downloadNoteTag,
			tags: downloadTags,
		},
	}
}
