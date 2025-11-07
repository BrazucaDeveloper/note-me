import { useLiveQuery } from 'dexie-react-hooks'
import { IndexDB } from '@/services/db.client'
import { useAuth } from '@clerk/clerk-react'

export function useTag() {
    const { userId } = useAuth()
    
    const create = async (title: string) => {
        return await IndexDB.tag.put({
            title,
            owner: Number(userId) || undefined,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        })
    }

    const tags = useLiveQuery(async () => await IndexDB.tag.toArray())

    const update = async (cid: number, title: string) => {
        return await IndexDB.tag.update(cid, {
            title,
            updatedAt: Date.now(),
        })
    }

    const remove = async (cid: number) => {
        return await IndexDB.transaction('rw', ['tag', 'noteTag'], async () => {
            await IndexDB.noteTag.where('tag').equals(cid).delete()
            await IndexDB.tag.delete(cid)
        })
    }

    const tagNote = async (note: number, tag: number) => {
        return await IndexDB.noteTag.put({ note, tag })
    }

    const unTagNote = async (note: number, tag: number) => {
        return await IndexDB.noteTag.delete(`${note}-${tag}` as never)
    }

    return {
        tags,
        tagNote,
        unTagNote,
        createTag: create,
        updateTag: update,
        removeTag: remove,
    }
}
