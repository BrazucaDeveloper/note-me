import Dexie, { type EntityTable } from 'dexie'

interface Note {
  id: number
  title: string
  content?: string
  isPined?: boolean
  createdAt: number // timestamp
  updatedAt?: number // timestamp
}

interface Tag {
  id: number
  title: string
}

interface NoteTag {
  note: number
  tag: number
}

const IndexDB = new Dexie('db.note.me') as Dexie & {
  note: EntityTable<Note, 'id'>
  tag: EntityTable<Tag, 'id'>
  noteTag: EntityTable<NoteTag>
}

IndexDB.version(2)
  .stores({
    note: '++id, title, content, isPined, createdAt, updatedAt',
    tag: '++id, title',
    noteTag: '[note+tag]',
  })
  .upgrade((tx) => {
    return tx
      .table('note')
      .toCollection()
      .modify((note) => {
        if (note.isPined === undefined) note.isPined = false
        if (note.tags === undefined) note.tags = ''
      })
  })

export { IndexDB, type Note }
