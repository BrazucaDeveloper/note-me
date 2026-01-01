interface Note {
	cid: number
	gid?: number
	title: string
	content: string | null
	isPinned: boolean
	owner?: string
	createdAt: number
	updatedAt: number
	status: 'active' | 'trashed'
}

interface Tag {
	cid: number
	gid?: number
	title: string
	owner?: string
	createdAt: number
	updatedAt: number
	status: 'active' | 'trashed'
}

interface NoteTag {
	note: number
	tag: number
  gid?: number
	owner?: string
	createdAt: number
	updatedAt: number
}

export type { Note, Tag, NoteTag }
