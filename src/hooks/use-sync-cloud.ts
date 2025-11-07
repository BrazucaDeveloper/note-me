import { IndexDB, type Note } from '@/services/db.client'
import { turso } from '@/services/db.server'

export function useSyncCloud() {
    const uploadNotes = async (note: Note) => {
        const rs = await turso.execute({
            sql: 'INSERT INTO note (cid, title, content, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)',
            args: [note.cid, note.title, note.content, note.createdAt, note.updatedAt]
        })
        console.log(rs.toJSON())
    }

    const downloadNotes = () => {}

    const uploadNoteTag = () => {
        IndexDB.noteTag.where('updatedAt').between(0, 1)
    }

    const downloadNoteTag = () => {}

    const uploadTags = () => {
        IndexDB.tag.where('updatedAt').between(0, 1)
    }

    const downloadTags = () => {}

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
        }
    }
}
