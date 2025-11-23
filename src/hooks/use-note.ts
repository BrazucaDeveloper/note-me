import { useLiveQuery } from 'dexie-react-hooks'
import { getNoteContext } from '@context/note-context'
import { IndexDB, type Note } from '@/services/db.client'
import { cleanObject } from '@/lib/utils'
import { useAuth } from '@clerk/clerk-react'
import type { NoteToUpdate } from '@/services/interfaces'

export function useNote() {
    const { userId } = useAuth()
    const { query, selectedTags } = getNoteContext()

    const create = async (): Promise<number> => {
        return await IndexDB.note.add({
            title: 'Give a title to your new note :)',
            content: '🌱 Sprout your ideias here!',
            isPined: false,
            owner: Number(userId) || undefined,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        })
    }

    const notes = useLiveQuery(
        async () => {
            if (!query || query === '') {
                const allNotes = await IndexDB.note.toArray()
                return sortDefault(allNotes)
            }

            const filteredNotes = await IndexDB.note
                .where('title')
                .startsWithIgnoreCase(query)
                .toArray()

            console.log('Capturing notes')
            notesByTags()
            return sortDefault(filteredNotes)

            // const filteredNotesByTags = await IndexDB.note.toArray()
            // const mergedNotes = [...filteredNotes, ...filteredNotesByTags]
            // return sortDefault(mergedNotes)
        },
        [query, selectedTags],
        []
    )

    const notesByTags = async () => {
        const tags =
            selectedTags?.map(selectedTag => {
                return IndexDB.tag.where('title').equalsIgnoreCase(selectedTag)
            }) ?? []

        console.dir(tags)
        // const noteTag = await IndexDB.noteTag.where('note').anyOf(tags.map((tag) => tag.)).toArray()
    }

    const sortDefault = (notes: Note[]) => {
        return notes.sort((a, b) => {
            if ((a.isPined === true) === (b.isPined === true)) {
                return (b.createdAt || 0) - (a.createdAt || 0)
            }
            return a.isPined ? -1 : 1
        })
    }

    const findById = async (cid: number): Promise<Note | undefined> => {
        return await IndexDB.note.get(cid)
    }

    const update = async (note: NoteToUpdate): Promise<number> => {
        const noteCleaned = cleanObject(note)

        return await IndexDB.note.update(note.cid, {
            ...noteCleaned,
            updatedAt: Date.now(),
        })
    }

    const remove = async (cid: number): Promise<boolean> => {
        await IndexDB.note.delete(cid)
        return (await IndexDB.note.where({ cid }).count()) <= 0
    }

    const togglePin = async (cid: number) => {
        const note = await findById(cid)
        if (!note) return

        await update({
            cid,
            isPined: !note.isPined,
        })
    }

    return {
        notes,
        findNoteById: findById,
        togglePin,
        createNote: create,
        updateNote: update,
        deleteNote: remove,
    }
}
