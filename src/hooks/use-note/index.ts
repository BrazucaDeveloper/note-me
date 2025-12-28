import type { Note } from '@/data/interfaces'
import { useAuth } from '@clerk/clerk-react'
import { useLocalNote } from './use-local-note'
import { useRemoteNote } from './use-remote-note'
import { useThrottle } from '../use-throttling '
import { useDebounce } from '../use-debounce'

export function useNote() {
	const { userId, isSignedIn } = useAuth()
	const { createLocalNote, readLocalNote, updateLocalNote } = useLocalNote()
	const { createRemoteNote, upsertRemoteNote } = useRemoteNote()

	const defaultNewNote: Omit<Note, 'cid'> = {
		gid: null,
		title: 'Give a title to your new note :)',
		content: '🌱 Sprout your ideias here!',
		isPinned: false,
		status: 'active',
		owner: Number(userId) || null,
		createdAt: Date.now(),
		updatedAt: Date.now(),
	}

	const createNote = useThrottle(
		async (): Promise<[isLocalSaved: boolean, isRemoteSaved: boolean]> => {
			const cid = await createLocalNote(defaultNewNote)
			const [noteCreated] = await readLocalNote(cid)

			if (!noteCreated) throw new Error('Failed to create note')

			if (isSignedIn) {
				const gid = await createRemoteNote(noteCreated)
				return [!!cid, !!gid]
			}
			return [!!cid, false]
		},
		1_000
	) // can only be called once every 1000ms

	const updateNote = useDebounce(
		async (
			note: Partial<Note> & { cid: number }
		): Promise<[isLocalSaved: boolean, isRemoteSaved: boolean]> => {
			const noteToUpdate = { ...note, updatedAt: Date.now() }

			const cid = await updateLocalNote(noteToUpdate)
			if (!isSignedIn) return [!!cid, false]

			const gid = await upsertRemoteNote(noteToUpdate)
			return [!!cid, !!gid]
		},
		1_000
	) // can only be called once every 1000ms

	const toggleIsPinned = async (
		id: number
	): Promise<[isLocalSaved: boolean, isRemoteSaved: boolean]> => {
		const [localNote] = await readLocalNote(id)
		if (!localNote) throw new Error('Note not found')

		const noteWithPinnedToggled: Partial<Note> & { cid: number } = {
			cid: id,
			isPinned: !localNote.isPinned,
			updatedAt: Date.now(),
		}
		return (await updateNote(noteWithPinnedToggled)) || [false, false]
	}

	const toggleIsTrashed = async (
		id: number
	): Promise<[isLocalSaved: boolean, isRemoteSaved: boolean]> => {
		const [localNote] = await readLocalNote(id)
		if (!localNote) throw new Error('Note not found')

		const noteWithStatusToggled: Partial<Note> & { cid: number } = {
			cid: id,
			status: localNote.status === 'active' ? 'trashed' : 'active',
			updatedAt: Date.now(),
		}
		return (await updateNote(noteWithStatusToggled)) || [false, false]
	}

	return {
		createNote,
		updateNote,
		toggleIsPinned,
		toggleIsTrashed,
	}
}
