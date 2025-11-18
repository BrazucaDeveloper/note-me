import { useLiveQuery } from 'dexie-react-hooks'
import { IndexDB } from '@/services/db.client'
import { useAuth } from '@clerk/clerk-react'
import Dexie from 'dexie'

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

    const tags = useLiveQuery(async () => await IndexDB.tag.toArray(), [])

    const tagsByNote = useLiveQuery(async () => {
        const noteTags = await IndexDB.noteTag.toArray()
        return noteTags.map(tag => tag.tag)
    })

    const update = async (cid: number, title: string) => {
        return await IndexDB.tag.update(cid, {
            title,
            updatedAt: Date.now(),
        })
    }

    const remove = async (cid: number) => {
        return await IndexDB.transaction('rw', ['tag', 'noteTag'], async () => {
            await IndexDB.noteTag
                .where('[note+tag]')
                .between([Dexie.minKey, cid], [Dexie.maxKey, cid])
                .delete()
            await IndexDB.tag.delete(cid)
        })
    }

    const toggleTagNote = async (note: number, tag: number) => {
        const noteTag = IndexDB.noteTag
            .where('[note+tag]')
            .equals(`${note}-${tag}`)
        if ((await noteTag.count()) > 0) return await noteTag.delete()
        return await IndexDB.noteTag.add({ note, tag })
    }

    return {
        tags,
        toggleTagNote,
        tagsByNote,
        createTag: create,
        updateTag: update,
        removeTag: remove,
    }
}
