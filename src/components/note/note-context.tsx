import type { Note } from '@/db'
import { useDebounce } from '@/hooks/use-debounce'
import { createContext, useContext, useState } from 'react'

interface NoteContextProps {
  selectedNote: Note | null
  handleNoteSelect: (note: Note | null) => void
  query: string | null
  setQuery: (query: string) => void
}

const NoteContext = createContext({} as NoteContextProps)

const HALF_MINUTE = 500

const NoteProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [query, setQuery] = useState<string | null>(null)

  const handleNoteSelect = (note: Note | null) => setSelectedNote(note)

  const handleQueryChange = useDebounce((newQuery: string) => {
    setQuery(newQuery.trim())
  }, HALF_MINUTE)

  return (
    <NoteContext
      value={{
        selectedNote,
        handleNoteSelect,
        query,
        setQuery: handleQueryChange,
      }}
    >
      {children}
    </NoteContext>
  )
}

const getNoteContext = () => useContext(NoteContext)

export { getNoteContext, NoteProvider }
