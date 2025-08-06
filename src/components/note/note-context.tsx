import type { Note } from '@/db'
import { createContext, useContext, useState } from 'react'

interface NoteContextProps {
  selectedNote: Note | null
  handleNoteSelect: (note: Note) => void
}

const NoteContext = createContext({} as NoteContextProps)

const NoteProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)

  const handleNoteSelect = (note: Note) => {
    setSelectedNote(note)
  }

  return (
    <NoteContext value={{ selectedNote, handleNoteSelect }}>
      {children}
    </NoteContext>
  )
}

const getNoteContext = () => useContext(NoteContext)

export { getNoteContext, NoteProvider }
