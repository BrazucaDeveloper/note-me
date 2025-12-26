import type { Note } from '@/data/db.client'
import { createContext, useContext } from 'react'
import { getProviders } from './note-providers'
import type { SaveReducerState } from './save-reducer'

interface NoteContextProps {
	selectedNote: Note | null
	handleNoteSelect: (note: Note | null) => void
	query: string
	handleQueryChange: (query: string) => void
	selectedTags: Set<string>
	handleTagsSelected: (cid: string) => void
	isEditorEnabled: boolean
	handleToggleIsEditorEnabled: () => void
	isSaving: boolean
	startSaving: (callback: React.TransitionFunction) => void
	isSaved: SaveReducerState
	handleIsSaved: (isSaved: boolean, type: 'local' | 'remote') => void
}

const NoteContext = createContext({} as NoteContextProps)

const NoteProvider = ({ children }: { children: React.ReactNode }) => {
	const providers = getProviders()
	return <NoteContext value={providers}>{children}</NoteContext>
}

const getNoteContext = () => useContext(NoteContext)

export { getNoteContext, NoteProvider }
