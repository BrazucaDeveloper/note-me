import Dexie, { type EntityTable } from 'dexie'

interface Note {
    cid: number // client ID
    gid?: number // global ID
    title: string
    content?: string
    isPined?: boolean
    owner?: number // user global ID
    createdAt: number
    updatedAt?: number
}

interface Tag {
    cid: number // client ID
    gid?: number // global ID
    title: string
    owner?: number // user global ID
    createdAt?: number
    updatedAt?: number
}

interface NoteTag {
    note: number // note client ID
    tag: number // tag client ID
    owner?: number // global user ID
    createdAt?: number
    updatedAt?: number
}

const IndexDB = new Dexie('db.note.me') as Dexie & {
    note: EntityTable<Note, 'cid'>
    tag: EntityTable<Tag, 'cid'>
    noteTag: EntityTable<NoteTag>
}

IndexDB.version(1).stores({
    note: '++cid, gid, title, content, isPined, owner, createdAt, updatedAt',
    tag: '++cid, gid, title, owner, createdAt, updatedAt',
    noteTag: '[note+tag], gid, createdAt, updatedAt',
})

export { IndexDB, type Note }
