import { getNoteContext } from '@/components/note/note-context'
import { IndexDB, type Note } from '@/db'
import { cleanObject } from '@/lib/utils'
import { useLiveQuery } from 'dexie-react-hooks'

export function useNote() {
  const { query } = getNoteContext()

  const create = async (): Promise<number> => {
    return await IndexDB.note.add({
      title: 'Give a title to your new note :)',
      content: '🌱 Sprout your ideias here!',
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
    if (!query || query === '') {
      // Buscar todas as notas e ordenar manualmente
      const allNotes = await IndexDB.note.toArray()
      // Ordenar: primeiro por isPined (true primeiro), depois por data (mais recente primeiro)
      return allNotes.sort((a, b) => {
        // Se ambas têm o mesmo status de fixação, ordena por data (mais recente primeiro)
        if ((a.isPined === true) === (b.isPined === true)) {
          return (b.createdAt || 0) - (a.createdAt || 0)
        }
        // Caso contrário, coloca as fixadas primeiro
        return a.isPined ? -1 : 1
      })
    }

    // Para busca com query, fazer o mesmo processo
    const filteredNotes = await IndexDB.note
      .where('title')
      .startsWithIgnoreCase(query)
      .toArray()
    
    // Aplicar a mesma lógica de ordenação
    return filteredNotes.sort((a, b) => {
      if ((a.isPined === true) === (b.isPined === true)) {
        return (b.createdAt || 0) - (a.createdAt || 0)
      }
      return a.isPined ? -1 : 1
    })
  }, [query], [])

  const findById = async (id: number): Promise<Note | undefined> => {
    return await IndexDB.note.get(id)
  }

  const update = async (
    note: Pick<Partial<Note>, 'title' | 'content' | 'isPined'> & { id: number },
  ): Promise<number> => {
    // Remove undefined values from note object
    const noteCleaned = cleanObject(note)

    return await IndexDB.note.update(note.id, {
      ...noteCleaned,
      updatedAt: Date.now()
    })
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

  return {
    notes,
    findNoteById: findById,
    togglePin,
    createNote: create,
    updateNote: update,
    deleteNote: remove,
  }
}
