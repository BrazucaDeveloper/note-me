import {
	saveReducer,
	setLocalSaved,
	resetSaved,
	setRemoteSaved,
} from './save-reducer'

import { useEffect, useReducer, useState, useTransition } from 'react'

import { useDebounce } from '@/hooks/use-debounce'
import type { Note } from '@/data/interfaces'

const transitionDuration =
	Number(import.meta.env.VITE_TRANSITION_DURATION) || 3_000

export const getProviders = () => {
	const [isSaving, startSaving] = useTransition()

	const [isSaved, dispatchIsSaved] = useReducer(saveReducer, {
		localSaved: null,
		remoteSaved: null,
	})

	const handleIsSaved = (isSaved: boolean, type: 'local' | 'remote') => {
		if (type === 'local') {
			dispatchIsSaved(setLocalSaved(isSaved))
		} else {
			dispatchIsSaved(setRemoteSaved(isSaved))
		}
	}

	const [selectedTags, setTagsSelected] = useState<Set<string>>(new Set('0'))

	const handleTagsSelected = (cid: string) => {
		setTagsSelected(prev => {
			if (cid === '0') return new Set('0')

			prev.delete('0')
			const newSet = new Set(prev)
			newSet.has(cid) ? newSet.delete(cid) : newSet.add(cid)
			return newSet
		})
	}

	const [selectedNote, setSelectedNote] = useState<Note | null>(null)
	const [query, setQuery] = useState<string>('')

	const debouncedQueryUpdater = useDebounce((newQuery: string) => {
		setQuery(newQuery.trim())
	}, 500)

	const handleQueryChange = (newQuery: string) =>
		debouncedQueryUpdater(newQuery)

	const [isEditorEnabled, setIsEditorEnabled] = useState<boolean>(true)
	const handleToggleIsEditorEnabled = () => setIsEditorEnabled(prev => !prev)

	useEffect(() => {
		const id = setTimeout(
			() => dispatchIsSaved(resetSaved()),
			transitionDuration
		)
		return () => clearTimeout(id)
	}, [isSaved.localSaved, isSaved.remoteSaved, transitionDuration])

	return {
		selectedNote,
		handleNoteSelect: setSelectedNote,
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
	}
}
