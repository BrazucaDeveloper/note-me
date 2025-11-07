import { useDebounce } from "@/hooks/use-debounce";
import type { Note } from "@/services/db.client";
import { createContext, useContext, useState } from "react";

interface NoteContextProps {
    selectedNote: Note | null
    handleNoteSelect: (note: Note | null) => void
    query: string | null
    setQuery: (query: string) => void
    selectedTag: string | null
    setTag: (tag: string | null) => void
}

const NoteContext = createContext({} as NoteContextProps);

const NoteProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const handleTagSelect = (tag: string | null) => setSelectedTag(tag);

    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const handleNoteSelect = (note: Note | null) => setSelectedNote(note);


    const handleQueryChange = useDebounce((newQuery: string) => setQuery(newQuery.trim()), 500);
    const [query, setQuery] = useState<string | null>(null);

    return (
        <NoteContext
            value={{
                selectedNote,
                handleNoteSelect,
                query,
                setQuery: handleQueryChange,
                selectedTag,
                setTag: handleTagSelect,
            }}
        >
            {children}
        </NoteContext>
    );
};

const getNoteContext = () => useContext(NoteContext);

export { getNoteContext, NoteProvider };
