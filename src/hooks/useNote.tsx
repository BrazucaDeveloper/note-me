import { IndexDB, type Note } from "@/db";
import { useLiveQuery } from "dexie-react-hooks";

export function useNote() {
  const create = async (note?: Partial<Note>) => {
    return await IndexDB.note.add({
      title: note?.title ?? 'Give a title to your new note :)',
      content:  note?.content ?? 'lorem ipsum',
      createdAt: note?.createdAt ?? Date.now(),
      updatedAt: note?.updatedAt ?? undefined
    });
  }

  const notes = useLiveQuery(async () => {
    /* Query the DB using our promise based API.
       The end result will magically become observable. */
    return await IndexDB.note.reverse().toArray();
  });

  const update = (note: Note) => {

  }

  const remove = async(id: number) => {
    await IndexDB.note.delete(id);
    return !!await IndexDB.note.where({ id }).count();
  }
  
  return {
    notes,
    createNote: create,
    updateNote: update,
    deleteNote: remove 
  }
}