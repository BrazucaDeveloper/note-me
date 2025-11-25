interface Note {
	cid: number // client ID
	gid?: number // global ID
	title: string
	content?: string
	isPined: boolean
	owner?: number // user global ID
	createdAt: number
	updatedAt: number
}

interface Tag {
	cid: number // client ID
	gid?: number // global ID
	title: string
	owner?: number // user global ID
	createdAt: number
	updatedAt: number
}

interface NoteTag {
	note: number // note client ID
	tag: number // tag client ID
	owner?: number // global user ID
	createdAt: number
	updatedAt: number
}

type NoteToUpdate = Pick<Partial<Note>, 'title' | 'content' | 'isPined'> & {
	cid: number
}

type NoteToUpload = Omit<Note, 'owner' | 'gid'>

export type { Note, Tag, NoteTag, NoteToUpdate, NoteToUpload }
