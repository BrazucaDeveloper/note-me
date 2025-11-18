import { IndexDB, type Note } from '@/services/db.client'
import { turso } from '@/services/db.server'
import { useAuth } from '@clerk/clerk-react'

export function useSyncCloud() {
    const { userId } = useAuth()

    const uploadNotes = async (note: Note) => {
        // const rs = await turso.execute({
        //     sql: 'INSERT INTO note (gid, cid, title, content, isPined, owner, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
        //     args: [
        //         userId!,
        //         note.cid,
        //         note.title,
        //         note.content || 'Nothing to here...',
        //         note.isPined,
        //         note.owner || null,
        //         note.createdAt,
        //         note.updatedAt,
        //     ],
        // })
        // console.log(rs.toJSON())
        console.log(`Note '${note.cid}' cloud save`)
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
        },
    }
}
