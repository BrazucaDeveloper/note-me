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

export type { Note, Tag, NoteTag }
