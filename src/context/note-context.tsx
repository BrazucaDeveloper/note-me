import { useDebounce } from '@/hooks/use-debounce'
import type { Note } from '@/services/db.client'
import {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState,
    useTransition,
} from 'react'

interface SaveReducerAction {
	type: 'SET_LOCAL_SAVED' | 'SET_REMOTE_SAVED' | 'RESET_SAVED'
	payload?: boolean
}

interface SaveReducerState {
	localSaved: boolean
	remoteSaved: boolean
}

interface NoteContextProps {
	selectedNote: Note | null
	handleNoteSelect: (note: Note | null) => void
	query: string
	handleQueryChange: (query: string) => void
	selectedTags: string[]
	handleTagsSelected: (tags: string[]) => void
	isEditorEnabled: boolean
	handleToggleIsEditorEnabled: () => void
	isSaving: boolean
	startSaving: (callback: React.TransitionFunction) => void
	isSaved: SaveReducerState
	handleIsSaved: (isSaved: boolean, type: 'local' | 'remote') => void
}

const NoteContext = createContext({} as NoteContextProps)

const ANIMATION_DURATION = 3500

const NoteProvider = ({ children }: { children: React.ReactNode }) => {
	const [selectedTags, setSelectedTag] = useState<string[]>([])
	const handleTagsSelected = (tags: string[]) => setSelectedTag(tags)

	const [selectedNote, setSelectedNote] = useState<Note | null>(null)
	const handleNoteSelect = (note: Note | null) => setSelectedNote(note)

	const [query, setQuery] = useState<string>('')
	const handleQueryChange = useDebounce((newQuery: string) => {
		setQuery(newQuery.trim())
	}, 500)
	
	const [isEditorEnabled, setIsEditorEnabled] = useState<boolean>(true)
	const handleToggleIsEditorEnabled = () => setIsEditorEnabled(!isEditorEnabled)

	const [isSaving, startSaving] = useTransition()

	const reducer = (state: SaveReducerState, action: SaveReducerAction) => {
		switch (action.type) {
			case 'SET_LOCAL_SAVED':
				return { ...state, localSaved: action.payload ?? false }
			case 'SET_REMOTE_SAVED':
				return { ...state, remoteSaved: action.payload ?? false }
			case 'RESET_SAVED':
				return { localSaved: false, remoteSaved: false }
			default:
				return state
		}
	}

	const [isSaved, setIsSaved] = useReducer(reducer, {
		localSaved: false,
		remoteSaved: false,
	})

	const handleIsSaved = (isSaved: boolean, type: 'local' | 'remote') => {
		setIsSaved({
			type: type === 'local' ? 'SET_LOCAL_SAVED' : 'SET_REMOTE_SAVED',
			payload: isSaved,
		})
	}

	useEffect(() => {
		const id = setTimeout(
			() => setIsSaved({ type: 'RESET_SAVED' }),
			ANIMATION_DURATION
		)
		return () => clearTimeout(id)
	}, [isSaved.localSaved, isSaved.remoteSaved])

	return (
		<NoteContext
			value={{
				selectedNote,
				handleNoteSelect,
				query,
				handleQueryChange,
				selectedTags,
				handleTagsSelected,
				isSaved,
				handleIsSaved,
				isSaving,
				startSaving,
				isEditorEnabled,
				handleToggleIsEditorEnabled,
			}}
		>
			{children}
		</NoteContext>
	)
}

const getNoteContext = () => useContext(NoteContext)

export { getNoteContext, NoteProvider }
