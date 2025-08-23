import { IndexDB, type Note } from '@/db'
import { useLiveQuery } from 'dexie-react-hooks'

export function useNote() {
  const create = async (): Promise<number> => {
    return await IndexDB.note.add({
      title: 'Give a title to your new note :)',
      content: 'Sprout your ideias in this note',
      isPined: false,
      createdAt: Date.now(),
      updatedAt: undefined,
    })
  }

  const notes = useLiveQuery(async () => {
    /*
      Query the DB using our promise based API.
      The end result will magically become observable.
    */
    return await IndexDB.note.reverse().toArray()
  })

  const update = async (
    note: Pick<Partial<Note>, 'title' | 'content' | 'isPined'> & { id: number },
  ): Promise<number> => {
    return await IndexDB.note.update(note.id, {
      title: note.title,
      isPined: note.isPined ?? false,
      content: note.content,
      updatedAt: Date.now(),
    })
  }

  const remove = async (id: number): Promise<boolean> => {
    await IndexDB.note.delete(id)
    return (await IndexDB.note.where({ id }).count()) <= 0
  }

  return {
    notes,
    createNote: create,
    updateNote: update,
    deleteNote: remove,
  }
}
