import Dexie, { type EntityTable } from "dexie";

interface Note {
    id: number;
    title: string;
    content?: string;
    isPined?: boolean;
    createdAt: number; // timestamp
    updatedAt?: number; // timestamp
}

interface Tag {
    id: number;
    title: string;
    createdAt?: number; // timestamp
    updatedAt?: number; // timestamp
}

interface NoteTag {
    note: number;
    tag: number;
    createdAt?: number; // timestamp
    updatedAt?: number; // timestamp
}

const IndexDB = new Dexie("db.note.me") as Dexie & {
    note: EntityTable<Note, "id">;
    tag: EntityTable<Tag, "id">;
    noteTag: EntityTable<NoteTag>;
};

IndexDB.version(2).stores({
    note: "++id, title, content, isPined, createdAt, updatedAt",
    tag: "++id, title",
    noteTag: "[note+tag]",
});

export { IndexDB, type Note };
