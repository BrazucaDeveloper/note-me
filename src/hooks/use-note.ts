import { IndexDB, type Note } from '@/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { createContext, useContext, useState } from 'react';

export function useNote() {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)

  const noteContext = createContext({
    selectedNote,
    handleNoteSelect: (note: Note) => setSelectedNote(note),
  });

  const create = async (note?: Partial<Note>): Promise<number> => {
    return await IndexDB.note.add({
      title: note?.title ?? 'Give a title to your new note :)',
      content: note?.content ?? 'lorem ipsum',
      createdAt: note?.createdAt ?? Date.now(),
      updatedAt: note?.updatedAt ?? undefined,
    })
  }

  const notes = useLiveQuery(async () => {
    /*
      Query the DB using our promise based API.
      The end result will magically become observable.
    */
    return await IndexDB.note.reverse().toArray()
  })

  const update = (note: Partial<Note> & { id: number }): void => {
    IndexDB.note.update(note.id, note)
  }

  const remove = async (id: number): Promise<boolean> => {
    await IndexDB.note.delete(id)
    return (await IndexDB.note.where({ id }).count()) <= 0
  }

  return {
    notes,
    noteContext: useContext(noteContext),
    NoteProvider: noteContext.Provider,
    createNote: create,
    updateNote: update,
    deleteNote: remove,
  }
}
