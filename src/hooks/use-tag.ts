import { useLiveQuery } from 'dexie-react-hooks'
import { IndexDB } from '@/services/db.client'
import { useAuth } from '@clerk/clerk-react'
import Dexie from 'dexie'
import { useRef } from 'react'

export function useTag() {
    const { userId } = useAuth()
    const noteIdToSearch = useRef<number | null>(null)

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
        if (!noteIdToSearch.current) return []
        const noteTag = await IndexDB.noteTag
            .where('note')
            .equals(noteIdToSearch.current)
            .toArray()
        return await IndexDB.tag.bulkGet(noteTag.map(item => item.tag))
    }, [noteIdToSearch.current])

    const handleNoteToSearch = (note: number | null) =>
        (noteIdToSearch.current = note)

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
        const now = Date.now()

        return await IndexDB.noteTag.add({
            note,
            tag,
            createdAt: now,
            updatedAt: now,
            owner: Number(userId) || undefined,
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
