import Dexie, { type EntityTable } from 'dexie'
import type { Note, Tag, NoteTag } from './interfaces'

const IndexDB = new Dexie('db.note.me') as Dexie & {
	note: EntityTable<Note, 'cid'>
	tag: EntityTable<Tag, 'cid'>
	noteTag: EntityTable<NoteTag>
}

IndexDB.version(1).stores({
	note: '++cid, gid, title, content, isPinned, owner, createdAt, updatedAt',
	tag: '++cid, gid, title, owner, createdAt, updatedAt',
	noteTag: '[note+tag], gid, createdAt, updatedAt',
})

export { IndexDB, type Note, type Tag, type NoteTag }
