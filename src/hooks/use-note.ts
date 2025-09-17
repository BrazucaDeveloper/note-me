import { useLiveQuery } from 'dexie-react-hooks'
import { getNoteContext } from '@/components/note/note-context'
import { IndexDB, type Note } from '@/db'
import { cleanObject } from '@/lib/utils'

export function useNote() {
  const { query, selectedTag, setHasLocalSaved, startLocalSaveTransition } =
    getNoteContext()

  const create = async (): Promise<number> => {
    return await IndexDB.note.add({
      title: 'Give a title to your new note :)',
      content: '🌱 Sprout your ideias here!',
      isPined: false,
      createdAt: Date.now(),
      updatedAt: undefined,
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

      return sortDefault(filteredNotes)
    },
    [query, selectedTag],
    [],
  )

  const sortDefault = (notes: Note[]) => {
    return notes.sort((a, b) => {
      if ((a.isPined === true) === (b.isPined === true)) {
        return (b.createdAt || 0) - (a.createdAt || 0)
      }
      return a.isPined ? -1 : 1
    })
  }

  const findById = async (id: number): Promise<Note | undefined> => {
    return await IndexDB.note.get(id)
  }

  const update = async (
    note: Pick<Partial<Note>, 'title' | 'content' | 'isPined'> & { id: number },
  ): Promise<number> => {
    setHasLocalSaved(false)
    let isUpdated = 0

    startLocalSaveTransition(async () => {
      const noteCleaned = cleanObject(note)
  
      isUpdated = await IndexDB.note.update(note.id, {
        ...noteCleaned,
        updatedAt: Date.now(),
      })
    })

    setHasLocalSaved(isUpdated === 1)
    return isUpdated
  }

  const remove = async (id: number): Promise<boolean> => {
    await IndexDB.note.delete(id)
    return (await IndexDB.note.where({ id }).count()) <= 0
  }

  const togglePin = async (id: number) => {
    const note = await findById(id)
    if (!note) return

    await update({
      id,
      isPined: !note.isPined,
    })
  }

  const tagNote = async (note: number, tag: number) => {
    return await IndexDB.noteTag.put({ note, tag })
  }

  const unTagNote = async (note: number, tag: number) => {
    return await IndexDB.noteTag.delete(`${note}-${tag}` as never)
  }

  return {
    notes,
    findNoteById: findById,
    togglePin,
    tagNote,
    unTagNote,
    createNote: create,
    updateNote: update,
    deleteNote: remove,
  }
}
