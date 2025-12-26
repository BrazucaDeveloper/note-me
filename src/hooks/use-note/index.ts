import type { Note } from '@/data/interfaces'
import { useAuth } from '@clerk/clerk-react'
import { useLocalNote } from './use-local-note'
import { useRemoteNote } from './use-remote-note'

export function useNote() {
	const { userId } = useAuth()
	const { createLocalNote, readLocalNote, updateLocalNote } = useLocalNote()
	const { createRemoteNote } = useRemoteNote()

	const defaultNewNote: Omit<Note, 'cid'> = {
		gid: null,
		title: 'Give a title to your new note :)',
		content: '🌱 Sprout your ideias here!',
		isPined: false,
		status: 'active',
		owner: Number(userId) || null,
		createdAt: Date.now(),
		updatedAt: Date.now(),
	}

	const createNote = async (): Promise<
		[isLocalSaved: boolean, isRemoteSaved: boolean]
	> => {
		const cid = await createLocalNote(defaultNewNote)
		const [noteCreated] = await readLocalNote(cid)

		if (!noteCreated) throw new Error('Failed to create note')
		const gid = await createRemoteNote(noteCreated)

		return [!!cid, !!gid]
	}

	const updateNote = async (note: Partial<Note> & { cid: number }) => {
		const cid = await updateLocalNote(note)
	}

	const toggleIsPinned = async () => {}

	const toggleIsTrashed = async () => {}

	return {
		createNote,
		updateNote,
		toggleIsPinned,
		toggleIsTrashed,
	}
}
