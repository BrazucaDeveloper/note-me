import Dexie, { type EntityTable } from 'dexie';

export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const IndexDB = new Dexie('db.note.me') as Dexie & {
  notes: EntityTable<
    Note,
    'id'
  >;
};

IndexDB.version(1).stores({
  note: '++id, title, content, createdAt, updatedAt' 
});