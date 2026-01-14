import type { UpdateNote } from '@/data/interfaces'
import { useAuth } from '@clerk/clerk-react'
import { useLocalNote } from './use-local-note'
import { useRemoteNote } from './use-remote-note'
import { SyncService } from '@/data/helper'

type UseNoteResponse = Promise<
	[isRemoteSynced: boolean, isLocalSynced: boolean]
>

export function useNote() {
	const { userId, isSignedIn } = useAuth()
	const {
		createLocalNote,
		readLocalNote,
		updateLocalNote,
		pullNotesFromRemote,
	} = useLocalNote(userId || undefined)
	const { createRemoteNote, updateRemoteNote, pushNotesToRemote } =
		useRemoteNote()

	const syncNotesProcedure = async (): UseNoteResponse => {
		if (!isSignedIn) return [false, false]
		const lastSync = await SyncService.getLastSync()

		const notesToPush = await readLocalNote(undefined, lastSync)

		const notesToPull = await pushNotesToRemote(notesToPush, lastSync)
		const notesPulled = await pullNotesFromRemote(notesToPull)

		return [notesToPull.length > 0, notesPulled.length > 0]
	}

	const createNote = async (): UseNoteResponse => {
		const id = await createLocalNote()
		const [noteCreated] = await readLocalNote(id)

		if (!noteCreated) throw new Error('Failed to create note')
		if (!isSignedIn) return [false, !!id]

		const gid = await createRemoteNote(noteCreated)
		return [gid !== null, !!id]
	}

	const updateNote = async (note: UpdateNote): UseNoteResponse => {
		const noteToUpdate = { ...note, updatedAt: Date.now() }

		const isLocalSaved = await updateLocalNote(noteToUpdate)
		if (!isSignedIn) return [false, isLocalSaved]

		const isRemoteSaved = await updateRemoteNote(noteToUpdate)
		return [isRemoteSaved, isLocalSaved]
	}

	const toggleIsPinned = async (id: string): UseNoteResponse => {
		const [localNote] = await readLocalNote(id)
		if (!localNote) throw new Error('Note not found')

		const noteWithPinnedToggled: UpdateNote = {
			...localNote,
			isPinned: !localNote.isPinned,
		}
		return (await updateNote(noteWithPinnedToggled)) || [false, false]
	}

	const toggleIsTrashed = async (id: string): UseNoteResponse => {
		const [localNote] = await readLocalNote(id)
		if (!localNote) throw new Error('Note not found')

		const noteWithStatusToggled: UpdateNote = {
			...localNote,
			status: localNote.status === 'active' ? 'trashed' : 'active',
		}
		return (await updateNote(noteWithStatusToggled)) || [false, false]
	}

	return {
		syncNotesProcedure,
		createNote,
		updateNote,
		toggleIsPinned,
		toggleIsTrashed,
	}
}
