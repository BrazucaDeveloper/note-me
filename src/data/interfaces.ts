interface Note {
	cid: number // client ID
	gid: number | null // global ID
	title: string
	content: string | null
	isPinned: boolean
	owner: number | null // user global ID
	createdAt: number
	updatedAt: number
	status: 'active' | 'trashed'
}

interface Tag {
	cid: number // client ID
	gid: number | null // global ID
	title: string
	owner: number | null // user global ID
	createdAt: number
	updatedAt: number
	status: 'active' | 'trashed'
}

interface NoteTag {
	note: number // note client ID
	tag: number // tag client ID
	owner: number | null // global user ID
	createdAt: number
	updatedAt: number
}

export type { Note, Tag, NoteTag }
