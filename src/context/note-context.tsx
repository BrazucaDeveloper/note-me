import { useDebounce } from '@/hooks/use-debounce'
import type { Note } from '@/services/db.client'
import { createContext, useContext, useState } from 'react'

interface NoteContextProps {
    selectedNote: Note | null
    handleNoteSelect: (note: Note | null) => void
    query: string
    handleQueryChange: (query: string) => void
    selectedTags: string[]
    handleTagsSelected: (tags: string[]) => void
}

const NoteContext = createContext({} as NoteContextProps)

const NoteProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedTags, setSelectedTag] = useState<string[]>([])
    const handleTagsSelected = (tags: string[]) => {
        setSelectedTag(tags)
        console.log('Tags selected:', tags)
    }

    const [selectedNote, setSelectedNote] = useState<Note | null>(null)
    const handleNoteSelect = (note: Note | null) => setSelectedNote(note)

    const handleQueryChange = useDebounce(
        (newQuery: string) => setQuery(newQuery.trim()),
        500
    )
    const [query, setQuery] = useState<string>('')

    return (
        <NoteContext
            value={{
                selectedNote,
                handleNoteSelect,
                query,
                handleQueryChange,
                selectedTags,
                handleTagsSelected,
            }}
        >
            {children}
        </NoteContext>
    )
}

const getNoteContext = () => useContext(NoteContext)

export { getNoteContext, NoteProvider }
